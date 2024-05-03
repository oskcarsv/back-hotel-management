import User from '../user/user.model.js';

import Role from '../role/role.model.js';

import Bedroom from '../bedroom/bedroom.model.js';

export const existentEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error(`The Email ${email} was register`);
    }
}

export const notExistentBedName = async (findBedroomName = '') => {
    const notExistBedroomName = await Bedroom.findOne({ bedroomName: findBedroomName });

    if (!notExistBedroomName) {
        throw new Error(`The Bedroom ${findBedroomName} wasn't register`);
    }
}

export const existentBedName = async (bedroomName = '') => {
    const existBedroomName = await Bedroom.findOne({ bedroomName });

    if (existBedroomName) {
        throw new Error(`The Bedroom ${bedroomName} was register`);
    }
}

export const existentUsername = async (username = '') => {
    const existUsername = await User.findOne({ username });

    if (existUsername) {
        throw new Error(`The Username ${username} was register`);
    }
}

export const existentRole = async (role = '') =>{

    if(!role == "" || !role == null){

        const existRole = await Role.findOne({role});

        if(!existRole){

            throw new Error(`The Role ${role} is not valid.`);

        }

    }

}

export const existentUserOrEmail = async (usernameOrEmail = '') =>{

    if(usernameOrEmail.includes('@')){

        const existEmail = await User.findOne({ email: usernameOrEmail });

        if (!existEmail) {
            throw new Error(`The Email ${usernameOrEmail} wasn't found in the DataBase`);
        }

    }else{

        const existUsername = await User.findOne({ username: usernameOrEmail });

        if (!existUsername) {
            throw new Error(`The Username ${usernameOrEmail} wasn't found in the DataBase`);
        }

    }

}