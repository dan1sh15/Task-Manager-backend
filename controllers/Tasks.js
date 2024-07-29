const Tasks = require('../models/Tasks');
const User = require('../models/User');

exports.createTask = async (req, res) => {
    try {
        const {title, description, status, priority, deadline} = req.body;
        if(!title) {
            return res.status(400).json({
                success: false,
                message: "Task Title is required",
            });
        }

        const task = await Tasks.create({
            title,
            description,
            status,
            priority,
            deadline,
        });

        const userId = req.user.id;
        const user = await User.findByIdAndUpdate(userId, {
            $push: {
                tasks: task._id
            }
        }, {new: true}).populate('tasks').exec();

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Task cannot be updated in user",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task added successfully",
            task,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

exports.editTask = async (req, res) => {
    try {
        const { title, description, status, priority, deadline } = req.body;
        const id = req.params.id;

        if(!title || !description || !status || !priority || !deadline) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const task = await Tasks.findById(id);
        if(!task) {
            return res.status(400).json({
                success: false,
                message: "Task not found",
            });
        }

        const updatedTask = await Tasks.findByIdAndUpdate(id, {
            title,
            description,
            status,
            priority,
            deadline
        }, {new: true});

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.deleteTask = async(req, res) => {
    try {
        const id = req.params.id;

        const task = await Tasks.findById(id);

        if(!task) {
            return res.status(400).json({
                success: false,
                message: 'Task not found',
            });
        }

        const userId = req.user.id;
        const user = await User.findByIdAndUpdate(userId, {
            $pull: {
                tasks: task._id,
            }
        }, {new: true}).populate('tasks').exec();

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        await Tasks.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};