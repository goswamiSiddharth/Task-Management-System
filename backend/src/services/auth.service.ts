import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const register = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashed });

  return {
    accessToken: generateAccessToken(user.id),
    refreshToken: generateRefreshToken(user.id),
  };
};

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  return {
    accessToken: generateAccessToken(user.id),
    refreshToken: generateRefreshToken(user.id),
  };
};

export const generateNewAccessToken = (userId: string) => {
  return generateAccessToken(userId);
};
