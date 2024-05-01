import bcryptjs from 'bcryptjs';

import User from './user.model.js';

export const createUser = async (req, res) =>{

    if(req.user.role === "USER_ROLE"){

        const {name, username, email, password} = req.body;

        const user = new User({

            name,
            username,
            email,
            password,
            role: "USER_ROLE"

        })

        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync(password, salt);
        
        await user.save();

        res.status(200).json({

            msg: `${req.user.username} you successfully created the profile of ${user.username}`

        });

    }else{

        const {name, username, email, password, role} = req.body;

        const user = new User({

            name,
            username,
            email,
            password,
            role

        })

        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync(password, salt);
        
        await user.save();

        res.status(200).json({

            msg: `${req.user.username} you successfully created the profile of ${user.username}`

        });

    }

}

export const listUsers = async (req, res = response) =>{

    const {limit, from} = req.query;

    const query = {state: true};

    const [total,user] = await Promise.all([

        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))

    ]);

    res.status(200).json({

        total,
        user

    })

}