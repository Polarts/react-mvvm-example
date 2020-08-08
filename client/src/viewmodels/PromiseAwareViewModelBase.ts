import { observable } from 'mobx';

export default class PromiseAwareViewModelBase {

    //#region properties

    @observable
    public isAwaiting : boolean = false;

    @observable
    public didRequestFail : boolean = false;

    @observable
    public failReason? : string;

    //#endregion

    //#region methods

    /**
     * Runs an action wrapped with service awareness.
     * This method will raise isAwaiting before calling the action, and then set it to false.
     * @param action An async function
     */
    protected async runWithAwareness(action : () => Promise<void>) {
        this.didRequestFail = false;
        this.isAwaiting = true;
        await action();
        this.isAwaiting = false;
    }

    //#endregion

}