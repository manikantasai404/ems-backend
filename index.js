const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const departmentRoute = require("./routes/departments");
const userRoute = require("./routes/user");
const registerRoute = require("./routes/register");
const roleRoute = require("./routes/role");

dotenv.config();

//mongodb connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//APIs
app.use("/api/auth", registerRoute);
app.use("/api/department", departmentRoute);
app.use("/api/user", userRoute);
app.use("/api/role", roleRoute);


app.listen(87654, () => {
  console.log("Backend is running");
});