
import { Request, Response } from "express";
import * as service from "../services/auth.service";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const data = await service.register(req.body.email, req.body.password);
    res.json(data);
  } catch (e) {
    console.error("REGISTER ERROR:", e);
    res.status(400).json({ message: "Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await service.login(req.body.email, req.body.password);
    res.json(data);
  } catch (e) {
    res.status(401).json({ message: "Invalid" });
  }
};


export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token missing" });

    const decoded: any = jwt.verify(refreshToken, "refresh_secret");

    const accessToken = service.generateNewAccessToken(decoded.userId);

    res.json({ accessToken });
  } catch (e) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.json({ message: "Logged out successfully" });
};
