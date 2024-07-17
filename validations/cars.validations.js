const hasAllRequiredFields = (req, res, next) => {
  const requiredFields = ['make', 'model', 'year']; 
  if(!requiredFields.every(field => req.body[field])){
    const missingFields = requiredFields.filter(field => !req.body[field]);
    return res.status(400).json(missingFields);
  }
  return next();
};

const validateFieldsDataTypes = (req, res, next) => {
  const {year, price} = req.body;
  if(Number(year) === NaN){
    return res.status(400).json({error: 'Year must be a number'});
  }
  if(price && typeof price !== 'number'){
    return res.status(400).json({error: 'Price must be a number'});
  }
  return next();
};

module.exports = {hasAllRequiredFields, validateFieldsDataTypes};
