export const errorHandlerMiddleware = (error, req, res, next) => {
    if (res.headersSent) {
      return next(error);
    }
    res.status(500).send(error.message);
  };
  