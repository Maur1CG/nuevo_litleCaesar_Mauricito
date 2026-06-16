import express from "express";
import pizzasController from "../controllers/pizzaController.js";

//Router() nos ayuda a colocar los métodos
//que tendrá el endoint
const router = express.Router()

router.route("/")
.get(pizzasController.getPizzas)
.post(pizzasController.insertPizza)

router.route("/low-stock")
.get(pizzasController.getLowStock)

router.route("/price-range")
.post(pizzasController.getPizzaByPriceRange)

router.route("/count")
.get(pizzasController.countPizzas)

router.route("/search-name")
.post(pizzasController.searchByName)

router.route("/:id")
.put(pizzasController.updatePizzas)
.delete(pizzasController.deletePizzas)
.get(pizzasController.getPizzaById)



export default router
