/* eslint-disable no-unused-vars */
export const errorHandler = (error, _req, res, _next) => {
  res.status(error.status || 500).json({
    status: 'error',
    message: 'Something went wrong',
    data: { message: error.message }
  });
};
/* eslint-enable no-unused-vars */
