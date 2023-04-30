"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos });
});
router.post("/create", (req, res, next) => {
    const body = req.body;
    if (!body.text) {
        return res
            .status(400)
            .json({ error: "Missing text field in request body" });
    }
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res.status(200).json({ todos, todo: newTodo });
});
router.put("/edit/:todoId", (req, res, next) => {
    const params = req.params;
    const body = req.body;
    if (!body.text) {
        return res
            .status(400)
            .json({ error: "Missing text field in request body" });
    }
    const todoIndex = todos.findIndex((todo) => todo.id === params.todoId);
    if (todoIndex >= 0) {
        todos[todoIndex].text = body.text;
        return res.status(200).json({ editedTodo: todos[todoIndex], todos });
    }
    res.status(400).json({ error: "Todo not found" });
});
router.delete("/delete/:todoId", (req, res, next) => {
    const params = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === params.todoId);
    if (todoIndex >= 0) {
        todos.splice(todoIndex, 1);
        return res.status(200).json({ todos });
    }
    res.status(400).json({ error: "Todo not found" });
});
exports.default = router;
