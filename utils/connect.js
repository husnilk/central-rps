const { Sequelize } = require('sequelize');
const env = require('dotenv');
const jwt = require('jsonwebtoken');

env.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DRIVER
    }
)

module.exports = sequelize;