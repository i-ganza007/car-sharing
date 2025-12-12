import { Request } from "express";

export const customExtractor = (req:Request) : string=> {
    const token = req?.cookies?.['user_cookie'];
    console.log('Cookie extractor - All cookies:', req?.cookies);
    console.log('Cookie extractor - user_cookie token:', token ? 'TOKEN EXISTS' : 'NO TOKEN');
    return token;
}