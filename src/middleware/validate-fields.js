import { validationResult } from 'express-validator';

import User from '../user/user.model.js';

export const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

export const validateRolCreate = (req, res, next) =>{

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

export const validateRolDelete = async (req, res, next) =>{

    const {usernameOrEmail} = req.body;

    if(req.user.role === "USER_ROLE"){

        if(!usernameOrEmail == "" || !usernameOrEmail == null){

            return res.status(403).json({

                msg: `${req.user.username}, you can't asign delete the profiles of others users.`
    
            });

        }

    }

    if(req.user.role === "ADMIN_EMPLOYEE_ROLE"){

        if(usernameOrEmail.includes('@')){

            const user = await User.findOne({email: usernameOrEmail});

            if(user.role == "ADMIN_EMPLOYEE_ROLE" || user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){

                return res.status(403).json({

                    msg: `${req.user.username}, you can't delete a Profile with a Roles: ADMIN_EMPLOYEE_ROLE, ADMIN_BOSS_ROLE or SUPER_ROLE`

                })

            }

        }else{

            const user = await User.findOne({username: usernameOrEmail});

            if(user.role == "ADMIN_EMPLOYEE_ROLE" || user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){

                return res.status(403).json({

                    msg: `${req.user.username}, you can't delete a Profile with a Roles: ADMIN_EMPLOYEE_ROLE, ADMIN_BOSS_ROLE or SUPER_ROLE`

                })

            }

        }

    }

    if(req.user.role === "ADMIN_BOSS_ROLE"){

        if(!usernameOrEmail == "" || !usernameOrEmail == null){

            if(usernameOrEmail.includes('@')){

                const user = await User.findOne({email: usernameOrEmail})
    
                if(user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){
    
                    return res.status(403).json({
    
                        msg: `${req.user.username}, you can't update a Profile with a Roles: ADMIN_BOSS_ROLE or SUPER_ROLE`
    
                    })
    
                }
    
            }else{
    
                const user = await User.findOne({username: usernameOrEmail});
    
                if(user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){
    
                    return res.status(403).json({
    
                        msg: `${req.user.username}, you can't update a Profile with a Roles: ADMIN_BOSS_ROLE or SUPER_ROLE`
    
                    })
    
                }
    
            }


        }

        if(usernameOrEmail.includes('@')){

            const user = await User.findOne({email: usernameOrEmail});

            if(user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){

                return res.status(403).json({

                    msg: `${req.user.username}, you can't delete a Profile with a Roles: ADMIN_BOSS_ROLE or SUPER_ROLE`

                })

            }

        }else{

            const user = await User.findOne({username: usernameOrEmail});

            if(user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){

                return res.status(403).json({

                    msg: `${req.user.username}, you can't delete a Profile with a Roles: ADMIN_BOSS_ROLE or SUPER_ROLE`

                })

            }

        }

    }

    next();

}

export const validateRolUpdate = async (req, res, next) =>{

    const {usernameOrEmail} = req.body;

    if(req.user.role === "USER_ROLE"){

        if(!usernameOrEmail == "" || !usernameOrEmail == null){

            return res.status(403).json({

                msg: `${req.user.username}, you can't asign update the profiles of others users.`
    
            });

        }

    }

    if(req.user.role === "ADMIN_EMPLOYEE_ROLE"){

        if(usernameOrEmail.includes('@')){

            const user = await User.findOne({email: usernameOrEmail});

            if(user.role == "ADMIN_EMPLOYEE_ROLE" || user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){

                return res.status(403).json({

                    msg: `${req.user.username}, you can't update a Profile with a Roles: ADMIN_EMPLOYEE_ROLE, ADMIN_BOSS_ROLE or SUPER_ROLE`

                })

            }

        }else{

            const user = await User.findOne({username: usernameOrEmail});

            if(user.role == "ADMIN_EMPLOYEE_ROLE" || user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){

                return res.status(403).json({

                    msg: `${req.user.username}, you can't update a Profile with a Roles: ADMIN_EMPLOYEE_ROLE, ADMIN_BOSS_ROLE or SUPER_ROLE`

                })

            }

        }

    }

    if(req.user.role === "ADMIN_BOSS_ROLE"){

        if(!usernameOrEmail == "" || usernameOrEmail == null){

            if(usernameOrEmail.includes('@')){

                const user = await User.findOne({email: usernameOrEmail})
    
                if(user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){
    
                    return res.status(403).json({
    
                        msg: `${req.user.username}, you can't update a Profile with a Roles: ADMIN_BOSS_ROLE or SUPER_ROLE`
    
                    })
    
                }
    
            }else{
    
                const user = await User.findOne({username: usernameOrEmail});
    
                if(user.role == "ADMIN_BOSS_ROLE" || user.role == "SUPER_ROLE"){
    
                    return res.status(403).json({
    
                        msg: `${req.user.username}, you can't update a Profile with a Roles: ADMIN_BOSS_ROLE or SUPER_ROLE`
    
                    })
    
                }
    
            }

        }

    }

    next();

}