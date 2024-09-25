const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");

    if (path in urlMap){
        urlMap[path](req, res);
    }else {
        notFound(req, res)
    }
}).listen(3000, ()=> console.log("Server Start"));

const urlMap = {
    "/" : (req, res) => res.end("Home"),
    "/user" : user,
    "/feed" : feed,
}
function user(req, res) {
    const userInfo = url.parse(req.url, true).query;
    res.end(`[user] name : ${userInfo.name}, age : ${userInfo.age}`);
}
function feed(req, res) {
    res.end(`
        <ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
        </ul>`)
}
function notFound(req, res) {
    res.statusCode = 404;
        res.end("404 page not found");
}