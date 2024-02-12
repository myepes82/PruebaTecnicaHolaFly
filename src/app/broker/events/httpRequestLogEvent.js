class HttpRequestLogEvent {
    constructor(
        action, headers, ip
    ){
        this.action = action
        this.headers = headers
        this.ip = ip
    }
}