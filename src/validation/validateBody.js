import createError from 'http-errors';
const { BadRequest } = createError;

export const validateBody = (schema) => {
  return (req, _res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new BadRequest(error.message));
    }
    next();
  };
};
