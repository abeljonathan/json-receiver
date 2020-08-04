import { Request, Response } from "express";
import { connect } from "../database";
import { User } from "../interface/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function apiWelcome(req: Request, res: Response): Response {
    return res.json('Welcome to API JSON RECEIVER');
};

export async function logIn(req: Request, res: Response) {
    //Check if username and password are set
    let { user, password } = req.body;
    if (!(user && password)) {
        return res.status(400).json({
            message: 'Incorrect data received'
        });
    }
    try {
        const conn = await connect();
        const users = await conn.query('SELECT id, user, password, admin FROM json_user WHERE user = ?', [user]);
        const result = JSON.parse(JSON.stringify(users[0])); // Hacky solution;
        if (result.length < 1) {
            return res.json({
                message: 'User not found'
            });
        } else if (result[0]) {
            
            const match = await bcrypt.compare(password, result[0].password);
            if (match) {
                //login
                //Sing JWT, valid for 1 hour
                const token = jwt.sign(
                    { userId: result[0].id, userName: result[0].user, admin: result[0].admin },
                    req.app.get('secretWordShh'),
                    { expiresIn: "8h" }
                );

                //Send the jwt in the response
                res.json({
                    token
                });
            }
            else {
                return res.status(401).json({
                    message: 'Incorrect password'
                });
            }
        } else {
            return res.json({
                message: 'Error receiving data'
            });
        }
    } catch (error) {
        return res.json({
            error
        });
    }

}

export async function getUser(req: Request, res: Response): Promise<Response> {
    const user = req.params.user;
    const conn = await connect();
    const users = await conn.query('SELECT * FROM json_user WHERE user = ?', [user]);
    return res.json(users[0]);
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const user = req.params.user;
    const conn = await connect();
    await conn.query('DELETE FROM json_user WHERE user_id = ?', [user]);
    return res.json({
        message: 'User deleted'
    });
}

export async function updateUser(req: Request, res: Response) {
    const user = req.params.user;
    const updateUser: User = req.body;
    const conn = await connect();
    conn.query('UPDATE json_user SET ? WHERE user = ?', [updateUser, user]);
    return res.json({
        message: 'User updated'
    });
}