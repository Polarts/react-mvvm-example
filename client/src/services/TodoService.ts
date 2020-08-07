import TodoItem from '../models/TodoItem';
import ServerResponseInterface from './ServerResponseInterface';

const url = "https://premaxillary-grove.000webhostapp.com/";

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
            
            let response = await fetch(url);

            if (response.status !== 200) {
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

    public async addNewTodo(body: {content : string}) : Promise<ServerResponseInterface<number>> {

        try {
            let response = await fetch(url, { method: 'post', body: JSON.stringify(body) });

            if (response.status !== 200) {
                return { didFail: true, failReason: response.statusText };
            }

            var data = await response.json();
            return { didFail: false, data: data };

        } catch (e) {
            console.log(e);
            return { didFail: true, failReason: String(e) };
        }
    }

    //#endregion

    //#endregion
}