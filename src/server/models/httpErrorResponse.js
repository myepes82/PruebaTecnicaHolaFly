class HttpErrorResponse extends HttpResponseModel {
    error_type
    description
    constructor(errorType, description){
        super(false, null)
        this.error_type = errorType
        this.description = description
    }
}