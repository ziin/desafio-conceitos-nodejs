class NotFoundError extends Error {
  constructor(modelName = "Model") {
    super(`${modelName}: Not found`);
  }
}

module.exports = {
  NotFoundError,
};
