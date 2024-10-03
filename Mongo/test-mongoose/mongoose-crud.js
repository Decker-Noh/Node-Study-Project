const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

mongoose.set("strictQuery", false);

const app = express();
app.use(bodyParser.json());

app.listen(3000, async () => {
    console.log("server start");
    const mongoDBURL = "mongodb+srv://soongun93:ggld9BryAg8yRsXs@cluster0.hqytr.mongodb.net/"

    mongoose.
    connect(mongoDBURL)
    .then(console.log("Conneted to MongoDB by Mongoose"));

    //모든 Person 데이터 출력
    app.get("/person", async (req, res) => {
        const person = await Person.find({});
        res.send(person);
    })
    //이메일로 특정 Person 찾기
    app.get("/person/:email", async (req, res) => {
        const person = await Person.find( {email : req.params.email});
        res.send(person);   
    });
    //데이터 추가하기
    app.post("/person", async (req, res) => {
        const person = new Person(req.body);
        await person.save();
        res.send(person);
    });
    //이메일을;통해 데이터 수정
    app.put("/person/:email", async (req, res) => {
        const person = await Person.findOneAndUpdate( 
            {email : req.params.email},
            {$set : req.body},
            {new : true}
        );
        console.log(person);
        res.send(person);
    });
    //데이터 삭제
    app.delete("/person/:email", async (req, res) => {
        const person = await Person.findOneAndDelete(
            {email : req.params.email}
        );
        res.send(person);
    });
})