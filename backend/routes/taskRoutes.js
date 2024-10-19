const express=require('express');
const { addTask, changeCompletionStatus, getAllTasks, deleteTask, editTask } = require('../controllers/taskController');

const taskRoute=express.Router();

taskRoute.post('/addtask',addTask);
taskRoute.patch('/changestatus/:id',changeCompletionStatus);
taskRoute.get('/getalltasks',getAllTasks);
taskRoute.delete('/deletetask/:id',deleteTask);
taskRoute.patch('/edittask/:id',editTask);

module.exports=taskRoute;