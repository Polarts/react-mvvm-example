export default interface ServerResponseInterface<T> {
    didFail : boolean,
    failReason? : string,
    data? : T 
}
