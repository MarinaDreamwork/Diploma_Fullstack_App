export function useAuthError(message) {
  switch(message) {
    case 'INVALID_PASSWORD': 
      return 'Пароль введен неверно';
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким Email уже существует';
    case 'EMAIL_NOT_FOUND':
      return 'Пользователь с таким Email не зарегистрирован';
    default: 
      return 'Слишком много попыток входа. Попробуйте зайти позже';
  }
}