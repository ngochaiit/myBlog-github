import Sequelize from 'sequelize';
import {sequelize} from '../databases/database';

const User = sequelize.define('user',
{
    id: 
    {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    
    name:
    {
        type: Sequelize.STRING,
    },
    email:
    {
        type: Sequelize.STRING,
    },
    password:
    {
        
        type: Sequelize.TEXT,
    },
    
},{
    timestamps: false,
})

// async function getUserByName(name)
// {
//     if(name)
//     {
//         let userLogin = await User.findOne(
//             {
//                 attributes: [name, password],
//                 where: 
//                 {
//                     name: name,
//                 }
//             }
//         )

//     }
//     else
//     {

//     }
    
// }
export default User;
// INSERT INTO post VALUES(1,'NodeJS','how to learn nodeJS?,'Hai','2018-09-01','2019-09-03');
// ALTER TABLE users
// ADD COLUMN email varchar(300);