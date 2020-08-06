import {observable, computed} from 'mobx';
import TodoItem from '../models/TodoItem';
import TodoService from '../services/TodoService';

export default class TodoListViewModel {

    constructor(
        private service : TodoService
    ) {}

    @observable 
    public todoItems : Array<TodoItem> = [];

    @observable
    public isAwaiting : boolean = false;

    @observable
    public didRequestFail : boolean = false;

    @computed
    public get todosCount() { return this.todoItems.length }

    public async addTodoItem() {
        this.isAwaiting = true;
        


        this.isAwaiting = false;
    }

}