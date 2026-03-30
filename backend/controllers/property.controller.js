import * as propertyService from "../services/property.service.js";

export const getAll = async (req, res) => {
    try {
        res.json(await propertyService.getAll());
    }catch (error){
        res.status(400).json({msg: error.message});
    }
};

export const getById = async (req, res) => {
    try {
        const property = await propertyService.getById(Number(req.params.id));
        res.json(property);
    }catch (error){
        res.status(400).json({msg: error.message});
    }
};
