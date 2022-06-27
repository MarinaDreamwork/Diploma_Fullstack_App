export const validator = (data, config) => {
  const errors = {}
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch(validateMethod) {
      case 'isRequired':
        statusValidate = data.trim() === '';
        break;
      case 'isEmail':
        const regExpEmail = /^\S+@\S+\.\S{2,3}$/g;
        statusValidate = !regExpEmail.test(data);
        break;
      case 'isCapital':
        const regExpCapital = /[A-Z]+/g;
        statusValidate = !regExpCapital.test(data);
        break;
      case 'isDigit':
        const regExpDigit = /\d+/g;
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