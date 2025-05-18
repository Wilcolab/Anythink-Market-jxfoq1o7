const express = require('express');

const app = express();
const PORT = 8001;

app.use(express.json());

let tasks = [
    "Write a diary entry from the future",
    "Create a time machine from a cardboard box",
    "Plan a trip to the dinosaurs",
    "Draw a futuristic city",
    "List items to bring on a time-travel adventure"
];

// Root endpoint (optional, for parity with Python server)
app.get('/', (req, res) => {
    res.send('Hello World');
});

// GET /tasks: Retrieve the task list
app.get('/tasks', (req, res) => {
    res.json({ tasks });
});

// POST /tasks: Add a task to the list
app.post('/tasks', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Task text is required' });
    }
    tasks.push(text);
    res.json({ message: 'Task added successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});