export const errorHandler = (error, req, res, next) => {
  console.log("INSIDE ERROR HANDLER");
  console.log(error.message);

  res.statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.json(error.message);
};

export const notFound = (req, res, next) => {
  throw new Error("The Api Endpoint doesn't exist");
};
