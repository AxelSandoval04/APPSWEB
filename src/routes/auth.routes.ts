import { Router } from "express";
import { login, getTimeToken, updateToken, getAllUsers, saveUser, updateUser, deleteUser } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login); // POST /api/auth/login
router.get("/getTimeToken", getTimeToken); // GET /api/auth/getTimeToken?userId=123456
router.get("/getAllUsers", getAllUsers); // GET /api/auth/getAllUsers
router.patch("/updateToken/:userId",updateToken); // PATCH /api/auth/updateToken/:userId
router.post("/saveUser", saveUser); // POST /api/auth/saveUser
router.put("/updateUser/:id", updateUser); // PUT /api/auth/updateUser/:id
router.delete("/deleteUser/:id", deleteUser); // DELETE /api/auth/deleteUser/:id
export default router;
