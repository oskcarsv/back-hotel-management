import User from '../user/user.model.js';

import Role from '../role/role.model.js';

import Event from '../events/event.model.js'

export const existentEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error(`The Email ${email} was register`);
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

// event-validator.js

export const existentTitle = async (title = '') => {
    const existTitle = await Event.findOne({ title });

    if (existTitle) {
        throw new Error(`The Title ${title} is already registered`);
    }
}

export const existentDesc = async (description = '') => {
    const existDesc = await Event.findOne({ description });

    if (existDesc) {
        throw new Error(`The Description ${description} is already registered`);
    }
}

export const existentDate = async (date = '') => {
    const existDate = await Event.findOne({ date });

    if (existDate) {
        throw new Error(`The Date ${date} is already registered`);
    }
}

export const existentLocation = async (location = '') => {
    const existLocation = await Event.findOne({ location });

    if (existLocation) {
        throw new Error(`The Location ${location} is already registered`);
    }
}