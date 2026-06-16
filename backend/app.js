import express from "express";
import pizzaRoutes from "./src/routes/pizza.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import customerRoutes from "./src/routes/customer.js";
import registerCustomerRoutes from "./src/routes/registerCustomer.js";
import cookieParser from "cookie-parser";
import loginCustomerRoutes from "./src/routes/loginCustomer.js";
import logoutRoute from "./src/routes/logout.js";
import cors from "cors";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import providerRoutes from "./src/routes/provider.js";
import cartRoutes from "./src/routes/cart.js"
import wompiRoutes from "./src/routes/wompi.js"
import deliveriesRoutes from "./src/routes/deliveries.js"

//Creo una constante que es igual a
//la libreria Express
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //permitir el envío de cookies y credenciales
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employee", employeesRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/loginCustomers", loginCustomerRoutes);
app.use("/api/logout", logoutRoute);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/cart", cartRoutes)
app.use("/api/wompi", wompiRoutes)
app.use("/api/deliveries", deliveriesRoutes)

export default app;
