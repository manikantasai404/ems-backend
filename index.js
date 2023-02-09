const express = require("express");
const app = express();
const cors = require("express-cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const departmentRoute = require("./routes/departments");
const userRoute = require("./routes/user");
const registerRoute = require("./routes/register");
const roleRoute = require("./routes/role");
const hotelCustomerRoute = require("./routes/hotelCustomers");
const itemRoute = require("./routes/item");
const tableRoute = require("./routes/tables");
const orderRoute = require("./routes/order");
const currentOrdersRoute = require("./routes/CurrentOrders");

dotenv.config();

//Cors policy to make public apis
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(cors({
  origin: ['http://localhost:6553']
}));

//mongodb connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  next(); // Important
})

//APIs
app.use("/api/auth", registerRoute);
app.use("/api/department", departmentRoute);
app.use("/api/user", userRoute);
app.use("/api/role", roleRoute);
app.use("/api/customer", hotelCustomerRoute);
app.use("/api/order", orderRoute);
app.use("/api/item", itemRoute);
app.use("/api/table", tableRoute);
app.use("/api/orders", currentOrdersRoute);

app.listen(6553, () => {
  console.log("Backend running successfully");
});
