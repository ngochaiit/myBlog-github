import Sequelize from 'sequelize';
import {sequelize} from '../databases/database';

const Post = sequelize.define('post',
{
    id:
    {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title:
    {
        type: Sequelize.STRING,
    },
    content:
    {
        type: Sequelize.TEXT,
    },
    author: 
    {
        type: Sequelize.STRING,
    },
    created_at: 
    {
        type: Sequelize.DATE,
    },
    updated_at: 
    {
        type: Sequelize.DATE,
    },
},{
    timestamps: false,
})

export default Post;
