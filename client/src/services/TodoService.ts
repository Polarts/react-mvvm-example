import TodoItem from '../models/TodoItem';
import ServerResponseInterface from './ServerResponseInterface';
import { Server } from 'http';

const url = "http://localhost:4963/todos";

const headers = {
    'Content-Type': 'application/json',
}

export default class TodoService {

    //#region singleton

    private static _instance : TodoService;

    private constructor(){}

    public static get instance() {
        return this._instance ?? (this._instance = new TodoService())
    }

    //#endregion

    //#region methods

    //#region get

    public async getAllTodos() : Promise<ServerResponseInterface<Array<TodoItem>>> {

        try {
            
            let response = await fetch(url, { headers });

            if (!response.ok) {
                return { didFail: true, failReason: response.statusText };
            }

            var data = await response.json();
            return { didFail: false, data };

        } catch(e) {
            return { didFail: false, failReason: String(e) };
        }
    }

    //#endregion

    //#region post

    public async addNewTodo(body : {content : string}) : Promise<ServerResponseInterface<number>> {

        try {
            let response = await fetch(url, { method: 'post', body: JSON.stringify({...body, isDone: false}), headers });

            if (!response.ok) {
                return { didFail: true, failReason: response.statusText };
            }

            var item : TodoItem = await response.json();
            return { didFail: false, data: item.id };

        } catch (e) {
            return { didFail: true, failReason: String(e) };
        }
    }

    //#endregion

    //#region put

    public async updateTodo(id: number, body : {content?: string, isDone?: boolean}) : Promise<ServerResponseInterface<undefined>> {
        try {
            let response = await fetch(`${url}/${id}`, { method: 'put', body: JSON.stringify(body), headers });

            if (!response.ok) {
                return { didFail: true, failReason: response.statusText };
            }

            return { didFail: false };

        } catch (e) {
            return { didFail: true, failReason: String(e) };
        }
    }    

    //#endregion

    //#region delete

    public async deleteTodo(id: number) : Promise<ServerResponseInterface<undefined>> {
        try {
            let response = await fetch(`${url}/${id}`, { method: 'delete', headers });

            if (!response.ok) {
                return { didFail: true, failReason: response.statusText };
            }

            return { didFail: false };
        } catch (e) {
            return { didFail: true, failReason: String(e) };
        }
    }

    //#endregion

    //#endregion
}