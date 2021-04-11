export const errorHandler = (error, req, res, next) => {
  res.json(error);
};

export const notFound = (req, res, next) => {
  throw new Error("The Api Endpoint doesn't exist");
};
