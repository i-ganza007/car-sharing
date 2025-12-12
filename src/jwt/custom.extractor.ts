import { Request } from "express";

export const customExtractor = (req:Request) : string=> {
    const token = req?.cookies?.['user_cookie'];
    return token;
}