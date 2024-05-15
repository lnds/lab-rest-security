  // index.js
const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const PORT = process.env.SERVER_PORT

//middleware
app.use(cors())
app.use(express.json())

// swagger doc
app.use('/doc', swaggerUi.serve, swaggerUi.setupe(swaggerFile))

//crea una tarea
app.post("/tareas", async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query(
            "INSERT INTO tasks(description) VALUES($1) RETURNING *",
            [description]
        )
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

// obtiene todas las tareas 
app.get("/tareas", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM tasks ORDER BY id"
        )
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("server error")
    }
})

// obtiene una tarea especifica
app.get("/tareas/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query(
            "SELECT * FROM tareas WHERE id = $1",
            [id]
        )
        if todo == null || todo.rows.length == 0) {
          res.status(404).send("tarea no encontrada")
        } else {
          res.json(todo.rows[0])
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("server error")
    }
})

// actualiza una tarea
app.put("/tareas/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query(
            "UPDATE tasks SET description = $1 WHERE id = $2",
            [description, id]
        )
        console.log(updateTodo)
        res.json("tarea "+id+" actualizada")
    } catch (err) {
        console.log(err)
        res.status(500).send("server error")
    }
})

// borra una tarea
app.delete("/tareas/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query(
            "DELETE FROM tasks WHERE id = $1",
            [id]
        )
        console.log(deleteTodo)
        res.json("tarea "+id+" fue eliminada")
    } catch (err) {
        console.error(err)
        res.status(500).send("server error")
    }
})

app.listen(PORT, () => {
	console.log("servidor iniciado en puerto " + PORT)
})
