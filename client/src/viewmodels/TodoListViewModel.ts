import {observable, computed} from 'mobx';
import TodoItem from '../models/TodoItem';
import TodoService from '../services/TodoService';

export default class TodoListViewModel {

    //#region ctor & init

    constructor(
        private service : TodoService
    ) { }

    public async initAsync() {
        this.isAwaiting = true;

        var response = await this.service.getAllTodos();

        if (response.didFail) {
            this.didRequestFail = true;
            this.failReason = response.failReason;
        } else {
            this.todoItems = response.data as Array<TodoItem>;
        }

        this.isAwaiting = false;
    }

    //#endregion

    @observable 
    public todoItems : Array<TodoItem> = [];

    //#region server communication states

    @observable
    public isAwaiting : boolean = false;

    @observable
    public didRequestFail : boolean = false;

    @observable
    public failReason? : string;

    //#endregion

    @computed
    public get todosCount() { return this.todoItems?.length ?? 0 }

    public async addTodoItem(content: string) {
        this.didRequestFail = false;
        this.isAwaiting = true;
        
        var response = await this.service.addNewTodo({content});

        if (response.didFail) {
            this.didRequestFail = true;
            this.failReason = response.failReason;
        } else {
            console.log(response.data);
            this.todoItems.push(
                new TodoItem(
                    response.data as number, 
                    content, 
                    false
                )
            );
        }

        this.isAwaiting = false;
    }

}