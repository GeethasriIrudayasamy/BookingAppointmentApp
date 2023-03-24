const express = require("express");
const routes = require("./routes/api");
const sequelize = require("./utils/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", routes);

app.use((req, res, next) => {
    res.send("Welcome to Express");
});

sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));
