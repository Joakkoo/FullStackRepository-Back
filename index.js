import express from "express";
import dotenv from "dotenv";
import Task from "./src/models/task.js";
import connectDB from "./config/db.js";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors());

connectDB();

dotenv.config();

const PORT = process.env.PORT || 4002;

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})


app.post("/createtask", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.send(savedTask);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.put("/puttask/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedTask);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete("/deletetask/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.send(deletedTask);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/gettask/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(PORT, () => {
    console.log("Server started on port 4002");
});