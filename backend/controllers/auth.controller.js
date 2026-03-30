import * as authServices from "../services/auth.service.js"

export const register = async (req, res) =>{
    try{
        const user = await authServices.register(req.body);
        res.json(user);
    }catch(err){
        res.status(400).json({msg: err.message});
    }
};

export const login = async(req, res) =>{
    try{
        const data = await authServices.login(req.body);
        res.json(data);
    }catch(err){
        res.status(400).json({msg: err.message});
    }
};