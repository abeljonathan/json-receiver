import { Request, Response } from "express";
import { connect } from "../database";
import { JsonData } from "../interface/jsonData";

export async function getJsonData(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const jsons = await conn.query('SELECT id, json_data, created_at FROM json_all_data')
        return res.json(jsons[0]);
    } catch (error) {
        return res.json({
            error
        });
    }

}

export async function createJsonData(req: Request, res: Response) {
    //Check if username and JSON is set
    let { json_data } = req.body;
    if (!json_data) {
        return res.status(400).json({
            message: 'Incorrect data received'
        });
    }
    try {
        const newJsonData: JsonData = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO json_all_data (json_data) VALUES (?)', [JSON.stringify(newJsonData.json_data)]);
        return res.status(201).json({
            message: 'JSON created'
        });
    } catch (error) {
        return res.json({
            error
        });
    }

}