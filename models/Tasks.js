const mongoose = require('mongoose');

const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['To do', 'In progress', 'Under review', 'Finished'],
    },
    priority: {
        type: String,
        enum: ['Urgent', 'Medium', 'Low']
    },
    deadline: {
        type: Date
    },
});

module.exports = mongoose.model('Tasks', Task);