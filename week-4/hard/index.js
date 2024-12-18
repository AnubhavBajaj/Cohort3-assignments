const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user")
const todoRoutes = require("./routes/todo")
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res)=> res.send("I am Healthy"));

//  start writing your routes here
app.routes(userRoutes);
app.routes(todoRoutes);

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));

