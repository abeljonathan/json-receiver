import { Request, Response } from "express";
import { connect } from "../database";
import { User } from "../interface/user";
import bcrypt from "bcryptjs";

export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const users = await conn.query('SELECT id, user, admin FROM json_user')
        return res.json(users[0]);
    } catch (error) {
        return res.json({
            error
        });
    }

}

export async function createUser(req: Request, res: Response) {
    try {
        const newUser: User = req.body;
        const password = newUser.password;
        const saltRounds = 10;
        const hashedPassword: string = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        });
        newUser.password = hashedPassword;
        const conn = await connect();
        await conn.query('INSERT INTO json_user SET ?', [newUser]);
        return res.status(201).json({
            message: 'User created'
        });
    } catch (error) {
        return res.json({
            error
        });
    }

}

export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        const user = req.params.user;
        const conn = await connect();
        const users = await conn.query('SELECT id, user, admin FROM json_user WHERE user = ?', [user]);
        return res.json(users[0]);
    } catch (error) {
        return res.json({
            error
        });
    }

}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    try {
        const user = req.params.user;
        const conn = await connect();
        await conn.query('DELETE FROM json_user WHERE user = ?', [user]);
        return res.json({
            message: 'User deleted'
        });
    } catch (error) {
        return res.json({
            error
        });
    }

}

export async function updateUser(req: Request, res: Response) {
    try {
        const user = req.params.user;
        const updateUser: User = req.body;
        const conn = await connect();
        await conn.query('UPDATE json_user SET ? WHERE user = ?', [updateUser, user]);
        return res.json({
            message: 'User updated'
        });
    } catch (error) {
        return res.json({
            error
        });
    }

}