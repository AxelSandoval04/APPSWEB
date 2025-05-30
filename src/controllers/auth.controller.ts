import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import cache from "../utils/cache";
import { User } from "../models/User"; // Assuming you have a User model defined
import dayjs from "dayjs";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const userId = (user as any)._id.toString();
    const accessToken = generateAccessToken(userId);

    cache.set(userId, accessToken, 60 * 15);
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Error en login", error });
  }
};

export const getTimeToken = (req: Request, res: Response): void => {
  const userId = req.query.userId as string;
  if (!userId) {
    res.status(400).json({ message: "Falta userId en query" });
    return;
  }
  const ttl = cache.getTtl(userId);
  if (!ttl) {
    res.status(404).json({ message: "Token no encontrado" });
    return;
  }
  const now = Date.now();
  const TimeToLife = Math.floor((ttl - now) / 1000);
  const expTime = dayjs(ttl).format('HH:mm:ss');
  res.json({
    TimeToLife,
    expTime
  });
};
export const updateToken = (req: Request, res: Response): void => {
  const { userId } = req.params;
  const ttl = cache.getTtl(userId); // Buscar el tiempo de vida del token
  if (!ttl) {
    res.status(404).json
    ({ message: "Token no encontrado" });
    return;
  }
  const newTimeTtl: number = 60 * 15; // 15 minutos
  cache.ttl(userId, newTimeTtl); // Actualizar el tiempo de vida del token
  res.json({message: "Tiempo de vida del token actualizado"});
}
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userList = await User.find();
    const userByName = await User.find({ name: "Michel" });
    console.log("Usuarios llamados Michel:", userByName); 
    res.json({ userList, userByName });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};
export const saveUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar contraseña
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      createDate: Date.now(),
      deleteDate: null,
      status: true,
    });
    const user = await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente", user });
  } catch (error) {
    console.error("Error en saveUser", error);
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { password, role, name, phone } = req.body;

    const updateData: any = {};
    if (password) {
      updateData.password = await bcrypt.hash(password, 10); // Encriptar si se actualiza
    }
    if (role) updateData.role = role;
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json({ message: "Usuario actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { status: false, deleteDate: new Date() },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No se pudo eliminar el usuario" });
      return;
    }
    res.json({ message: "Usuario dado de baja", user });
  } catch (error) {
    res.status(500).json({ message: "Error al dar de baja usuario", error });
  }
};