import express from "express";
import { getTasks, createTask, updateTask, deleteTask, getTaskById } from "../controllers/tasksControllers.js";

const router = express.Router();

router.get("/", getTasks);          // Obtener todas las tareas con paginación
router.post("/", createTask);       // Crear una nueva tarea
router.put("/:id", updateTask);     // Actualizar una tarea
router.delete("/:id", deleteTask);  // Eliminar una tarea
router.get("/:id", getTaskById);    // Obtener una tarea por ID

export default router;
