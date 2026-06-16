//Aqui en el controlador
//vamos a definir las funciones
//que ejecutarán los métodos get, post, put y delete

//#1- Creo un array de métodos
const pizzasController = {};

//Importo el Schema que voy a utilizar
import pizzasModel from "../models/pizzas.js";

//SELECT
pizzasController.getPizzas = async (req, res) => {
  const pizzas = await pizzasModel.find();
  res.json(pizzas);
};

//INSERT
pizzasController.insertPizza = async (req, res) => {
  //#1- Solicitar los datos que se van a guardar
  const { name, description, price, stock } = req.body;
  //#2- Guardo en el model
  const newPizza = new pizzasModel({ name, description, price, stock });
  //#3- Guardar todo en la base
  await newPizza.save();

  res.json({ message: "pizza saved" });
};

//ELIMINAR
pizzasController.deletePizzas = async (req, res) => {
  await pizzasModel.findByIdAndDelete(req.params.id);
  res.json({ message: "pizzas deleted" });
};

//UPDATE
pizzasController.updatePizzas = async (req, res) => {
  //#1- pido los nuevos valores
  const { name, description, price, stock } = req.body;
  //#2- Actualizo los datos

  await pizzasModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      stock,
    },
    { new: true },
  );

  res.json({ message: "pizza updated" });
};

//SELECT por id (obtener solo un registro)
pizzasController.getPizzaById = async (req, res) => {
  try {
    const pizza = await pizzasModel.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }

    return res.status(200).json(pizza);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Obtener pizzas con stock bajo
pizzasController.getLowStock = async (req, res) => {
  try {
    const pizzas = await pizzasModel.find({ stock: { $lt: 5 } });

    if (!pizzas) {
      return res
        .status(404)
        .json({ message: "There are not pizzas with low stock" });
    }

    return res.status(200).json(pizzas);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//SELECT con filtros
pizzasController.getPizzaByPriceRange = async (req, res) => {
  try {
    //#1- Solicito los datos
    const { min, max } = req.body;

    const pizzas = await pizzasModel.find({
      price: { $gte: min, $lte: max },
    });

    if (!pizzas) {
      return res
        .status(404)
        .json({ message: "Not pizzas with this price range" });
    }

    return res.status(200).json(pizzas);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Contar cuentos elementos hay en una colección
pizzasController.countPizzas = async (req, res) => {
  try {
    const count = await pizzasModel.countDocuments();

    return res.status(200).json(count)

  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//BUSCAR por nombre
pizzasController.searchByName = async (req, res) => {
  try {
    
    //#1- Solicito los datos
    const {name} = req.body

    const pizzas = await pizzasModel.find({
      name: { $regex: name, $options: "i" }
    })

    if(!pizzas){
      return res.status(404).json({message: "Pizzas not found with this name"})
    }

    return res.status(200).json(pizzas)
  } catch (error) {
    console.log("error"+error)
    return res.status(500).json({message: "Internal server error"})
  }
}

export default pizzasController;
