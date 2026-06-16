import express from "express";
import branchesController from "../controllers/branchesController.js";

//Router() nos ayuda a colocar los métodos
//que vamos a usar
const router = express.Router();

router
  .route("/")
  .get(branchesController.getbranches)
  .post(branchesController.insertBranches);

router
  .route("/:id")
  .put(branchesController.updateBranches)
  .delete(branchesController.deleteBranches);

export default router;
