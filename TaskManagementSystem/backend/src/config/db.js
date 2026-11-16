import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host : process.env.DB_HOST,
        dialect : 'mysql',
        logging : false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Sequelize connected to the mysql')
    } catch (error) {
        console.error('sequelize', error.message);
    }
};

connectDB();

export default sequelize;