const User = require('../models/User');

exports.getAllTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('tasks').exec();
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks: user.tasks,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: 'Internal server error',
        });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        if(!id) {
            return res.status(400).json({
                success: false,
                message: "User id not found"
            });
        }

        const user = await User.findById(id).populate('tasks').exec();

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}