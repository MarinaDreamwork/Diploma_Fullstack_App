export const validator = (data, config) => {
  const errors = {}
  function validate(validateMethod, data, config) {
    let statusValidate;
    const regExpEmail = /^\S+@\S+\.\S{2,3}$/g;
    const regExpCapital = /[A-Z]+/g;
    const regExpDigit = /\d+/g;
    switch(validateMethod) {
      case 'isRequired': {
        if(typeof data === 'boolean') {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === '';
        }
        break;
      }
      case 'isEmail':
        statusValidate = !regExpEmail.test(data);
        break;
      case 'isCapital':
        statusValidate = !regExpCapital.test(data);
        break;
      case 'isDigit':
        statusValidate = !regExpDigit.test(data);
        break;
      case 'minSymbols':
        statusValidate = data.length < config.value;
        break;
      default:
        break;
    }
    if(statusValidate) {
      return config.message;
    }
  }
  for(const fieldName in data) {
    for(const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
      // чтобы ошибки не заменялись 
      if(error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}