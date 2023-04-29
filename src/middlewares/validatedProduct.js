const validatedProductName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  return next();
};

const validatedProductParams = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    return next({
      status: 400,
      message: `"${id ? 'name' : 'id'}" is required`,
    });
  }

  if (name.length < 5) {
    return next({
      status: 422,
      message: '"name" length must be at least 5 characters long',
    });
  }

  return next();
};

module.exports = {
  validatedProductName,
  validatedProductParams,
};
