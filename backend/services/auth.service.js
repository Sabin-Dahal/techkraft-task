import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async ({ name, email, password, role }) => {
  if(!name || !email || !password) throw new Error("Please fill all required fields");
  const hashed = await bcrypt.hash(password, 10);
  const existing = await prisma.user.findUnique({
    where:{email}});
  if (existing) throw new Error("User already exists");
  if (!["BUYER", "SELLER"].includes(role)) {
      throw new Error("Invalid role. Must be BUYER or SELLER");
  }
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: role
    },
  });
  return {id: user.id, name: user.name, email: user.email, role: user.role};
};


export const login = async ({ email, password }) => {
  if (!email || !password) throw new Error ("Email and password required");
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

    const token = jwt.sign(
    {
        id: user.id,
        name: user.name,
        role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
    );

  return { token };
};

