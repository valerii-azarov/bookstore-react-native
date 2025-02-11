export type TranslationValue = string | { [key: string]: string };

export type Translations = {
  [key: string]: TranslationValue | Translations;
};

const translations: Translations = {
  tabs: {
    books: {
      en: "Books",
      uk: "Книги",
    },
    search: {
      en: "Search",
      uk: "Пошук",
    },
    orders: {
      en: "Orders",
      uk: "Замовлення",
    },
    orderHistory: {
      en: "Order History",
      uk: "Історія замовлень",
    },
    menu: {
      en: "Menu",
      uk: "Меню",
    },
  },

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
      header: {
        en: "Change language",
        uk: "Зміна мови",
      },
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
      header: {
        en: "Sign Up",
        uk: "Реєстрація",
      },
      buttonContinue: {
        en: "Continue",
        uk: "Продовжити",
      },
      buttonFinish: {
        en: "Finish",
        uk: "Перейти",
      },
      buttonBack: {
        en: "Go back",
        uk: "Вийти",
      },
      step1: {
        title: {
          en: "Please fill in all required fields",
          uk: "Будь ласка, заповніть всі обов'язкові поля",
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
        errorReason: {
          en: "Reason",
          uk: "Причина",
        },
      },
    },

    menu: {
      header: {
        welcome: {
          en: "Hello",
          uk: "Вітаю",
        },
      },
      balance: {
        bonuses: {
          en: "bonuses",
          uk: "бонуси",
        },
        offers: {
          en: "offers",
          uk: "пропозиції",
        },
      },
      profile: {
        en: "Profile",
        uk: "Профіль",
      },
      favorites: {
        en: "Favorites",
        uk: "Збережені книги",
      },
      viewingHistory: {
        en: "Viewing History",
        uk: "Переглянуті книги",
      },
      languages: {
        en: "Language",
        uk: "Мова",
      },
      logout: {
        en: "Logout",
        uk: "Вийти",
      },
      version: {
        en: "Version",
        uk: "Версія додатку",
      },
    },

    profile: {
      header: {
        en: "Profile",
        uk: "Профіль",
      },
      fields: {
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
      },
      button: {
        en: "Edit",
        uk: "Змінити",
      },
    },

    editProfile: {
      header: {
        firstName: {
          en: "Change First Name",
          uk: "Зміна імені",
        },
        lastName: {
          en: "Change Last Name",
          uk: "Зміна прізвища",          
        },
      },
      fields: {
        firstName: {
          label: {
            en: "New First Name",
            uk: "Нове ім'я",
          },
          placeholder: {
            en: "Enter your new first name",
            uk: "Введіть нове ім'я",
          },
        },
        lastName: {
          label: {
            en: "New Last Name",
            uk: "Нове прізвище",
          },
          placeholder: {
            en: "Enter your last name",
            uk: "Введіть нове прізвище",
          },
        },
      },
      button: {
        en: "Save",
        uk: "Зберегти",
      },
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
      en: "Enter your first name",
      uk: "Введіть ім'я",
    },
    lastName: {
      en: "Enter your last name",
      uk: "Введіть прізвище",
    },
    email: {
      en: "Enter your email",
      uk: "Введіть електронну пошту",
    },
    password: {
      en: "Enter your password",
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

  alerts: {
    confirmLogout: {
      title: {
        en: "Confirm",
        uk: "Підтвердження",
      },
      message: {
        en: "Are you sure you want to log out?",
        uk: "Ви впевнені, що хочете вийти?",
      },
      cancel: {
        en: "Cancel",
        uk: "Скасувати",
      },
      confirm: {
        en: "Confirm",
        uk: "Підтвердити",
      },
    },
    error: {
      title: {
        en: "Error",
        uk: "Помилка",
      },
    },
  },

  errorMessages: {
    invalidCredentials: {
      en: "Invalid email or password",
      uk: "Неправильний email або пароль",
    },
    userDisabled: {
      en: "Your account has been disabled. Please contact support",
      uk: "Ваш акаунт заблоковано. Зверніться до підтримки",
    },
    networkRequestFailed: {
      en: "Network error. Please check your internet connection",
      uk: "Помилка мережі. Перевірте підключення до Інтернету",
    },
    emailInUse: {
      en: "This email is already in use",
      uk: "Ця електронна пошта вже використовується",
    },
  },
};

export default translations;
