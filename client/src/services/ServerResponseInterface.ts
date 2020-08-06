export default interface ServerResponse<T> {
    didFail: boolean,
    data: T
}
