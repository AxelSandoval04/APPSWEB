import { Router } from "express";
import {
  createOrder,
  updateOrderToPaid,
  cancelOrder,
  addProductsToOrder,
} from "../controllers/order.controller";

const router = Router();

// Crear una nueva orden
router.post("/", createOrder);

// Actualizar el estado de la orden a "Pagado"
router.put("/:id/pay", updateOrderToPaid);

// Cancelar la orden (estado "Cancelado")
router.delete("/:id", cancelOrder);

// Agregar productos a una orden existente
router.post("/:id/products", addProductsToOrder);

export default router;