const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const todoModel = require("../database/index").Todo;
const router = Router();

// todo Routes
router.post('/',async (req, res) => {
    // Implement todo creation logic
    let currentDate = new Date();
    let todo = {
        ...req.body,
        created_at : currentDate.toISOString
    }
    let to = await todoModel.create(todo);
    console.log(to);
    return res.json(todo);
});

router.put('/:id', adminMiddleware,async (req, res) => {
    // Implement update todo  logic
    try {
        let todo  = await todoModel.findByIdAndUpdate(req.params.id, req.body);
        console.log(todo);
        res.json({
            message : "Successfully updated todo for id - " + req.params.id
        })
    } catch (err) {
        res.status(400).json({
            message : "Failed to update todo for id - " + req.params.id
        })
    }
});

router.delete('/:id', adminMiddleware,async (req, res) => {
    // Implement delete todo by id logic
    try {
        let todo  = await todoModel.findByIdAndDelete(req.params.id);
        console.log(todo);
        res.status(204).json({
            message : "Successfully deleted todo for id - " + req.params.id
        });
    } catch (err) {
        res.status(400).json({
            message : "Failed to delete todo for id - " + req.params.id
        })
    }
});


router.get('/', adminMiddleware, async (req, res) => {
    // Implement fetching all todo logic
    try {
        let todos  = await todoModel.find();
        console.log(todo);
        res.json(todo);
    } catch (err) {
        res.status(400).json({
            message : "Failed to retrieve all todos"
        })
    }
});

router.get('/:id', adminMiddleware, async (req, res) => {
    // Implement fetching todo by id logic
    try {
        let todo  = await todoModel.findById(req.params.id, req.body);
        console.log(todo);
        res.json(todo)
    } catch (err) {
        res.status(400).json({
            message : "Failed to get todo for id - " + req.params.id
        })
    }
});

router.get('/todos', adminMiddleware, async (req, res) => {
    // Implement logic for getting todos for a user
    try {
        let userId = req.query.id;
    let filter = {
        userId
    };
    let todos = await todoModel.find(filter);
    console.log(todos);
    res.json(todos);
    } catch (err) {
        res.status(400).json("User id not found");
    }
});

module.exports = router;