const express = require("express");
const url = require("url");
const app = express();

let posts = [];

//json body를 사용하려면 json 미들웨어를 사용해야함.
app.use(express.json()); //json 미들웨어 활성화
//Post 요청시 컨텐트 타입이 application/x-www-form-urlcode인 경우 파싱
app.use(express.urlencoded( {extended : true} ));

app.get("/", (req, res) => {
    console.log("yoyo");
    res.json(posts);
})

app.post("/posts", (req, res) => {
    const {title, name, text} = req.body;

    posts.push( {id : posts.length + 1, title, name, text, createDt: Date()});
    res.json({title, name, text});
});

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const filteredPosts = posts.filter((post) => post.id !== +id);
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;
    if (isLengthChanged) {
        res.json("OK");
        return;
    }
    res.json("Not Changed");
});


app.listen(3000, ()=> {console.log("Hello!")});