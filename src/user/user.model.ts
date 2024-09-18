import { STRING } from 'sequelize';
import {Table, Column, Model, PrimaryKey, IsNull, AllowNull} from 'sequelize-typescript';


@Table({
    tableName: 'users',
    timestamps: true
})
export class Users extends Model{

    @Column({
        primaryKey: true, 
        unique: true, 
        field:'id',
        type: STRING,
        allowNull: false
    })
    id: string;

    @Column
    userName: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    role: string;

    @Column
    totalCoin: number;



};



// export const User = connection.define("users", {
//     id : {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         allowNull: false
//     },

//     userName : {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },

//     email : {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },

//     password : {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },

//     role : {
//         type: DataTypes.ENUM,
//         allowNull: false,
//     },

//     totalCoin : {
//         type: DataTypes.INTEGER,
//         defaultValue: 0
//     },

//     createdAt : {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },

//     updatedAt : {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     }

// });
