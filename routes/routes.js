const express = require('express');
const { login, signup } = require('../controllers/Auth');
const { createTask, deleteTask, editTask } = require('../controllers/Tasks');
const { auth } = require('../middleware/auth');
const { getAllTasks, getUserDetails } = require('../controllers/User');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/createTask', auth, createTask);
router.delete('/deleteTask/:id', auth, deleteTask);
router.get('/getAllTasks', auth, getAllTasks);
router.get('/userDetails', auth, getUserDetails);
router.put('/editTask/:id', auth, editTask);

module.exports = router;