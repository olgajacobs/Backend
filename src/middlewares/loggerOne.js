const loggerOne = (request, response, next) => {
  console.log(`Запрос пришел на адрес: ${request.originalUrl}`);
  next();
};
module.exports = loggerOne;
