import User from '../user/user.model.js';

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