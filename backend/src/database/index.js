import { Sequelize } from 'sequelize';

export const database = new Sequelize(
    String(process.env.MYSQL_NAME_DATABASE), String(process.env.MYSQL_USERNAME), 
    String(process.env.MYSQL_PASSWORD), 
    {
        dialect: process.env.MYSQL_TYPE_BD, 
        host: String(process.env.MYSQL_HOST)
    }
);

database.sync()
.then(() => { console.log("Conexão com o banco de dados estabelecida") })
.catch(err => console.log(err))
