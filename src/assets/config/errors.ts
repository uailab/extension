interface ResponseError {
    statusCode: number;
    message: string;
};

const ResponseErrors: { [key: string]: ResponseError } = {
    "internal_error":{
        message: "Server Error",
        statusCode: 500
    }
};

export default ResponseErrors;
