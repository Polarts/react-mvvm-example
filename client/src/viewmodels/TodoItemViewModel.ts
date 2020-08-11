import { observable } from 'mobx';
import PromiseAwareViewModelBase from './PromiseAwareViewModelBase';
import TodoService from '../services/TodoService';
import TodoItem from '../models/TodoItem';

export default class TodoItemViewModel extends PromiseAwareViewModelBase {

    constructor(
        private service: TodoService,
        model : TodoItem
    ) { 
        super();
        this.id = model.id;
        this.content = model.content;
        this.isDone = model.isDone;
    }

    //#region properties

    public id : number = 0;

    @observable
    public content : string = '';

    @observable
    public isDone : boolean = false;

    //#endregion

    //#region methods

    public async updateContent(content : string) {
        await this.runWithAwareness(async () => {
            if (!content) {
                this.didRequestFail = true;
                this.failReason = 'Please provide content for your todo item!';
                this.isAwaiting = false;
                return;
            }
            
            var response = await this.service.updateTodo(this.id, {content, isDone: this.isDone});

            if (response.didFail) {
                this.didRequestFail = true;
                this.failReason = response.failReason;
            } else {
                this.content = content;
            }
        });
    }

    public async setIsDone(isDone : boolean) {
        await this.runWithAwareness(async () => {
            var response = await this.service.updateTodo(this.id, {content: this.content, isDone});

            if (response.didFail) {
                this.didRequestFail = true;
                this.failReason = response.failReason;
            } else {
                this.isDone = isDone;
            }
        });
    }

    //#endregion

}