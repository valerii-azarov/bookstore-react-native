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

    fields: {
      title: {
        label: {
          en: "Title",
          uk: "Назва",
        },
        placeholder: {
          en: "Enter title",
          uk: "Введіть назву",
        },
        hintLabel: {
          en: "Enter the title of the book",
          uk: "Введіть назву книги",
        },
        hintPlaceholder: {
          en: "e.g. Murder on the Orient Express",
          uk: "Наприклад, Вбивство в «Східному експресі»",
          
        },
      },
      pageCount: {
        label: {
          en: "Page count",
          uk: "Кількість сторінок",
        },
        placeholder: {
          en: "Enter page count",
          uk: "Введіть кількість сторінок",
        },
        hintLabel: {
          en: "Enter the number of pages in the book",
          uk: "Введіть кількість сторінок",
        },
        hintPlaceholder: {
          en: "e.g. 288",
          uk: "Наприклад, 288",
        },
      },
      publisher: {
        label: {
          en: "Publisher",
          uk: "Видавництво",
        },
        placeholder: {
          en: "Enter publisher",
          uk: "Введіть видавництво",
        },
        hintLabel: {
          en: "Enter the publisher of the book",
          uk: "Введіть видавництво книги",
        },
        hintPlaceholder: {
          en: "e.g. Canon of Hercule Poirot",
          uk: "Наприклад, Канон Еркюля Пуаро",
        },
      },
      publicationYear: {
        label: {
          en: "Publication year",
          uk: "Рік видання",
        },
        placeholder: {
          en: "Enter publication year",
          uk: "Введіть рік видання",
        },
        hintLabel: {
          en: "Enter the year the book was published",
          uk: "Введіть рік публікації книги",
        },
        hintPlaceholder: {
          en: "e.g. 1938",
          uk: "Наприклад, 1938",
        },
      },
      size: {
        label: {
          en: "Size",
          uk: "Розмір",
        },
        placeholder: {
          en: "Enter size",
          uk: "Введіть розмір",
        },
        hintLabel: {
          en: "Enter the dimensions of the book",
          uk: "Введіть розміри книги",
        },
        hintPlaceholder: {
          en: "e.g. 170 x 123 x 25 mm",
          uk: "Наприклад, 170 x 123 x 25 мм",
        },
      },
      weight: {
        label: {
          en: "Weight",
          uk: "Вага",
        },
        placeholder: {
          en: "Enter weight",
          uk: "Введіть вагу",
        },
        hintLabel: {
          en: "Enter the weight of the book",
          uk: "Введіть вагу книги",
        },
        hintPlaceholder: {
          en: "e.g. 210 grams",
          uk: "Наприклад, 210 грам",
        },
      },
      isbn: {
        label: {
          en: "ISBN",
          uk: "ISBN",
        },
        placeholder: {
          en: "Enter ISBN",
          uk: "Введіть ISBN",
        },
        hintLabel: {
          en: "Enter the book's ISBN number",
          uk: "Введіть ISBN книги",
        },
        hintPlaceholder: {
          en: "e.g. 978-617-12-9854-5",
          uk: "Наприклад, 978-617-12-9854-5",
        },
      },
      sku: {
        label: {
          en: "Article",
          uk: "Артикул",
        },
        placeholder: {
          en: "Enter article",
          uk: "Введіть артикул",
        },
        hintLabel: {
          en: "Enter the article of the book",
          uk: "Введіть артикул книги",
        },
        hintPlaceholder: {
          en: "e.g. 825751754618",
          uk: "Наприклад, 825751754618",
        },
      },
      quantity: {
        label: {
          en: "Quantity",
          uk: "Кількість",
        },
        placeholder: {
          en: "Enter quantity",
          uk: "Введіть кількість",
        },
        hintLabel: {
          en: "Enter quantity of books",
          uk: "Введіть кількість книг",
        },
        hintPlaceholder: {
          en: "e.g. 10",
          uk: "Наприклад, 10",
        },
      },
    },

    textareaFields: {
      description: {
        label: {
          en: "Description",
          uk: "Опис",
        },
        placeholder: {
          en: "Enter description",
          uk: "Введіть опис",
        },
        hintLabel: {
          en: "Provide a brief description of the book",
          uk: "Напишіть короткий опис книги",
        },
        hintPlaceholder: {
          en: "e.g. A detective novel involving the famous detective Hercule Poirot...",
          uk: "Наприклад, Детективний роман про знаменитого детектива Еркюля Пуаро...",
        },
      },
    },

    tagsFields: {
      authors: {
        label: {
          en: "Authors",
          uk: "Автори",
        },
        placeholder: {
          en: "Enter authors (separated by commas)",
          uk: "Введіть авторів (розділяючи комами)",
        },
        hintLabel: {
          en: "Enter authors separated by commas",
          uk: "Введіть авторів, розділяючи комами",
        },
        hintPlaceholder: {
          en: "e.g. Agatha Christie",
          uk: "Наприклад, Агата Крісті",
        },
      },
    }, 
    
    checkboxFields: {
      illustrations: {
        label: {
          en: "Does the book contain illustrations?",
          uk: "Чи містить книга ілюстрації?",
        },
        text: {
          en: "Contains Illustrations",
          uk: "Містить ілюстрації",
        },
      },
    },
    
    selectFields: {
      genres: {
        label: {
          en: "Genres",
          uk: "Жанри",
        },
        hintLabel: {
          en: "Select the genres that best describe the book",
          uk: "Виберіть жанри, які найкраще описують книгу",
        },
        option: {
          en: "Select genres",
          uk: "Виберіть жанри",
        },
      },
      language: {
        label: {
          en: "Language",
          uk: "Мова",
        },
        hintLabel: {
          en: "Select the language of the book",
          uk: "Виберіть мову книги",
        },
        option: {
          en: "Select language",
          uk: "Виберіть мову",
        },
      },
      coverType: {
        label: {
          en: "Cover type",
          uk: "Тип обкладинки",
        },
        hintLabel: {
          en: "Select the type of cover",
          uk: "Виберіть тип обкладинки",
        },
        option: {
          en: "Select cover type",
          uk: "Виберіть тип обкладинки",
        },
      },
      bookType: {
        label: {
          en: "Book type",
          uk: "Тип книги",
        },
        hintLabel: {
          en: "Select the book type",
          uk: "Виберіть тип книги",
        },
        option: {
          en: "Select book type",
          uk: "Виберіть тип книги",
        },
      },
      paperType: {
        label: {
          en: "Paper Type",
          uk: "Тип паперу",
        },
        hintLabel: {
          en: "Select the paper type",
          uk: "Виберіть тип паперу",
        },
        option: {
          en: "Select paper type",
          uk: "Виберіть тип паперу",
        },
      },
      static: {
        search: {
          en: "Search...",
          uk: "Пошук...",
        },
      },
    },

    pricing: {
      labels: {
        price: {
          en: "Price",
          uk: "Ціна",
        },
        originalPrice: {
          en: "Original price",
          uk: "Початкова ціна",
        },
        discount: {
          en: "Discount (%)",
          uk: "Знижка (%)",
        },
      },
      placeholders: {
        price: {
          en: "Enter price",
          uk: "Введіть ціну",
        },
        originalPrice: {
          en: "Enter original price",
          uk: "Введіть початкову ціну",
        },
        discount: {
          en: "Enter percents",
          uk: "Введіть відсотки",
        },
      },
      checkbox: {
        text: {
          en: "Manual Mode (disable calculator)",
          uk: "Ручний режим (вимкнути калькулятор)",
        },
      },
      static: {
        calculated: {
          en: "Calculated automatically",
          uk: "Розраховується автоматично",
        },
      },
    },

    images: {
      coverImage: {
        label: {
          en: "Cover Image",
          uk: "Обкладинка",
        },
        tapToSelect: {
          en: "Tap to select cover image",
          uk: "Натисніть, щоб вибрати обкладинку",
        },
      },
      additionalImages: {
        label: {
          en: "Additional Images",
          uk: "Додаткові зображення",
        },
        tapToAdd: {
          en: "Tap to add image",
          uk: "Натисніть, щоб додати зображення",
        },
      },
      messages: {
        denied: {
          text: {
            en: "Permission denied",
            uk: "Дозвіл відхилено",
          },
          subText: {
            en: "We need camera roll permissions to select images.",
            uk: "Нам потрібні дозволи на доступ до галереї для вибору зображень.",
          },
        },
      },
    }
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
        delete: {
          text: {
            en: "Delete book",
            uk: "Видалити книгу",
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
      titles: {
        step1: {
          en: "Book Title and Authors",
          uk: "Назва книги та автори",
        },
        step2: {
          en: "Genres",
          uk: "Жанри",
        },
        step3: {
          en: "Description",
          uk: "Опис",
        },
        step4: {
          en: "Page Count",
          uk: "Кількість сторінок",
        },
        step5: {
          en: "Illustrations",
          uk: "Ілюстрації",
        },
        step6: {
          en: "Language",
          uk: "Мова",
        },
        step7: {
          en: "Images",
          uk: "Зображення",
        },
        step8: {
          en: "Background Color",
          uk: "Колір фону",
        },
        step9: {
          en: "Publisher and Year",
          uk: "Видавець і рік",
        },
        step10: {
          en: "ISBN",
          uk: "ISBN",
        },
        step11: {
          en: "Book Format",
          uk: "Формат книги",
        },
        step12: {
          en: "Size and Weight",
          uk: "Розмір і вага",
        },
        step13: {
          en: "Pricing",
          uk: "Ціноутворення",
        },
        step14: {
          en: "Quantity",
          uk: "Кількість",
        },
        step15: {
          en: "Article",
          uk: "Артикул",
        },
      },
      messages: {
        success: {
          text: {
            en: "Book has been added",
            uk: "Книгу додано",
          },
          subText: {
            en: "Successfully added to the book list",
            uk: "Успішно додано до списку книг",
          },
        },
        error: {
          text: {
            en: "Error",
            uk: "Помилка",
          },
          subText: {
            en: "Please try again later",
            uk: "Будь ласка, спробуйте ще раз пізніше",
          },
        },
      },
      buttons: {
        back: {
          text: {
            en: "Back",
            uk: "Назад",
          },
        },
        continue: {
          text: {
            en: "Continue",
            uk: "Продовжити",
          },
        },
        create: {
          text: {
            en: "Create",
            uk: "Створити",
          },
        },
        complete: {
          text: {
            en: "Complete",
            uk: "Завершити",
          },
        },
        exit: {
          text: {
            en: "Return",
            uk: "Повернутись",
          },
        },
      },
    },

    editBook: {
      header: {
        images: {
          en: "Change images",
          uk: "Зміна зображень",
        },
        backgroundColor: {
          en: "Change background color",
          uk: "Зміна кольору фону",
        },
        title: {
          en: "Change title",
          uk: "Зміна назви",
        },
        authors: {
          en: "Change authors",
          uk: "Зміна авторів",
        },
        pricing: {
          en: "Change price",
          uk: "Зміна ціни",
        },
        genres: {
          en: "Change genres",
          uk: "Зміна жанрів",
        },
        language: {
          en: "Change language",
          uk: "Зміна мови",
        },
        publisher: {
          en: "Change publisher",
          uk: "Зміна видавця",
        },
        publicationYear: {
          en: "Change publication year",
          uk: "Зміна року публікації",
        },
        pageCount: {
          en: "Change page count",
          uk: "Зміна кількості сторінок",
        },
        illustrations: {
          en: "Change illustrations",
          uk: "Зміна ілюстрацій",
        },
        coverType: {
          en: "Change cover type",
          uk: "Зміна типу обкладинки",
        },
        bookType: {
          en: "Change book type",
          uk: "Зміна типу книги",
        },
        paperType: {
          en: "Change paper type",
          uk: "Зміна типу паперу",
        },
        size: {
          en: "Change size",
          uk: "Зміна розміру",
        },
        weight: {
          en: "Change weight",
          uk: "Зміна ваги",
        },
        isbn: {
          en: "Change ISBN",
          uk: "Зміна ISBN",
        },
        sku: {
          en: "Change article",
          uk: "Зміна артикулу",
        },
        quantity: {
          en: "Change quantity",
          uk: "Зміна кількості",
        },
        description: {
          en: "Change description",
          uk: "Зміна опису",
        },
      },
      buttons: {
        save: {
          text: {
            en: "Save",
            uk: "Зберегти",
          },
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
    },
    confirmDeleteBook: {
      title: {
        en: "Delete Book",
        uk: "Видалити книгу",
      },
      message: {
        en: "Are you sure you want to delete this book? This action cannot be undone.",
        uk: "Ви впевнені, що хочете видалити цю книгу? Цю дію неможливо скасувати.",
      },
      confirm: {
        en: "Delete",
        uk: "Видалити",
      },
      success: {
        title: {
          en: "Success",
          uk: "Успіх",
        },
        message: {
          en: "The book has been successfully deleted.",
          uk: "Книгу успішно видалено.",
        },
      },
      error: {
        message: {
          en: "Failed to delete the book. Please try again.",
          uk: "Не вдалося видалити книгу. Спробуйте ще раз.",
        },
      },
    },
    static: {
      cancel: {
        en: "Cancel",
        uk: "Скасувати",
      },
      confirm: {
        en: "Confirm",
        uk: "Підтвердити",
      },
      error: {
        title: {
          en: "Error",
          uk: "Помилка",
        },
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
      invalidUrl: {
        en: "Invalid image URL or unable to extract public_id",
        uk: "Невірний URL зображення або неможливо отримати public_id"
      },
      deleteFailed: {
        en: "Failed to delete image from Cloudinary",
        uk: "Не вдалося видалити зображення з Cloudinary"
      }
    },
    books: {
      uploadFailed: {
        en: "Failed to upload image",
        uk: "Не вдалося завантажити зображення",
      },
      uploadAdditionalFailed: {
        en: "Failed to upload additional image",
        uk: "Не вдалося завантажити додаткове зображення"
      },
      createdBookNotFound: {
        en: "Book not found after creation",
        uk: "Книгу не знайдено після створення",
      },
      bookNotFound: {
        en: "Book not found",
        uk: "Книгу не знайдено"
      },
      bookNotFoundAfterUpdate: {
        en: "Book not found after update",
        uk: "Книга не знайдена після оновлення"
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
