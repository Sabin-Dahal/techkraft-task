import properties from "../data/properties.json" with {type: "json"};

export const getAll = ()=> properties;

export const getById = (id) => {
    const property = properties.find(p => p.id === id);
    if (!property) throw new Error("Property not found");
    return property;
};