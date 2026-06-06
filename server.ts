import app from './src/app.ts';
import sequelize from './src/database/connection.ts';
function startServer(){
    const PORT = 3000;
    app.listen(PORT, function(){
        console.log(`Project started at ${PORT}`)
    })
}
startServer();