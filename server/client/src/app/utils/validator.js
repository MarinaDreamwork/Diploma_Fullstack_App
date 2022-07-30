export const validator = (data, config) => {
  const errors = {}
  function validate(validateMethod, data, config) {
    let statusValidate;
    const regExpEmail = /^\S+@\S+\.\S{2,3}$/g;
    const regExpCapital = /[A-Z]+/g;
    const regExpDigit = /\d+/g;
    switch(validateMethod) {
      case 'isRequired': {
        console.log('data', typeof data);
        if(typeof data === 'boolean') {
          statusValidate = !data;
        } else if(typeof data === 'number') {
          statusValidate = data === '';
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

export const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapital: {
        message: 'Пароль должен содержать по крайней мере одну заглавную букву'
      },
      isDigit: {
        message: 'Пароль должен содержать по крайней мере одну цифру'
      },
      minSymbols: {
        message: 'Необходимо ввести минимум 8 символов',
        value: 8
      }
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      }
    },
    street: {
      isRequired: {
        message: 'Улица обязательна для заполнения'
      }
    },
    appartment: {
      isRequired: {
        message: '№ дома/квартиры обязательны для заполнения'
      }
    },
    zip: {
      isRequired: {
        message: 'Индекс обязателен для заполнения'
      },
      minSymbols: {
        message: 'Индекс состоит из 6 цифр',
        value: 6
      }
    },
    acceptTerms: {
      isRequired: {
        message: 'Для регистрации необходимо принять и согласиться с правилами предоставления сервиса'
      }
    },
    card_number: {
      isRequired: {
        message: 'Поле card number обязательно для заполнения'
      },
      minSymbols: {
        message: 'В этом поле необходимо ввести 16-значный номер карты',
        value: 16
      }
    },
    exp_date: {
      isRequired: {
        message: 'Заполните срок окончания действия карты'
      }
    },
    sec_code: {
      isRequired: {
        message: 'Введите cvc код'
      },
      minSymbols: {
        message: 'cvc код состоит из 3-х цифр',
        value: 3
      }
    },
    author: {
      isRequired: {
        message: 'Заполните автора'
      }
    },
    book_title: {
      isRequired: {
        message: 'Заполните название товара'
      }
    },
    price:  {
      isRequired: {
        message: 'Заполните цену товара'
      }
    },
    category:  {
      isRequired: {
        message: 'Заполните категорию товара'
      }
    },
    subCategory: {
      isRequired: {
        message: 'Заполните подкатегорию товара'
      }
    },
    subSubCategory: {
      isRequired: {
        message: 'Заполните под-подкатегорию товара'
      }
    },
    description: {
      isRequired: {
        message: 'Заполните краткое описание товара'
      }
    },
    articleNumber: {
      isRequired: {
        message: 'Заполните номер артикула товара'
      }
    },
    inStock: {
      isRequired: {
        message: 'Заполните количество товара на складе'
      }
    },
    src: {
      isRequired: {
        message: 'Заполните путь к изображению товара'
      }
    },
    content: {
       isRequired: {
        message: 'Заполните цитату'
      }
    }

  };