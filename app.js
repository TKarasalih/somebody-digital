const express = require("express"),
    fs = require("fs"),
    https = require("https"),
    app = express();

app.use("/challenge-1", express.static("challenge-1"));

app.get("/", function (req, res) {
    res.send("hello world");
});

https
    .createServer(
        {
            key: fs.readFileSync("server.key"),
            cert: fs.readFileSync("server.cert"),
        },
        app
    )
    .listen(7000, function () {
        console.log(
            "App listening on port 7000! Go to https://localhost:7000/"
        );
    });
