const httpStatusCodesConstants = require("./httpStatusCodesConstants");

module.exports  = {
    OK: {
        type: "OK",
        httpStatusCode: httpStatusCodesConstants.OK
    },
    BAD_REQUEST : {
        type: "BAD REQUEST", 
        httpStatusCode: httpStatusCodesConstants.BAD_REQUEST
    }, 
    RESOURCE_NOT_FOUND : {
        type: "RESOURCE NOT FOUND",
        httpStatusCode: httpStatusCodesConstants.NOT_FOUND
    },
    INTERNAL_SERVER_ERROR : {
        type: "INTERNAL SERVER ERROR",
        httpStatusCode: httpStatusCodesConstants.INTERNAL_SERVER_ERROR
    },
    
}