import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import TodoItem from '../models/TodoItem';
import ServerResponse from './ServerResponseInterface';

const URL = "https://premaxillary-grove.000webhostapp.com/";

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

    public async getAllTodos() : Promise<ServerResponse<Array<TodoItem>>> {

        let response = await Axios.request<TodoItem, AxiosResponse<Array<TodoItem>>>({
            url: URL,
            responseType: "json"
        });

        if (response.status != 200) {
            return { didFail: true, data: [] };
        }

        return { didFail: false, data: response.data };
    }

    //#endregion

    //#region post

    public async addNewTodo() : Promise<boolean> {
        let response = await Axios.request<boolean, AxiosResponse<boolean>>({
            url: URL
        })
        return response.status == 200;
    }

    //#endregion

    //#endregion

}