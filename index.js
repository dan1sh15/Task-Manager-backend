const express = require('express');
const app = express();
require('dotenv').config();
const dbConnect = require('./config/Database');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const routes = require('./routes/routes');

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);
app.use('/api/v1', routes);

dbConnect.connect();

const Tasks = require('./models/Tasks');

const updateTask = async () => {
    const date = new Date();
    try {
        await Tasks.updateMany({ deadline: { $lt: date }, status: { $ne: 'Finished' } },
            { $set: {
                status: "Finished",
            } }
        );
        console.log("Tasks updated successfully");
    } catch (error) {
        console.error("Error updating tasks", error);
    }
}

setInterval(updateTask, 24 * 60 * 60 * 1000);
updateTask();

app.listen(PORT, (req, res) => {
    console.log(`App is running at port: ${PORT}`);
});