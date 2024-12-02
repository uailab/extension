interface ResponseError {
    statusCode: 100 | 101 | 102 | 200 | 201 | 202 | 204 | 301 | 302 | 304 | 400 | 401 | 403 | 404 | 500 | 501 | 502 | 503;
    message: string;
};

export type ResponseErrorsParams = "internal_error" | "no_credentials_send" | "no_data_send";

export const ResponseErrors: Record<ResponseErrorsParams, ResponseError> = {
    internal_error: {
        message: "Server Error",
        statusCode: 500
    },
    no_credentials_send: {
        message: "No credentials send",
        statusCode: 401
    },
    no_data_send: {
        message: "No data send",
        statusCode: 401
    },
};