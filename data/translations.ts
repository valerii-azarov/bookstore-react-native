export type TranslationValue = string | { [key: string]: string };

export type Translations = {
  [key: string]: TranslationValue | Translations;
};

const translations: Translations = {  
  screens: {
    welcome: {
      titleFirst: {
        en: "B",
        uk: "K",
      },
      titleRemaining: {
        en: "ookstore",
        uk: "нигарня",
      },
      subtitle: {
        en: "Books are available for order here",
        uk: "Тут книги доступні для замовлення",
      },
      button: {
        en: "Get started",
        uk: "Почати",
      },
    },

    languages: {
      title: {
        en: "Please select language",
        uk: "Будь ласка, виберіть мову",
      },
      languageEn: {
        en: "English",
        uk: "Англійська",
      },
      languageUk: {
        en: "Ukrainian",
        uk: "Українська",
      },
    },

    signIn: {
      titleFirst: {
        en: "B",
        uk: "K",
      },
      titleRemaining: {
        en: "ookstore",
        uk: "нигарня",
      },
      title: {
        en: "Please sign in to your account",
        uk: "Будь ласка, увійдіть у ваш обліковий запис",
      },
      signIn: {
        en: "Sign In",
        uk: "Увійти",
      },
      register: {
        en: "Don't have an account?",
        uk: "Немає облікового запису?",
      },
      registerLink: {
        en: "Sign Up",
        uk: "Зареєструватися",
      },
      or: {
        en: "or",
        uk: "або",
      },
      signInWithGoogle: {
        en: "Sign in with Google",
        uk: "Увійти з Google",
      },
      trouble: {
        en: "Having trouble signing in?",
        uk: "У вас виникли проблеми з входом?",
      },
      troubleLink: {
        en: "Contact us",
        uk: "Зв'яжіться з нами",
      },
      troubleAlert: {
        en: "This feature is still under development",
        uk: "Функція знаходиться в розробці",
      },
    },

    signUp: {
      step1: {
        title: {
          en: "Sign Up",
          uk: "Реєстрація",
        },
        subtitle: {
          en: "Please fill in all required fields",
          uk: "Будь ласка, заповніть всі обов'язкові поля",
        },
        button: {
          en: "Continue",
          uk: "Продовжити",
        },
      },
      step2: {
        title: {
          en: "Auto filling",
          uk: "Автоматичне заповнення",
        },
        notificationTitle: {
          en: "This feature is still under development",
          uk: "Ця функція знаходиться в розробці",
        },
        notificationSubtitle: {
          en: "Auto filling of data for receiving a package Nova Post",
          uk: "Автоматичне заповнення даних для отримання посилки Нова Пошта",
        },
        button: {
          en: "Continue",
          uk: "Продовжити",
        },
      },
      step3: {
        successTitle: {
          en: "Welcome!",
          uk: "Вітаємо!",
        },
        successSubtitle: {
          en: "Your account has been created! Proceed to the main page below.",
          uk: "Ваш обліковий запис створений! Перейдіть на головну сторінку нижче.",
        },
        errorTitle: {
          en: "Error",
          uk: "Помилка",
        },
        errorSubtitle: {
          en: "Please try again later",
          uk: "Будь ласка, спробуйте ще раз пізніше",
        },
        button: {
          en: "Finish",
          uk: "Перейти",
        },
      }
    },
  },

  labels: {
    firstName: {
      en: "First Name",
      uk: "Ім'я",
    },
    lastName: {
      en: "Last Name",
      uk: "Прізвище",
    },
    email: {
      en: "Email",
      uk: "Електронна пошта",
    },
    password: {
      en: "Password",
      uk: "Пароль",
    },
    confirmPassword: {
      en: "Confirm Password",
      uk: "Підтвердіть пароль",
    },
  },

  placeholders: {
    firstName: {
      en: "Enter first name",
      uk: "Введіть ім'я",
    },
    lastName: {
      en: "Enter last name",
      uk: "Введіть прізвище",
    },
    email: {
      en: "Enter email",
      uk: "Введіть електронну пошту",
    },
    password: {
      en: "Enter password",
      uk: "Введіть пароль",
    },
    confirmPassword: {
      en: "Confirm password",
      uk: "Підтвердіть пароль",
    },
  },

  checkmarks: {
    atLeastCharacters: {
      en: "At least 6 characters",
      uk: "Принаймні 6 символів",
    },
    atLeastOneUppercase: {
      en: "At least one uppercase, number, or special char",
      uk: "Принаймні одна велика буква, цифра або спеціальний символ",
    },
    passwordMatch: {
      en: "Passwords match",
      uk: "Паролі співпадають",
    },
  },

  validators: {
    firstNameRequired: {
      en: "First name is required",
      uk: "Ім'я обов'язково",
    },
    firstNameMinLength: {
      en: "First name must be at least 2 characters",
      uk: "Ім'я має бути не менше 2 символів",
    },
    lastNameRequired: {
      en: "Last name is required",
      uk: "Прізвище обов'язково",
    },
    lastNameMinLength: {
      en: "Last name must be at least 2 characters",
      uk: "Прізвище має бути не менше 2 символів",
    },
    emailRequired: {
      en: "Email is required",
      uk: "Електронна пошта обов'язкова",
    },
    emailInvalid: {
      en: "Please enter a valid email address",
      uk: "Будь ласка, введіть правильно електронну пошту",
    },
    passwordRequired: {
      en: "Password is required",
      uk: "Пароль обов'язковий",
    },
    passwordInvalid: {
      en: "Password must be at least 6 characters and contain an uppercase letter, number, or special character",
      uk: "Пароль має бути не менше 6 символів і містити велику букву, цифру або спеціальний символ",
    },
    confirmPasswordRequired: {
      en: "Confirm password is required",
      uk: "Підтвердіть пароль",
    },
    confirmPasswordMatch: {
      en: "Passwords do not match",
      uk: "Паролі не співпадають",
    },
  },
};

export default translations;
