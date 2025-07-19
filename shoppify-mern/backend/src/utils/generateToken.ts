import jwt from "jsonwebtoken";
import { env_config } from "../config/environment";
import { IUser } from "../interfaces/interface";
import crypto from 'crypto';
import RefreshToken from "../models/refreshTokenModel";

/**
 * 
 * @param id 
 * @param role 
 * @returns a token containing object id assigned and role assigned
 */
export const generateToken = ( id : string, role : string ) => {
    return jwt.sign({ id, role }, env_config.jwtSecret as string , {expiresIn : "10s"})
}

export const generateRefreshToken = async (user:IUser) => {
    const token = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    const refreshToken = await RefreshToken.create({
        token,
        user: user._id,
        expiresAt
    })

    return refreshToken.token;
}
