import { database } from '../database/index.js';
import { Sequelize, DataTypes } from 'sequelize';
 
export const Post = database.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtitle: {
        type: DataTypes.TEXT('long'),
    },
    url: {
        type: DataTypes.TEXT('long'),
    },
    date: {
        type: DataTypes.DATE
    },
    typePost: {
        type: DataTypes.STRING,
    }
})


