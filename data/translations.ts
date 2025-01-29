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
      email: {
        en: "Email",
        uk: "Електронна пошта",
      },
      password: {
        en: "Password",
        uk: "Пароль",
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
        en: "Register",
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
        en: "Write to us at support@bookstore.com (beta version, will change in the future)",
        uk: "Напишіть нам на пошту: support@bookstore.com (бета-версія, зміниться в майбутньому)",
      },
    },
  },

  placeholders: {
    email: {
      en: "Enter your email",
      uk: "Введіть електронну пошту",
    },
    password: {
      en: "Enter your password",
      uk: "Введіть пароль",
    },
  },

  validators: {
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
  },
};

export default translations;
