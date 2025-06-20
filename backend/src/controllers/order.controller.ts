import { Request, Response } from "express";
import { Order } from "../models/Order";

// Crear una nueva orden
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, products, subtotal, total, status } = req.body;

    const newOrder = new Order({
      user,
      products,
      subtotal,
      total,
      status: status || "Pendiente" // Pendiente por default
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error al crear la orden", error: err });
  }
};

// Actualizar el estado de la orden a "Pagado"
export const updateOrderToPaid = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: "Pagado" },
      { new: true }
    );

    if (!updatedOrder) {
      res.status(404).json({ message: "Orden no encontrada" });
      return;
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar la orden", error: err });
  }
};

// Cancelar la orden (estado "Cancelado")
export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const canceledOrder = await Order.findByIdAndUpdate(
      id,
      { status: "Cancelado", deleteDate: new Date() },
      { new: true }
    );

    if (!canceledOrder) {
      res.status(404).json({ message: "Orden no encontrada" });
      return;
    }

    res.json(canceledOrder);
  } catch (err) {
    res.status(500).json({ message: "Error al cancelar la orden", error: err });
  }
};

// Agregar productos a una orden existente
export const addProductsToOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { products } = req.body;

    if (!products || products.length === 0) {
      res.status(400).json({ message: "Se requieren productos para agregar a la orden" });
      return;
    }

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ message: "Orden no encontrada" });
      return;
    }

    order.products.push(...products);
    await order.save();

    res.json({ message: "Productos agregados a la orden", order });
  } catch (err) {
    res.status(500).json({ message: "Error al agregar productos a la orden", error: err });
  }
};