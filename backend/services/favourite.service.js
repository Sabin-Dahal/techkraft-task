import prisma from "../config/prisma.js"
import properties from "../data/properties.json" with {type: "json"};

export const addFavourite = async({userId, propertyId}) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) throw new Error("Property doesnt exist");
    const existing = await prisma.favourite.findUnique({
        where:{userId_propertyId:{userId,propertyId}}
    });
    if (existing) throw new Error("Already in favourites");
    return prisma.favourite.create({
        data:{userId, propertyId}
    });
};

export const removeFavourite = async({userId, propertyId}) => {
    const property = properties.find(p => p.id === propertyId);
    if(!property) throw new Error("Property doesnt exist");

    const existing = await prisma.favourite.findUnique({
        where:{userId_propertyId:{userId,propertyId}}
    });
    if (!existing) throw new Error("Not in favourites already");
    
    return prisma.favourite.delete({
        where: {
        userId_propertyId: { userId, propertyId }
        }
    });
};

export const getFavourites = async({userId})=>{
    const favs = await prisma.favourite.findMany({
        where:{userId}
    });
    if (!favs) throw new Error ("No Favourites");
    return favs.map(f=>
        properties.find(p => p.id === f.propertyId)
    );
};