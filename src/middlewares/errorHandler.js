/* eslint-disable no-unused-vars */
import createError from 'http-errors';

export const errorHandler = (error, req, res, next) => {
    if (createError.isHttpError(error)) {
        const { status, message, errors } = error;
        res.status(status).json({
            status,
            message,
            data: errors || error,
        });
        return;
    }
    const { status = 500, message = 'Something went wrong' } = error;
    res.status(status).json({
        status,
        message,
        data: error.message,
    });
};
/* eslint-enable no-unused-vars */