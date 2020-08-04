import { Request, Response, NextFunction } from "express";

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
        //Get the user role from previous midleware
        const admin = res.locals.jwtPayload.admin;

        //Check if array of authorized roles includes the user's role
        if (admin === 1) next();
        else res.status(401).json({
            message: 'Unauthorized'
        });
        return;
};