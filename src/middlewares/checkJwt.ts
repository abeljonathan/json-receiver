import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["authorization"];

  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, req.app.get('secretWordShh'));
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).json({
      message: 'Unauthorized'
    });
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, userName, admin } = jwtPayload;
  const newToken = jwt.sign({ userId, userName, admin }, req.app.get('secretWordShh'), {
    expiresIn: "8h"
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};