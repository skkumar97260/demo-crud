const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./router/user");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://sivakumar:Sk%40279200@sk.8ymb69m.mongodb.net/mycrud",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})
app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})
app.listen(5000, () => {
    console.log("Server is running on port 5000");  
});
