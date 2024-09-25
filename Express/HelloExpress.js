const express = require("express");
const url = require("url");

const app = express();

const port = 3000;

// app.get("/", (req, res) => {
//     res.set({"Content-Type" : "text/html; charset=utf-8"});
//     res.end("헬로 express");
// });
app.get("/", (req, res) => {
    res.end("Home");
});
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
    const user = url.parse(req.url, true).query;
    res.json(`name : ${user.name}, age : ${user.age}`);
}
function feed(_, res) {
    res.json(`
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>
    `)
};
app.listen(port, () => {
    console.log("Start express server");
});