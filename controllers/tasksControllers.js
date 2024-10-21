import Task from "../models/task.js";

// Obtener todas las tareas con paginación
export const getTasks = async (req, res) => {
    try {
        let perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
        let page = req.query.page ? Math.max(0, parseInt(req.query.page)) : 0;
        let filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        let sort = req.query.sort ? JSON.parse(req.query.sort) : {};

        let count = await Task.countDocuments(filter);
        let tasks = await Task.find(filter)
            .limit(perPage)
            .skip(perPage * page)
            .sort(sort)
            .exec();

        res.status(200).json({
            tasks,
            total: count,
            currentPage: page,
            totalPages: Math.ceil(count / perPage),
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTask);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

// Obtener una tarea por ID
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};
