export const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({
      status: 'error',
      message: 'Something went wrong',
      data: { message: error.message }
    });
  };
  