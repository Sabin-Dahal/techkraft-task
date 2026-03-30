import * as favouriteService from "../services/favourite.service.js";

export const addFavourite = async (req, res) => {
    try {
        const fav = await favouriteService.addFavourite({userId: req.user.id, propertyId: parseInt(req.params.id)});
        res.json(fav);
    }catch (error){
        res.status(400).json({msg: error.message});
    }
};

export const removeFavourite = async (req, res) => {
    try {
        const fav = await favouriteService.removeFavourite({userId: req.user.id, propertyId: parseInt(req.params.id)});
        res.json(fav);
    }catch (error){
        res.status(400).json({msg: error.message});
    }
};

export const getFavourites = async (req, res) => {
    try {
        const favs = await favouriteService.getFavourites({userId: req.user.id});
        res.json(favs);
    }catch (error){
        res.status(400).json({msg: error.message});
    }
};