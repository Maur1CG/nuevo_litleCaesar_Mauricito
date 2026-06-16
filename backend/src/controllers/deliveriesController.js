import deliveriesModel from "../models/deliveries.js";

import { v2 as cloudinary } from "cloudinary";

//Array de funciones
const deliveriesController = {};

//SELECT
deliveriesController.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await deliveriesModel.find();
    return res.status(200).json(deliveries);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//INSERT
deliveriesController.insertDeliveries = async (req, res) => {
  try {
    //#1- Solicito los datos a guardar
    const { name, phone, cars, isActive } = req.body;

    const newDeliveries = new deliveriesModel({
      name,
      phone,
      image: req.file.path,
      public_id: req.file.filename,
      cars,
      isActive,
    });

    //Guardo todo en la base de datos
    await newDeliveries.save();

    return res.status(200).json({ message: "Deliveries saved" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//ELIMINAR
deliveriesController.deleteDeliveries = async (req, res) => {
  try {
    //Buscamos cual es el Repartidor a eliminar
    const deliveriesFound = await deliveriesModel.findById(req.params.id);

    //Eliminar la imagen de Cloudinary
    await cloudinary.uploader.destroy(deliveriesFound.public_id);

    //Eliminar de la base de datos
    const deliveriesDeleted = await deliveriesModel.findByIdAndDelete(
      req.params.id,
    );

    if (!deliveriesDeleted) {
      return res.status(404).json({ message: "Deliveries not found" });
    }

    return res.status(200).json({ message: "Deliveries deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE
deliveriesController.updateDeliveries = async (req, res) => {
  try {
    //#1- Solicito los nuevos datos
    const { name, phone, cars, isActive } = req.body;

    //Identificar que Repartidor voy a actualizar
    const deliveriesFound = await deliveriesModel.findById(req.params.id);

    const updatedData = {
      name,
      phone,
      cars,
      isActive,
    };

    //Si viene una imagen
    if (req.file) {
      //Eliminar la imagen anterior
      await cloudinary.uploader.destroy(deliveriesFound.public_id);

      updatedData.image = req.file.path;
      updatedData.public_id = req.file.filename;
    }

    //Guardo todo lo actualizado en la base de datos
    await deliveriesModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    return res.status(200).json({ message: "Driver updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default deliveriesController;


