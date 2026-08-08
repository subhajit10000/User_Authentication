import express from "express";

const App = express();

App.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default App