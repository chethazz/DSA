const http = require("node:http");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello world!");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});