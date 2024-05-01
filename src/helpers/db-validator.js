import User from '../user/user.model.js';

import Role from '../role/role.model.js';

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