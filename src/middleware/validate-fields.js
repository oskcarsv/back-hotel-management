import { validationResult } from 'express-validator';

export const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

export const validateRol = (req, res, next) =>{

    const {role} = req.body;

    if(req.user.role === "USER_ROLE"){

        if(!role == "" || !role == null){

            return res.status(403).json({

                msg: `${req.user.username}, you can't asign roles to a new Profile.`

            })

        }

    }

    if(req.user.role === "ADMIN_EMPLOYEE_ROLE"){

        if(role == "ADMIN_BOSS_ROLE" || role == "SUPER_ROLE" || role == "ADMIN_EMPLOYEE_ROLE"){

            return res.status(403).json({

                msg: `${req.user.username}, you can't asign ADMIN_EMPLOYEE_ROLE, ADMIN_BOSS_ROLE or SUPER_ROLE to a Profile`

            })

        }

    }

    if(req.user.role === "ADMIN_BOSS_ROLE"){

        if(role == "ADMIN_BOSS_ROLE" || role == "SUPER_ROLE"){

            return res.status(403).json({

                msg: `${req.user.username}, you can't asign ADMIN_BOSS_ROLE or SUPER_ROLE to a Profile`

            })

        }

    }

    next();

}