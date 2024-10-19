const express=require('express');
const { addTask, changeCompletionStatus, getAllTasks, deleteTask } = require('../controllers/taskController');

const taskRoute=express.Router();

taskRoute.post('/addtask',addTask);
taskRoute.put('/changestatus/:id',changeCompletionStatus);
taskRoute.get('/getalltasks',getAllTasks);
taskRoute.delete('/deletetask/:id',deleteTask);

module.exports=taskRoute;