import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { User } from "./entity/User";
import * as express from "express";
import * as cors from "cors";
import { Password } from "./entity/Password";
import { Book } from "./entity/Book";

createConnection()
  .then(async (connection) => {
    await connection.synchronize();
    const userRepo = connection.getRepository(User);
    const bookRepo = connection.getRepository(Book);
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.post("/user", (req, res) => {
      const user = new User();
      const newPass = new Password();
      const { firstName, lastName, password, username } = req.body;
      if (firstName === '' || lastName === '' || password === '' || username === '') {
        return res.send({msg: "must fill in fields"})
      }
      user.firstName = firstName;
      user.lastName = lastName;
      newPass.password = password;
      user.password = newPass;
      user.userName = username;
      userRepo.save(user);
      const users = userRepo.find();
      res.send(users);
    });

    app.post("/login", async (req, res) => {
      const user = await userRepo.findOne({where:{userName:req.body.username}, relations: ['password']});
      if (user === undefined) return res.status(401).send({message:"username or password is incorrect"});
      if (user.password.password === req.body.password) res.send('login successful');
      else res.status(401).send({message: "username or password is incorrect"});
    });

    app.post("/book", async (req, res) => {
      if (req.body.book.length < 13) return res.send({msg: "not a valid ISBN"});
      const user = await userRepo.findOne({
        where: { userName: req.body.user }, relations:['books'],
      });
      for (let book of user.books){
        if (book.isbn === req.body.book) return res.status(400).send({msg: "book is already registerd"})
      }
      const book = new Book();
      book.isbn = req.body.book;
      book.user = user;
      await bookRepo.save(book);
      res.send(user.books);
    });

    app.get('/:user/books', async (req,res) =>{
        const books = await userRepo.findOne({where: {userName: req.params.user}, relations: ['books']})
        res.send(books.books);
    })

    app.delete('/:user/book', async (req,res)=>{
      console.log('body', req.body)
      const user = await userRepo.findOne({where: {userName: req.params.user}, relations: ['books']});
      const book = await bookRepo.createQueryBuilder().delete().from(Book).where('userId = :id', {id: user.id})
      .andWhere('isbn = :book', {book: req.body.book}).execute();
      res.end()
    })

    app.listen(process.env.PORT, () => {
      console.log("app listening on port" + process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
