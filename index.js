import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import taskRoutes from "./routes/tasksroutes.js"; // Importa las rutas

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

// Rutas
app.use("/api/tasks", taskRoutes);  // Prefijo para las rutas de tareas

// Ruta base para verificar que el backend esté corriendo
app.get("/", (req, res) => {
    res.send("Backend is running");
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});