import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";

const router = Router();

// Crear un nuevo producto
router.post("/", createProduct);

// Obtener todos los productos
router.get("/", getProducts);

// Obtener un producto por ID
router.get("/:id", getProductById);

// Actualizar un producto
router.put("/:id", updateProduct);

// Eliminar un producto
router.delete("/:id", deleteProduct);

export default router; // Asegúrate de que esto esté presente