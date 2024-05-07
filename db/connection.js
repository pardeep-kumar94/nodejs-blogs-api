import { Sequelize } from "sequelize";

export const dbConnection = new Sequelize('blogs_master', 'pardeepkumar', '', {
    host:'localhost',
    dialect:'postgres', 
});


export const connectToDb=()=>{
    dbConnection.authenticate()
    .then(success=> {
        console.log("Connected to Database Success");
       
       
    }).catch(error=>{
        console.log("Connected to Database Failure");
    })
}

