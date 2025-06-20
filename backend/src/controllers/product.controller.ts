import { Request, Response } from "express";
import { Product } from "../models/Product";

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, stock } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error al crear el producto", error: err });
  }
};

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ status: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los productos", error: err });
  }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product || !product.status) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el producto", error: err });
  }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el producto", error: err });
  }
};

// Eliminar un producto (cambiar estado a false)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { status: false, deleteDate: new Date() },
      { new: true }
    );

    if (!deletedProduct) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    res.json({ message: "Producto eliminado", deletedProduct });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el producto", error: err });
  }
};