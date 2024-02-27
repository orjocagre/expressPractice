function logErrors (err, req, res, next) {
  console.log('----------------LOG ERRORS');
  console.error(err);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  console.log('----------------BOOM');
  if(err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next (err);
  }
}


function errorHandler (err, req, res, next) {
  console.log('----------------ERROR HANDLER');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}


module.exports = { logErrors, errorHandler, boomErrorHandler };
