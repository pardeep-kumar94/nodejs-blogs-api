import express from 'express';
import { connectToDb } from './db/connection.js'
import bodyParser from 'body-parser';
import userRoutes from './routes/usersRoute.js';
const app = express();
const PORT = 3000;

connectToDb()

app.use(bodyParser.json())
app.use("/api/users", userRoutes)
app.listen(PORT, (error)=> {
    console.log("any error occured", error)
});
