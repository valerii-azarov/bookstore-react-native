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
    },

    favoriteBookItem: {
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
      showAll: {
        text: {
          en: "Show all",
          uk: "Показати всі",
        },
      },            
      messages: {
        empty: {
          text: {
            en: "Oops, nothing here!",
            uk: "Ой, тут порожньо!",
          },
          subText: {
            en: "Looks like we don’t have anything to show yet.",
            uk: "Здається, нам поки що нічого показати.",
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

    categoryBooks: {            
      messages: {       
        empty: {
          text: {
            en: "Nothing here yet!",
            uk: "Тут поки порожньо!",
          },
          subText: {
            en: "This category is empty. Explore other categories for more books!",
            uk: "Ця категорія порожня. Перегляньте інші категорії, щоб знайти книги!",
          },
        },
        error: {
          text: {
            en: "An error occurred",
            uk: "Виникла помилка",
          },
          subText: {
            en: "Something went wrong. Please try again",
            uk: "Щось пішло не так. Спробуйте ще раз",
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

    // orders: { },

    orderHistory: {
      header: {
        text: {
          en: "Order History",
          uk: "Історія замовлень",
        },
      },            
      messages: {        
        empty: {
          text: {
            en: "No orders available",
            uk: "Немає замовлень",
          },
          subText: {
            en: "You haven't placed any orders yet.",
            uk: "Ви ще не зробили жодного замовлення.",
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

    orderDetails: {
      header: {
        text: {
          en: "Order Details",
          uk: "Деталі замовлення",
        },
      },
      titles: {
        orderNumber: {
          en: "Order ID",
          uk: "ID замовлення",
        },
        orderStatus: {
          en: "Order status",
          uk: "Статус замовлення",
        },
        bookList: {
          en: "Book list",
          uk: "Перелік книг",
        },
        orderCost: {
          en: "Order cost",
          uk: "Вартість замовлення",
        },
        payment: {
          en: "Order payment",
          uk: "Оплата замовлення",
        },
        contactDetails: {
          en: "Contact details",
          uk: "Контактні дані",
        },
        orderDetails: {
          en: "Order details",
          uk: "Деталі замовлення",
        },
        receipt: {
          en: "Receipt",
          uk: "Квитанція",
        },
      },
      labels: {
        subtotal: {
          text: {
            en: "Subtotal",
            uk: "Підсумок",
          },
        },
        discount: {
          text: {
            en: "Discount",
            uk: "Знижка",
          },
        },
        total: {
          text: {
            en: "Total",
            uk: "Всього",
          },
        },
        paymentMethod: {
          text: {
            en: "Payment method",
            uk: "Спосіб оплати",
          },
        },
        paymentStatus: {
          text: {
            en: "Payment status",
            uk: "Статус оплати",
          },
        },
        deliveryAddress: {
          text: {
            en: "Delivery address",
            uk: "Адреса доставки",
          },
        },
        fullName: {
          text: {
            en: "Full Name",
            uk: "ПІБ",
          },
        },
        phoneNumber: {
          text: {
            en: "Phone number",
            uk: "Номер телефону",
          },
        },
        createdAt: {
          text: {
            en: "Creation date",
            uk: "Дата створення",
          },
        },
        updatedAt: {
          text: {
            en: "Update date",
            uk: "Дата оновлення",
          },
        },
      },
      buttons: {
        viewStatus: {
          text: {
            en: "View status",
            uk: "Переглянути статус",
          },
        },
        viewReceipt: {
          text: {
            en: "View receipt",
            uk: "Переглянути квитанцію",
          },
        },
      },
      messages: {
        error: {
          text: {
            en: "An error occurred",
            uk: "Виникла помилка",
          },
          subText: {
            en: "Something went wrong",
            uk: "Щось пішло не так",
          },
        },
      },
      paymentMethods: {
        cod: {
          text: {
            en: "Cash on Delivery",
            uk: "Накладений платіж",
          },
        },
        card: {
          text: {
            en: "Bank Card",
            uk: "Банківською карткою",
          },
        },
      },
      paymentStatuses: {
        paid: {
          text: {
            en: "Paid",
            uk: "Оплачено",
          },
        },
        unpaid: {
          text: {
            en: "Unpaid",
            uk: "Не оплачено",
          },
        },
      },
    },

    favorites: {            
      header: {
        text: {
          en: "Favorites",
          uk: "Обране",
        },
      },
      messages: {       
        empty: {
          text: {
            en: "No favorites available",
            uk: "Немає обраних книг",
          },
        },
        error: {
          text: {
            en: "An error occurred",
            uk: "Виникла помилка",
          },
          subText: {
            en: "Something went wrong",
            uk: "Щось пішло не так",
          },
        },
      },     
    },

    viewingHistory: {            
      header: {
        text: {
          en: "Viewing History",
          uk: "Переглянуті книги",
        },
      },
      messages: {       
        empty: {
          text: {
            en: "No viewing history available",
            uk: "Жодної переглянутої книги",
          },
        },
        error: {
          text: {
            en: "An error occurred",
            uk: "Виникла помилка",
          },
          subText: {
            en: "Something went wrong",
            uk: "Щось пішло не так",
          },
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

    cart: {            
      header: {
        text: {
          en: "Cart",
          uk: "Кошик",
        },
      },
      titles: {
        order: {
          en: "Your order",
          uk: "Ваше замовлення",
        },
      },
      labels: {
        subtotal: {
          text: {
            en: "Subtotal",
            uk: "Підсумок",
          },
        },
        discount: {
          text: {
            en: "Discount",
            uk: "Знижка",
          },
        },
        total: {
          text: {
            en: "Total",
            uk: "Загалом",
          },
        },
      },
      messages: {       
        empty: {
          text: {
            en: "Your cart is empty",
            uk: "Ваш кошик порожній",
          },
        },
      },
      buttons: {
        checkout: {
          text: {
            en: "Checkout",
            uk: "Оформити замовлення",
          },
        },
      },     
    },

    checkout: {
      header: {
        text: {
          en: "Checkout",
          uk: "Оформлення",
        },
      },
      titles: {
        step1: {
          en: "Delivery",
          uk: "Доставка",
        },
        step2: {
          en: "Contact Information",
          uk: "Контактні дані",
        },
        step3: {
          en: "Payment Method",
          uk: "Спосіб оплати",
        },
        step4: {
          en: "Confirmation",
          uk: "Підтвердження",
        },
        step5: {
          en: "Payment",
          uk: "Оплата",
        },
      },
      labels: {
        city: {
          en: "Select location",
          uk: "Оберіть пункт",
        },
        warehouse: {
          en: "Select branch",
          uk: "Оберіть відділення",
        },
        lastName: {
          en: "Last Name",
          uk: "Прізвище",
        },
        firstName: {
          en: "First Name",
          uk: "Ім'я",
        },
        middleName: {
          en: "Middle Name (optional)",
          uk: "По батькові (необов’язково)",
        },
        phoneNumber: {
          en: "Phone Number",
          uk: "Номер телефону",
        },
        totalAmount: {
          en: "Total amount to pay:",
          uk: "Загальна сума до сплати:",
        },
        selectPaymentMethod: {
          en: "Select payment method",
          uk: "Оберіть спосіб оплати",
        },
        deliveryAddress: {
          en: "Delivery address:",
          uk: "Адреса доставки:",
        },
        recipient: {
          en: "Recipient:",
          uk: "Отримувач:",
        },
        paymentMethodLabel: {
          en: "Payment method:",
          uk: "Спосіб оплати:",
        },
        checkData: {
          en: "Please check your details",
          uk: "Будь ласка, перевірте ваші дані",
        },
      },
      placeholders: {
        citySearch: {
          en: "Search location...",
          uk: "Пошук пункту...",
        },
        warehouseSearch: {
          en: "Search branch...",
          uk: "Пошук відділення...",
        },
        lastName: {
          en: "Enter last name",
          uk: "Введіть прізвище",
        },
        firstName: {
          en: "Enter first name",
          uk: "Введіть ім'я",
        },
        middleName: {
          en: "Enter middle name",
          uk: "Введіть по батькові",
        },
      },
      messages: {
        deliveryInfo: {
          en: "Select a city and Nova Post branch so we can deliver your order to a convenient location for you.",
          uk: "Виберіть місто та відділення Нової Пошти, щоб ми доставили замовлення саме туди, де вам зручно.",
        },
        paymentNotice: {
          title: {
            en: "❗Please note",
            uk: "❗Зверніть увагу",
          },
          text: {
            en: "Payment by bank card is temporarily unavailable. You can pay for your order upon receipt at a Nova Post branch.",
            uk: "Оплата банківською карткою тимчасово недоступна. Можна оплатити замовлення при отриманні у відділенні Нова Пошта.",
          },
        },
        paymentSystem: {
          title: {
            en: "Payment system under development 🚀",
            uk: "Платіжна система в розробці 🚀",
          },
          text: {
            en: "Beta testing is currently underway. We are actively working on adding a payment system. A little patience—and everything will be ready! Thank you for your understanding!",
            uk: "Зараз триває бета-тестування. Ми активно працюємо над додаванням платіжної системи. Трішки терпіння — і все буде готово! Дякуємо за розуміння!",
          },
        },
        success: {
          title: {
            en: "Your order has been successfully placed",
            uk: "Ваше замовлення успішно оформлено",
          },
          text: {
            en: "Await a message with delivery details. Thank you for choosing us!",
            uk: "Очікуйте на повідомлення з деталями доставки. Дякуємо, що обрали нас!",
          },
        },
        error: {
          title: {
            en: "Error ❌",
            uk: "Помилка ❌",
          },
          text: {
            en: "Please try again later",
            uk: "Будь ласка, спробуйте ще раз пізніше",
          },
        },
        loadingCities: {
          en: "Loading locations...",
          uk: "Завантаження пунктів...",
        },
        emptyCities: {
          en: "Location not found",
          uk: "Пункт не знайдено",
        },
        errorCities: {
          en: "Error loading locations",
          uk: "Помилка при завантаженні пунктів",
        },
        loadingWarehouses: {
          en: "Loading branches...",
          uk: "Завантаження відділень...",
        },
        emptyWarehouses: {
          en: "Branch not found",
          uk: "Відділення не знайдено",
        },
        errorWarehouses: {
          en: "Error loading branches",
          uk: "Помилка при завантаженні відділень",
        },
        noCityOrWarehouse: {
          en: "City and branch not specified",
          uk: "Не вказано місто та відділення",
        },
        noName: {
          en: "Last name and first name not specified",
          uk: "Не вказано прізвище та ім'я",
        },
        noPhone: {
          en: "Phone number not specified",
          uk: "Не вказано номер телефону",
        },
        noPaymentMethod: {
          en: "Payment method not selected",
          uk: "Не обрано спосіб оплати",
        },
      },
      checkboxes: {
        cash: {
          en: "Cash",
          uk: "Готівкою",
        },
        cod: {
          en: "Cash on Delivery",
          uk: "Накладений платіж",
        },
        card: {
          en: "Bank Card",
          uk: "Банківською карткою",
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
        confirm: {
          text: {
            en: "Confirm",
            uk: "Підтвердити",
          },
        },
        complete: {
          text: {
            en: "Complete",
            uk: "Завершити",
          },
        },
        return: {
          text: {
            en: "Return",
            uk: "Повернутись",
          },
        },
      },
    },

    orderStatus: {
      header: {
        en: "Order status",
        uk: "Статус замовлення",
      },
    },

    orderReceipt: {
      header: {
        en: "Your receipt",
        uk: "Ваша квитанція",
      },
      messages: {
        languageNotice: {
          title: {
            en: "❗Please note",
            uk: "❗Зверніть увагу"
          },
          text: {
            en: "In accordance with the Law of Ukraine \"On protecting the functioning of the Ukrainian language as the state language\", the receipt is issued in Ukrainian.",
            uk: "Відповідно до Закону України \"Про забезпечення функціонування української мови як державної\", квитанція видається українською мовою.",
          }
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
    confirmDeleteCartBook: {
      title: {
        en: "Remove Book",
        uk: "Видалити книгу",
      },
      message: {
        en: "Do you want to remove this book from your cart?",
        uk: "Ви хочете видалити цю книгу з кошика?",
      },
      confirm: {
        en: "Remove",
        uk: "Видалити",
      },
      cancel: {
        en: "Cancel",
        uk: "Скасувати",
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

  successMessages: {
    favorites: {
      bookAddedToFavorites: { 
        en: "Book added to favorites",
        uk: "Книгу додано до обраного"
      },
      bookRemovedFromFavorites: {
        en: "Book removed from favorites",
        uk: "Книгу видалено з обраного",
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
    users: {
      userNotFound: {
        en: "User not found",
        uk: "Користувача не знайдено",
      },
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
    orders: {
      createdOrderNotFound: {
        en: "Order not found after creation",
        uk: "Замовлення не знайдено після створення",
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

  date: {
    today: {
      en: "Today",
      uk: "Сьогодні",
    },
    yesterday: {
      en: "Yesterday",
      uk: "Вчора",
    },
    dayBeforeYesterday: {
      en: "The day before yesterday",
      uk: "Позавчора",
    },
  },

  orderStatuses: {
    titles: {
      pending: {
        en: "Pending",
        uk: "Очікується",
      },
      processing: {
        en: "In process",
        uk: "Обробляється",
      },
      shipped: {
        en: "Shipped",
        uk: "Відправлено",
      },
      delivered: {
        en: "Delivered",
        uk: "Доставлено",
      },
      received: {
        en: "Received",
        uk: "Отримано",
      },
    },
    subtitles: {
      pending: {
        en: "We’ve received your order",
        uk: "Ми отримали ваше замовлення",
      },
      processing: {
        en: "Your order is being processed",
        uk: "Ваше замовлення обробляється",
      },
      shipped: {
        en: "Your order has been shipped",
        uk: "Ваше замовлення відправлено",
      },
      delivered: {
        en: "Your order has been delivered",
        uk: "Ваше замовлення доставлено",
      },
      received: {
        en: "Your order receipt has been confirmed",
        uk: "Отримання замовлення підтверджено",
      },
    },
  },  
};

export default translations;
