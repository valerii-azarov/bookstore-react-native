export type TranslationValue = string | { [key: string]: string };

export type Translations = {
  [key: string]: TranslationValue | Translations;
};

const translations: Translations = {
  components: {
    bookItem: {
      available: {
        en: "Quantity",
        uk: "Кількість",
      },
      unavailable: {
        en: "Not Available",
        uk: "Відсутні",
      },
      article: {
        en: "Article",
        uk: "Артикул",
      },
      details: {
        en: "Details",
        uk: "Деталі",
      },
    },
  },  
  
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

    books: {
      header: {
        text: {
          en: "Books",
          uk: "Книги",
        },
      },
      search: {
        placeholder: {
          en: "Search by title or article...",
          uk: "Пошук за назвою чи артикулом...",
        },
      },      
      messages: {
        empty: {
          text: {
            en: "No books found",
            uk: "Книги не знайдено",
          },
          subText: {
            en: "Try refining your search",
            uk: "Спробуйте змінити запит",
          },
        },
        error: {
          text: {
            en: "An error occurred",
            uk: "Виникла помилка",
          },
          subText: {
            en: "Something went wrong. Please try again.",
            uk: "Щось пішло не так. Спробуйте ще раз.",
          },
        },
      },
      buttons: {
        error: {
          text: {
            en: "Retry",
            uk: "Повторіть спробу",
          },
        },
      },     
    },

    bookDetails: {
      titles: {
        editing: {
          en: "Editing",
          uk: "Редагування",
        },
        genres: {
          en: "Genres",
          uk: "Жанри",
        },
        parameters: {
          en: "Parameters",
          uk: "Параметри",
        },
        about: {
          en: "About the Book",
          uk: "Про книжку",
        },
      },
      labels: {
        pageCount: {
          en: "Page Count",
          uk: "Кількість сторінок",
        },
        publisher: {
          en: "Publisher",
          uk: "Видавництво",
        },
        coverType: {
          en: "Cover Type",
          uk: "Обкладинка",
        },
        publicationYear: {
          en: "Publication Year",
          uk: "Рік видання",
        },
        language: {
          en: "Language",
          uk: "Мова",
        },
        size: {
          en: "Size",
          uk: "Розмір",
        },
        weight: {
          en: "Weight",
          uk: "Вага",
        },
        illustrations: {
          en: "Illustrations",
          uk: "Ілюстрації",
        },
        bookType: {
          en: "Book Type",
          uk: "Тип книжки",
        },
        paperType: {
          en: "Paper Type",
          uk: "Тип паперу",
        },
        isbn: {
          en: "ISBN",
          uk: "ISBN",
        },
        sku: {
          en: "SKU",
          uk: "Артикул",
        },
        quantity: {
          en: "Quantity",
          uk: "Кількість",
        },
        createdAt: {
          en: "Created At",
          uk: "Дата створення",
        },
        updatedAt: {
          en: "Updated At",
          uk: "Дата оновлення",
        },
        images: {
          en: "Images",
          uk: "Зображення",
        },
        backgroundColor: {
          en: "Background Color",
          uk: "Колір фону",
        },
        title: {
          en: "Title",
          uk: "Назва",
        },
        authors: {
          en: "Authors",
          uk: "Автори",
        },
      },
      values: {
        illustrations: {
          contains: {
            en: "Contains illustrations",
            uk: "Містить ілюстрації",
          },
          notContains: {
            en: "No illustrations",
            uk: "Без ілюстрацій",
          },
        },
      },
      messages: {
        empty: {
          text: {
            en: "Book not found",
            uk: "Книгу не знайдено",
          },
          subText: {
            en: "This book does not exist or has been removed.",
            uk: "Ця книга не існує або була видалена.",
          },
        },
        error: {
          text: {
            en: "Failed to load book",
            uk: "Не вдалося завантажити дані про книгу",
          },
          subText: {
            en: "Something went wrong. Please try again.",
            uk: "Щось пішло не так. Спробуйте ще раз.",
          },
        },
      },
      buttons: {
        buy: {
          text: {
            en: "Buy",
            uk: "Купити",
          },
        },
        expand: {
          text: {
            en: "Expand",
            uk: "Розгорнути",
          },
        },
        collapse: {
          text: {
            en: "Collapse",
            uk: "Згорнути",
          },
        },
        edit: {
          text: {
            en: "Edit",
            uk: "Змінити",
          },
        },
        adminEdit: {
          text: {
            en: "Edit",
            uk: "Редагувати",
          },
        },
        back: {
          text: {
            en: "Back",
            uk: "Повернутись",
          },
        },        
        error: {
          text: {
            en: "Retry",
            uk: "Повторити",
          },
        },
      },
      static: {
        outOfStock: {
          en: "Out of stock",
          uk: "Немає в наявності",
        },
      },
    },
  },

  modals: {
    createBook: {
      header: {
        en: "Create Book",
        uk: "Створення книги",
      },
      buttonBack: {
        en: "Back",
        uk: "Назад",
      },
      buttonContinue: {
        en: "Continue",
        uk: "Продовжити",
      },
      buttonCreate: {
        en: "Create",
        uk: "Створити",
      },
      buttonComplete: {
        en: "Complete",
        uk: "Завершити",
      },
      buttonExit: {
        en: "Go back",
        uk: "Вийти",
      },
      step1: {
        title: {
          en: "Title",
          uk: "Назва",
        },
        hint: {
          en: "Enter the title of the book",
          uk: "Введіть назву книги",
        },
        placeholder: {
          en: "e.g. Murder on the Orient Express",
          uk: "Наприклад, Вбивство в «Східному експресі»",
        },
      },
      step2: {
        title: {
          en: "Authors",
          uk: "Автори",
        },
        hint: {
          en: "Enter authors separated by commas",
          uk: "Введіть авторів, розділяючи комами",
        },
        placeholder: {
          en: "e.g. Agatha Christie",
          uk: "Наприклад, Агата Крісті",
        },
      },     
      step3: {
        title: {
          en: "Description",
          uk: "Опис",
        },
        hint: {
          en: "Provide a brief description of the book",
          uk: "Напишіть короткий опис книги",
        },
        placeholder: {
          en: "e.g. A detective novel involving the famous detective Hercule Poirot...",
          uk: "Наприклад, Детективний роман про знаменитого детектива Еркюля Пуаро...",
        },
      },    
      step4: {
        title: {
          en: "Genres",
          uk: "Жанри",
        },
        hint: {
          en: "Select the genres that best describe the book",
          uk: "Виберіть жанри, які найкраще описують книгу",
        },
        select: {
          en: "Select genres",
          uk: "Виберіть жанри",
        },
        search: {
          en: "Search...",
          uk: "Пошук...",
        },
      },
      step5: {
        title: {
          en: "Language",
          uk: "Мова",
        },
        hint: {
          en: "Select the language of the book",
          uk: "Виберіть мову книги",
        },
        select: {
          en: "Select language",
          uk: "Виберіть мову",
        },
      },
      step6: {
        title: {
          en: "Publisher",
          uk: "Видавництво",
        },
        hint: {
          en: "Enter the publisher's name",
          uk: "Введіть назву видавництва",
        },
        placeholder: {
          en: "e.g. Collins Crime Club",
          uk: "Наприклад, Коллінс Крайм Клаб",
        },
      },
      step7: {
        title: {
          en: "Publication Year",
          uk: "Рік публікації",
        },
        hint: {
          en: "Enter the year the book was published",
          uk: "Введіть рік публікації книги",
        },
        placeholder: {
          en: "e.g. 1938",
          uk: "Наприклад, 1938",
        },
      },
      step8: {
        title: {
          en: "ISBN",
          uk: "ISBN",
        },
        hint: {
          en: "Enter the book's ISBN number",
          uk: "Введіть ISBN книги",
        },
        placeholder: {
          en: "e.g. 978-617-12-9854-5",
          uk: "Наприклад, 978-617-12-9854-5",
        },
      },
      step9: {
        title: {
          en: "Page Count",
          uk: "Кількість сторінок",
        },
        hint: {
          en: "Enter the number of pages in the book",
          uk: "Введіть кількість сторінок",
        },
        placeholder: {
          en: "e.g. 288",
          uk: "Наприклад, 288",
        },
      },
      step10: {
        title: {
          en: "Cover Type",
          uk: "Тип обкладинки",
        },
        hint: {
          en: "Select the type of cover",
          uk: "Виберіть тип обкладинки",
        },
        select: {
          en: "Select cover type",
          uk: "Виберіть тип обкладинки",
        },
      },
      step11: {
        title: {
          en: "Book Type",
          uk: "Тип книги",
        },
        hint: {
          en: "Select the book type",
          uk: "Виберіть тип книги",
        },
        select: {
          en: "Select book type",
          uk: "Виберіть тип книги",
        },
      },
      step12: {
        title: {
          en: "Paper Type",
          uk: "Тип паперу",
        },
        hint: {
          en: "Select the paper type",
          uk: "Виберіть тип паперу",
        },
        select: {
          en: "Select paper type",
          uk: "Виберіть тип паперу",
        },
      },
      step13: {
        title: {
          en: "Size",
          uk: "Розмір",
        },
        hint: {
          en: "Enter the dimensions of the book",
          uk: "Введіть розміри книги",
        },
        placeholder: {
          en: "e.g. 170 x 123 x 25 mm",
          uk: "Наприклад, 170 x 123 x 25 мм",
        },
      },
      step14: {
        title: {
          en: "Weight",
          uk: "Вага",
        },
        hint: {
          en: "Enter the weight of the book",
          uk: "Введіть вагу книги",
        },
        placeholder: {
          en: "e.g. 210 grams",
          uk: "Наприклад, 210 грам",
        },
      },
      step15: {
        title: {
          en: "Illustrations",
          uk: "Ілюстрації",
        },
        hint: {
          en: "Does the book contain illustrations?",
          uk: "Чи містить книга ілюстрації?",
        },
        label: {
          en: "Contains Illustrations",
          uk: "Містить ілюстрації",
        },
      },
      step16: {
        title: {
          en: "Cover Image",
          uk: "Зображення обкладинки",
        },
        hint: {
          en: "Upload the book cover image",
          uk: "Завантажте зображення обкладинки книги",
        },
        placeholder: {
          en: "Upload Image",
          uk: "Завантажте зображення",
        },
      },
      step17: {
        title: {
          en: "Price",
          uk: "Ціна",
        },
        hint: {
          en: "Enter the price of the book",
          uk: "Введіть ціну книги",
        },
        placeholder: {
          en: "e.g. 249.99",
          uk: "Наприклад, 249.99",
        },
      },
      step18: {
        title: {
          en: "Article",
          uk: "Артикул",
        },
        hint: {
          en: "Enter the article of the book",
          uk: "Введіть артикул книги",
        },
        placeholder: {
          en: "e.g. 825751754618",
          uk: "Наприклад, 825751754618",
        },
      },  
      step19: {
        successTitle: {
          en: "Book has been added",
          uk: "Книгу додано",
        },
        successSubtitle: {
          en: "Successfully added to the book list",
          uk: "Успішно додано до списку книг",
        },
        errorTitle: {
          en: "Error",
          uk: "Помилка",
        },
        errorSubtitle: {
          en: "Please try again later",
          uk: "Будь ласка, спробуйте ще раз пізніше",
        },
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
    image: {
      invalidImageObject: {
        en: "Invalid image object",
        uk: "Невірний об'єкт зображення",
      },
      noSecureUrl: {
        en: "Secure URL not found in response",
        uk: "URL не знайдено у відповіді",
      },
    },
    books: {
      uploadFailed: {
        en: "Failed to upload image",
        uk: "Не вдалося завантажити зображення",
      },
    },
  },

  genres: {
    fantasy: {
      en: "Fantasy",
      uk: "Фентезі",
    },
    detective: {
      en: "Detective",
      uk: "Детектив",
    },
    novel: {
      en: "Novel",
      uk: "Роман",
    },
    science: {
      en: "Science",
      uk: "Наука",
    },
    history: {
      en: "History",
      uk: "Історія",
    },
    philosophy: {
      en: "Philosophy",
      uk: "Філософія",
    },
    horror: {
      en: "Horror",
      uk: "Жахи",
    },
    romance: {
      en: "Romance",
      uk: "Романтика",
    },
    thriller: {
      en: "Thriller",
      uk: "Трилер",
    },
    biography: {
      en: "Biography",
      uk: "Біографія",
    },
    poetry: {
      en: "Poetry",
      uk: "Поезія",
    },
    classic: {
      en: "Classic",
      uk: "Класика",
    },
    crime: {
      en: "Crime",
      uk: "Кримінальний",
    },
    drama: {
      en: "Drama",
      uk: "Драма",
    },
    nonFiction: {
      en: "Non-fiction",
      uk: "Документальна література",
    },
    cookbooks: {
      en: "Cookbooks",
      uk: "Кулінарні книги",
    },
    art: {
      en: "Art",
      uk: "Мистецтво",
    },
    childrens: {
      en: "Children's",
      uk: "Дитяча література",
    },
    sciFi: {
      en: "Sci-Fi",
      uk: "Наукова фантастика",
    },
    comic: {
      en: "Comic",
      uk: "Комікс",
    },
    others: {
      en: "and others",
      uk: "та інші",
    }
  },

  languages: {
    english: {
      en: "English",
      uk: "Англійська",
    },
    ukrainian: {
      en: "Ukrainian",
      uk: "Українська",
    },
    french: {
      en: "French",
      uk: "Французька",
    },
    german: {
      en: "German",
      uk: "Німецька",
    },
    spanish: {
      en: "Spanish",
      uk: "Іспанська",
    },
  },

  formats: {
    paper: {
      en: "Paper",
      uk: "Паперова",
    },
    audiobook: {
      en: "Audiobook",
      uk: "Аудіокнига",
    },
  },

  coverTypes: {
    soft: {
      en: "Softcover",
      uk: "М'яка обкладинка",
    },
    hard: {
      en: "Hardcover",
      uk: "Тверда обкладинка",
    },
  },

  bookTypes: {
    paper: {
      en: "Paper Book",
      uk: "Паперова книга",
    },
    digital: {
      en: "Digital Book",
      uk: "Цифрова книга",
    },
  },

  paperTypes: {
    offset: {
      en: "Offset",
      uk: "Офсетний",
    },
    coated: {
      en: "Coated",
      uk: "Крейдований",
    },
    newsprint: {
      en: "Newsprint",
      uk: "Газетний",
    },
  },

  illustrationTypes: {
    yes: {
      en: "Yes",
      uk: "Так",
    },
    no: {
      en: "No",
      uk: "Ні",
    },
  },
};

export default translations;
