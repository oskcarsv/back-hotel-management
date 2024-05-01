'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bcryptjs from 'bcryptjs';
import {dbConnection} from './mongo.js';
import User from '../src/user/user.model.js';
import Role from '../src/role/role.model.js';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/user/user.routes.js';

class Server{


    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/hotel-management/v1/auth'
        this.userPath = '/hotel-management/v1/user'

        this.middlewares();
        this.connectDB();
        this.defaultCredential();
        this.routes();

    }

    async defaultCredential(){

        const defaultCredentials = await User.findOne({username: "admin"});

        if(!defaultCredentials){


            const defaultUser = new User({

                name: "admin",
                username: "admin",
                password: "123456",
                email: "admin@gmail.com",
                role: "SUPER_ROLE"

            })

            const salt = bcryptjs.genSaltSync();
            defaultUser.password = bcryptjs.hashSync(defaultUser.password, salt);

            await defaultUser.save();

            const SUPER_ROLE = new Role({role: "SUPER_ROLE"});
            const ADMIN_BOSS_ROLE = new Role({role: "ADMIN_BOSS_ROLE"});
            const ADMIN_EMPLOYEE_ROLE = new Role({role: "ADMIN_EMPLOYEE_ROLE"});
            const USER_ROLE = new Role({role: "USER_ROLE"});

            await SUPER_ROLE.save();
            await ADMIN_BOSS_ROLE.save();
            await ADMIN_EMPLOYEE_ROLE.save();
            await USER_ROLE.save();

            console.log('Default Credentials have been created.');

        }else{

            console.log("Default Credentials have already been created.");

        }

    }

    middlewares(){

        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));

    }

    async connectDB(){
        await dbConnection();
    }

    routes(){

        this.app.use(this.authPath, authRoutes);
        this.app.use(this.userPath, userRoutes);

    }

    listen(){

        this.app.listen(this.port, () =>{

            console.log('Server running on port: ', this.port);

        })

    }

}

export default Server;