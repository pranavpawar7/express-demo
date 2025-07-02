const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api", userRoutes);

const port = process.env.PORT || 3000;
app.listen(3000, "192.168.1.199", () => {
    console.log(`Server running at localhost ${port}`);
});
// app.listen(port, () => {
//     console.log(`Server running at localhost ${port}`);
// });
