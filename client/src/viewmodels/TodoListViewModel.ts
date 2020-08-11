import { observable, computed } from 'mobx';
import TodoItem from '../models/TodoItem';
import TodoService from '../services/TodoService';
import PromiseAwareViewModelBase from './PromiseAwareViewModelBase';
import TodoItemViewModel from './TodoItemViewModel';

export default class TodoListViewModel extends PromiseAwareViewModelBase {

    constructor(
        private service : TodoService
    ) { super() }

    //#region properties

    @observable 
    public todoItems : Array<TodoItemViewModel> = [];

    @computed
    public get todosCount() { return this.todoItems?.length ?? 0 }

    //#endregion

    //#region methods

    public async fetchTodoItems() {
        await this.runWithAwareness(async () => {
            var response = await this.service.getAllTodos();

            if (response.didFail) {
                this.didRequestFail = true;
                this.failReason = response.failReason;
            } else {
                this.todoItems = (response.data as Array<TodoItem>).map(item => new TodoItemViewModel(this.service, item));
            }
        });
    }

    public async addTodoItem(content: string) {
        await this.runWithAwareness(async () => {
            if (!content) {
                this.didRequestFail = true;
                this.failReason = 'Please provide content for your todo item!';
                this.isAwaiting = false;
                return;
            }
    
            var response = await this.service.addNewTodo({content});
    
            if (response.didFail) {
                this.didRequestFail = true;
                this.failReason = response.failReason;
            } else {
                this.todoItems.push(
                    new TodoItemViewModel(
                        this.service,
                        new TodoItem(
                            response.data as number, 
                            content, 
                            false
                        )
                    )
                );
            }
        });
    }

    public async deleteTodoItem(id: number) {
        await this.runWithAwareness(async () => {
            var response = await this.service.deleteTodo(id);

            if (response.didFail) {
                this.didRequestFail = true;
                this.failReason = response.failReason;
            } else {
                this.todoItems = this.todoItems.filter(item => item.id !== id);
            }
        });
    }

    //#endregion

}