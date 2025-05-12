export type TranslationValue = string | { [key: string]: string };

export type Translations = {
  [key: string]: TranslationValue | Translations;
};

const translations: Translations = {
  components: {
    image: {
      failedToLoad: {
        text: {
          en: "Image failed to load",
          uk: "Не вдалося завантажити зображення",
        },
      },
    },
    
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

    searchedBooksItem: {
      labels: {
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
      },
      actions: {
        edit: {
          en: "Edit",
          uk: "Змінити",
        },
        delete: {
          en: "Delete",
          uk: "Видалити",
        },
      }
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
      labels: {
        favorite: {
          en: "Favorite",
          uk: "Обране",
        },
      },
    },

    errorNetwork: {
      title: {
        en: "No Internet Connection",
        uk: "Відсутнє підключення до мережі",
      },
      subtitle: {
        en: "Check your network settings and try again",
        uk: "Перевірте налаштування мережі та спробуйте ще раз",
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
      title: {
        first: {
          en: "B",
          uk: "K",
        },
        remaining: {
          en: "ookstore",
          uk: "нигарня",
        },
      },
      subtitle: {
        en: "Books are available for order here",
        uk: "Тут книги доступні для замовлення",
      },
      buttons: {
        start: {
          en: "Get started",
          uk: "Почати",
        },
      },
    },

    signIn: {
      title: {
        first: {
          en: "B",
          uk: "K",
        },
        remaining: {
          en: "ookstore",
          uk: "нигарня",
        },
      },
      subtitle: {
        en: "Please sign in to your account",
        uk: "Будь ласка, увійдіть у ваш обліковий запис",
      },
      labels: {
        email: {
          en: "Email",
          uk: "Електронна пошта",
        },
        password: {
          en: "Password",
          uk: "Пароль",
        },
        register: {
          en: "Don't have an account?",
          uk: "Немає облікового запису?",
        },
        trouble: {
          en: "Having trouble signing in?",
          uk: "У вас виникли проблеми з входом?",
        },
      },
      links: {
        registerLink: {
          en: "Sign Up",
          uk: "Зареєструватися",
        },
        troubleLink: {
          en: "Contact us",
          uk: "Зв'яжіться з нами",
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
      buttons: {
        signIn: {
          en: "Sign In",
          uk: "Увійти",
        },
      },
      alerts: {
        trouble: {
          en: "This feature is still under development",
          uk: "Функція знаходиться в розробці",
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
      titles: {
        balance: {
          en: "My balance",
          uk: "Мій баланс",
        },
        settings: {
          en: "Settings",
          uk: "Налаштування",
        },
      },
      labels: {
        bonuses: {
          en: "Bonuses",
          uk: "Бонуси",
        },
        offers: {
          en: "Offers",
          uk: "Пропозиції",
        },
        profile: {
          en: "Profile",
          uk: "Профіль",
        },
        favorites: {
          en: "Favorites",
          uk: "Обрані книги",
        },
        viewingHistory: {
          en: "Viewing History",
          uk: "Переглянуті книги",
        },
        language: {
          en: "Language",
          uk: "Мова",
        },
        logout: {
          en: "Logout",
          uk: "Вийти",
        },
      },
      version: {
        text: {
          en: "Version",
          uk: "Версія додатку",
        },
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

    books: {
      headers: {
        titleUser: {
          en: "Books",
          uk: "Книги",
        },
        titleAdmin: {
          en: "List of books",
          uk: "Перелік книг",
        },      
      },
      placeholders: {
        titleAndSku: {
          text: {
            en: "Search by title or article",
            uk: "Пошук за назвою або артикулом",
          },
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
        showAll: {
          text: {
            en: "Show all",
            uk: "Показати всі",
          },
        },   
        error: {
          text: {
            en: "Retry",
            uk: "Повторіть спробу",
          },
        },
      },     
    },

    search: {            
      header: {
        text: {
          en: "Search",
          uk: "Пошук",
        },
      },
      placeholders: {
        title: {
          text: {
            en: "What to find?",
            uk: "Що знайти?",
          },
        },
      },
      messages: {
        startSearch: {
          text: {
            en: "Find your favorite book",
            uk: "Ми шукаємо твою улюблену книгу",
          },
          subText: {
            en: "Tap the search bar to find and buy",
            uk: "Натисни панель пошуку, щоб знайти та купити книгу",
          },
        },
      },
    },

    searchBooks: {            
      header: {
        text: {
          en: "Search",
          uk: "Пошук",
        },
      },
      placeholders: {
        title: {
          text: {
            en: "What to find?",
            uk: "Що знайти?",
          },
        },
        titleAndSku: {
          text: {
            en: "Search by title or article",
            uk: "Пошук за назвою або артикулом",
          },
        },
      },
      messages: {
        empty: {
          text: {
            en: "We looked everywhere but found nothing",
            uk: "Шукали скрізь, але нічого не знайшли",
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
            en: "Explore other categories for more books",
            uk: "Перегляньте інші категорії, щоб знайти книги",
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

    bookDetails: {
      header: {
        text: {
          en: "Book Details",
          uk: "Деталі книги",
        },
      },
      titles: {
        details: {
          en: "Details",
          uk: "Деталі",
        },
        characteristics: {
          en: "Characteristics",
          uk: "Характеристики",
        },
        description: {
          en: "Description",
          uk: "Опис",
        },
      },
      labels: {
        pageCount: {
          en: "Page count",
          uk: "Кількість сторінок",
        },
        publisher: {
          en: "Publisher",
          uk: "Видавництво",
        },
        coverType: {
          en: "Cover type",
          uk: "Обкладинка",
        },
        publicationYear: {
          en: "Publication year",
          uk: "Рік видання",
        },
        language: {
          en: "Language",
          uk: "Мова",
        },
        sku: {
          en: "Article",
          uk: "Артикул",
        },
        quantity: {
          en: "Quantity",
          uk: "Кількість",
        },
        createdAt: {
          en: "Creation date",
          uk: "Дата створення",
        },
        updatedAt: {
          en: "Update date",
          uk: "Дата оновлення",
        },       
      },
      messages: {
        error: {
          text: {
            en: "Failed to load book",
            uk: "Не вдалося завантажити дані про книгу",
          },
          subText: {
            en: "Something went wrong",
            uk: "Щось пішло не так",
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
        viewAllCharacteristics: {
          text: {
            en: "View all characteristics",
            uk: "Подивитись всі характеристики",
          },
        },
        viewFullDescription: {
          text: {
            en: "View full description",
            uk: "Подивитись весь опис",
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

    bookSettings: {
      header: {
        en: "Book Settings",
        uk: "Параметри книги",
      },
      fields: {
        id: {
          en: "ID",
          uk: "ID",
        },
        title: {
          en: "Title",
          uk: "Назва",
        },
        authors: {
          en: "Authors",
          uk: "Автори",
        },
        rates: {
          en: "Cost",
          uk: "Вартість",
        },
        images: {
          en: "Images",
          uk: "Зображення",
        },
        backgroundColor: {
          en: "Background color",
          uk: "Колір фону",
        },
        description: {
          en: "Description",
          uk: "Опис",
        },
        genres: {
          en: "Genres",
          uk: "Жанри",
        },
        language: {
          en: "Language",
          uk: "Мова",
        },
        publisher: {
          en: "Publisher",
          uk: "Видавництво",
        },
        publicationYear: {
          en: "Publication year",
          uk: "Рік видання",
        },
        isbn: {
          en: "ISBN",
          uk: "ISBN",
        },
        pageCount: {
          en: "Page count",
          uk: "Кількість сторінок",
        },
        coverType: {
          en: "Cover type",
          uk: "Обкладинка",
        },
        bookType: {
          en: "Book type",
          uk: "Тип книжки",
        },
        paperType: {
          en: "Paper type",
          uk: "Тип паперу",
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
        availableQuantity: {
          en: "Quantity",
          uk: "Кількість",
        },
        sku: {
          en: "Article",
          uk: "Артикул",
        },
        createdAt: {
          en: "Creation date",
          uk: "Дата створення",
        },
        updatedAt: {
          en: "Update date",
          uk: "Дата оновлення",
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
      buttons: {
        edit: {
          en: "Edit",
          uk: "Змінити",
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
          uk: "Обрані книги",
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
    signUp: {
      header: {
        text: {
          en: "Sign Up",
          uk: "Реєстрація",
        },
      },
      titles: {
        step1: {
          en: "Personal Details",
          uk: "Особисті дані"
        },
        step2: {
          en: "Account Credentials",
          uk: "Облікові дані"
        }
      },
      labels: {
        lastName: {
          en: "Last Name",
          uk: "Прізвище",
        },
        firstName: {
          en: "First Name",
          uk: "Ім'я",
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
        lastName: {
          en: "Enter last name",
          uk: "Введіть прізвище",
        },
        firstName: {
          en: "Enter first name",
          uk: "Введіть ім'я",
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
      messages: {
        success: {
          title: {
            en: "Welcome!",
            uk: "Вітаємо!",
          },
          text: {
            en: "Your account has been created! Proceed to the main page below.",
            uk: "Ваш обліковий запис створений! Перейдіть на головну сторінку нижче.",
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
        register: {
          text: {
            en: "Register",
            uk: "Зареєструватися",
          },
        },
        finish: {
          text: {
            en: "Finish",
            uk: "Перейти",
          },
        },
      },
    },

    createBook: {
      header: {
        text: {
          en: "Create Book",
          uk: "Створення книги",
        },
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
      labels: {
        title: {
          en: "Enter the title of the book",
          uk: "Введіть назву книги",
        },
        authors: {
          en: "Enter authors separated by commas",
          uk: "Введіть авторів, розділяючи комами",
        },
        genres: {
          en: "Select the genres that best describe the book",
          uk: "Виберіть жанри, які найкраще описують книгу",
        },
        description: {
          en: "Provide a brief description of the book",
          uk: "Напишіть короткий опис книги",
        },
        pageCount: {
          en: "Enter the number of pages in the book",
          uk: "Введіть кількість сторінок",
        },
        illustrations: {
          en: "Does the book contain illustrations?",
          uk: "Чи містить книга ілюстрації?",
        },
        language: {
          en: "Select the language of the book",
          uk: "Виберіть мову книги",
        },
        coverImage: {
          en: "Cover Image",
          uk: "Обкладинка",
        },
        additionalImages: {
          en: "Additional Images",
          uk: "Додаткові зображення",
        },
        backgroundColor: {
          en: "Select background color",
          uk: "Виберіть колір фону",
        },
        publisher: {
          en: "Enter the publisher of the book",
          uk: "Введіть видавництво книги",
        },
        publicationYear: {
          en: "Enter the year the book was published",
          uk: "Введіть рік публікації книги",
        },
        isbn: {
          en: "Enter the book's ISBN number",
          uk: "Введіть ISBN книги",
        },
        coverType: {
          en: "Select the type of cover",
          uk: "Виберіть тип обкладинки",
        },
        bookType: {
          en: "Select the book type",
          uk: "Виберіть тип книги",
        },
        paperType: {
          en: "Select the paper type",
          uk: "Виберіть тип паперу",
        },
        size: {
          en: "Enter the dimensions of the book",
          uk: "Введіть розміри книги",
        },
        weight: {
          en: "Enter the weight of the book",
          uk: "Введіть вагу книги",
        },
        originalPrice: {
          en: "Enter original price",
          uk: "Введіть початкову ціну",
        },
        discount: {
          en: "Enter percents",
          uk: "Введіть відсотки",
        },
        price: {
          en: "Enter price",
          uk: "Введіть ціну",
        },
        availableQuantity: {
          en: "Enter quantity of books",
          uk: "Введіть кількість книг",
        },
        sku: {
          en: "Enter the article of the book",
          uk: "Введіть артикул книги",
        },
      },
      placeholders: {
        title: {
          en: "e.g. Murder on the Orient Express",
          uk: "Наприклад, Вбивство в «Східному експресі»",
        },
        authors: {
          en: "e.g. Agatha Christie",
          uk: "Наприклад, Агата Крісті",
        },
        description: {
          en: "e.g. A detective novel involving the famous detective Hercule Poirot...",
          uk: "Наприклад, Детективний роман про знаменитого детектива Еркюля Пуаро...",
        },
        pageCount: {
          en: "e.g. 288",
          uk: "Наприклад, 288",
        },
        publisher: {
          en: "e.g. Canon of Hercule Poirot",
          uk: "Наприклад, Канон Еркюля Пуаро",
        },
        publicationYear: {
          en: "e.g. 1938",
          uk: "Наприклад, 1938",
        },
        isbn: {
          en: "e.g. 978-617-12-9854-5",
          uk: "Наприклад, 978-617-12-9854-5",
        },
        size: {
          en: "e.g. 170 x 123 x 25 mm",
          uk: "Наприклад, 170 x 123 x 25 мм",
        },
        weight: {
          en: "e.g. 210 grams",
          uk: "Наприклад, 210 грам",
        },
        originalPrice: {
          en: "e.g. 500.00",
          uk: "Наприклад, 500.00",
        },
        discount: {
          en: "e.g. 15",
          uk: "Наприклад, 15",
        },
        price: {
          en: "e.g. 425.00",
          uk: "Наприклад, 425.00",
        },
        availableQuantity: {
          en: "e.g. 25",
          uk: "Наприклад, 25",
        },
        sku: {
          en: "e.g. 825751754618",
          uk: "Наприклад, 825751754618",
        },
      },
      options: {
        genres: {
          en: "Select genres",
          uk: "Виберіть жанри",
        },
        language: {
          en: "Select language",
          uk: "Виберіть мову",
        },
        coverType: {
          en: "Select the type of cover",
          uk: "Виберіть тип обкладинки",
        },
        bookType: {
          en: "Select book type",
          uk: "Виберіть тип книги",
        },
        paperType: {
          en: "Select paper type",
          uk: "Виберіть тип паперу",
        },
      },
      checkboxes: {
        illustrations: {
          en: "Contains Illustrations",
          uk: "Містить ілюстрації", 
        },
        manual: {
          en: "Manual price entry",
          uk: "Ручне введення",
        },
      },
      prompts: {
        coverImage: {
          en: "Tap to select cover image",
          uk: "Натисніть, щоб вибрати обкладинку",
        },
        additionalImages: {
          en: "Tap to add image",
          uk: "Натисніть, щоб додати зображення",
        },
      },
      messages: {
        success: {
          title: {
            en: "Book has been added",
            uk: "Книгу додано",
          },
          text: {
            en: "Successfully added to the book list",
            uk: "Успішно додано до списку книг",
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
        denied: {
          text: {
            en: "Permission Denied",
            uk: "Дозвіл відхилено",
          },
          subText: {
            en: "We need camera roll permissions to select images",
            uk: "Нам потрібні дозволи на доступ до галереї для вибору зображень",
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
        title: {
          en: "Change title",
          uk: "Зміна назви",
        },
        authors: {
          en: "Change authors",
          uk: "Зміна авторів",
        },
        rates: {
          en: "Change price",
          uk: "Зміна ціни",
        },
        images: {
          en: "Change images",
          uk: "Зміна зображень",
        },
        backgroundColor: {
          en: "Change background color",
          uk: "Зміна кольору фону",
        },
        description: {
          en: "Change description",
          uk: "Зміна опису",
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
        isbn: {
          en: "Change ISBN",
          uk: "Зміна ISBN",
        },
        pageCount: {
          en: "Change page count",
          uk: "Зміна кількості сторінок",
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
        illustrations: {
          en: "Change illustrations",
          uk: "Зміна ілюстрацій",
        },
        availableQuantity: {
          en: "Change quantity",
          uk: "Зміна кількості",
        },
        sku: {
          en: "Change article",
          uk: "Зміна артикулу",
        },
      },
      labels: {
        title: {
          en: "New title",
          uk: "Нова назва",
        },
        authors: {
          en: "New authors (comma-separated)",
          uk: "Нові автори (через кому)",
        },
        rates: {
          originalPrice: {
            en: "New original price",
            uk: "Нова початкова ціна",
          },
          discount: {
            en: "New percents",
            uk: "Нові відсотки",
          },
          price: {
            en: "New price",
            uk: "Нова ціна",
          },
        },
        images: {
          coverImage: {
            en: "New Cover Image",
            uk: "Нова обкладинка",
          },
          additionalImages: {
            en: "New Additional Images",
            uk: "Нові додаткові зображення",
          },
        },
        backgroundColor: {
          en: "New background color",
          uk: "Новий колір фону",
        },
        description: {
          en: "New description",
          uk: "Новий опис",
        },
        genres: {
          en: "New genres",
          uk: "Нові жанри",
        },
        language: {
          en: "New language",
          uk: "Нова мова",
        },
        publisher: {
          en: "New publisher",
          uk: "Новий видавець",
        },
        publicationYear: {
          en: "New publication year",
          uk: "Новий рік публікації",
        },
        isbn: {
          en: "New ISBN",
          uk: "Новий ISBN",
        },
        pageCount: {
          en: "New page count",
          uk: "Нова кількість сторінок",
        },
        coverType: {
          en: "New cover type",
          uk: "Новий тип обкладинки",
        },
        bookType: {
          en: "New book type",
          uk: "Новий тип книги",
        },
        paperType: {
          en: "New paper type",
          uk: "Новий тип паперу",
        },
        size: {
          en: "New size",
          uk: "Новий розмір",
        },
        weight: {
          en: "New weight",
          uk: "Нова вага",
        },
        illustrations: {
          en: "Does the book contain illustrations?",
          uk: "Чи містить книга ілюстрації?",
        },
        availableQuantity: {
          en: "New quantity",
          uk: "Нова кількість",
        },
        sku: {
          en: "New article",
          uk: "Новий артикул",
        },
      },
      placeholders: {
        title: {
          en: "Enter new title",
          uk: "Введіть нову назву",
        },
        authors: {
          en: "Enter new authors",
          uk: "Введіть нових авторів",
        },
        rates: {
          originalPrice: {
            en: "Enter new original price",
            uk: "Введіть нову початкову ціну",
          },
          discount: {
            en: "Enter new percents",
            uk: "Введіть нові відсотки",
          },
          price: {
            en: "Enter new price",
            uk: "Введіть нову ціну",
          },
        },
        description: {
          en: "Enter new description",
          uk: "Введіть новий опис",
        },
        publisher: {
          en: "Enter new publisher",
          uk: "Введіть нового видавця",
        },
        publicationYear: {
          en: "Enter new publication year",
          uk: "Введіть новий рік публікації",
        },
        isbn: {
          en: "Enter new ISBN",
          uk: "Введіть новий ISBN",
        },
        pageCount: {
          en: "Enter new page count",
          uk: "Введіть нову кількість сторінок",
        },
        size: {
          en: "Enter new size",
          uk: "Введіть новий розмір",
        },
        weight: {
          en: "Enter new weight",
          uk: "Введіть нову вагу",
        },
        availableQuantity: {
          en: "Enter new quantity",
          uk: "Введіть нову кількість",
        },
        sku: {
          en: "Enter new article",
          uk: "Введіть новий артикул",
        },
      },
      options: {
        genres: {
          en: "Select new genres",
          uk: "Виберіть нові жанри",
        },
        language: {
          en: "Select new language",
          uk: "Виберіть нову мову",
        },
        coverType: {
          en: "Select new type of cover",
          uk: "Виберіть новий тип обкладинки",
        },
        bookType: {
          en: "Select new book type",
          uk: "Виберіть новий тип книги",
        },
        paperType: {
          en: "Select new paper type",
          uk: "Виберіть новий тип паперу",
        },
      },
      checkboxes: {
        illustrations: {
          en: "Contains Illustrations",
          uk: "Містить ілюстрації", 
        },
        manual: {
          en: "Manual price entry",
          uk: "Ручне введення",
        },
      },
      prompts: {
        coverImage: {
          en: "Tap to select cover image",
          uk: "Натисніть, щоб вибрати обкладинку",
        },
        additionalImages: {
          en: "Tap to add image",
          uk: "Натисніть, щоб додати зображення",
        },
      },
      messages: {
        denied: {
          text: {
            en: "Permission Denied",
            uk: "Дозвіл відхилено",
          },
          subText: {
            en: "We need camera roll permissions to select images",
            uk: "Нам потрібні дозволи на доступ до галереї для вибору зображень",
          },
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
      labels: {
        firstName: {
          text: {
            en: "New first name",
            uk: "Нове ім'я",
          },
        },
        lastName: {
          text: {
            en: "New last name",
            uk: "Нове прізвище",
          },
        },
      },
      placeholders: {
        firstName: {
          text: {
            en: "Enter your new first name",
            uk: "Введіть нове ім'я",
          },
        },
        lastName: {
          text: {
            en: "Enter your last name",
            uk: "Введіть нове прізвище",
          },
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

    bookCharacteristics: {
      title: {
        en: "Characteristics",
        uk: "Характеристики",
      },
      labels: {
        pageCount: {
          en: "Page count",
          uk: "Кількість сторінок",
        },
        publisher: {
          en: "Publisher",
          uk: "Видавництво",
        },
        coverType: {
          en: "Cover type",
          uk: "Обкладинка",
        },
        publicationYear: {
          en: "Publication year",
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
          en: "Article",
          uk: "Артикул",
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
        notice: {
          title: {
            en: "Found an error?",
            uk: "Знайшли помилку?",
          },
          text: {
            en: "If you found an error or inaccuracy in the characteristics, please let us know via email",
            uk: "Якщо ви виявили помилку чи неточність у характеристиках, будь ласка, повідомте нас на емейл",
          },
        },
      },
    },

    bookDescription: {
      title: {
        en: "Description",
        uk: "Опис",
      },
      messages: {
        notice: {
          title: {
            en: "Found an error?",
            uk: "Знайшли помилку?",
          },
          text: {
            en: "If you found an error or inaccuracy in the description, please let us know via email",
            uk: "Якщо ви виявили помилку чи неточність в описі, будь ласка, повідомте нас на емейл",
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
    passwordTooShort: {
      en: "Password must be at least 6 characters",
      uk: "Пароль має бути не менше 6 символів",
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
    titleRequired: {
      en: "Title is required",
      uk: "Назва обов'язкова",
    },
    titleMinLength: {
      en: "Title must be at least 2 characters",
      uk: "Назва має бути не менше 2 символів",
    },
    authorsRequired: {
      en: "At least one author is required",
      uk: "Потрібен хоча б один автор",
    },
    authorsInvalid: {
      en: "Each author name must be at least 2 characters",
      uk: "Кожне ім'я автора має бути не менше 2 символів",
    },
    authorsMaxCount: {
      en: "Maximum 5 authors allowed",
      uk: "Дозволено максимум 5 авторів",
    },
    originalPriceRequired: {
      en: "Original price must be greater than 0",
      uk: "Початкова ціна має бути більшою за 0",
    },
    originalPriceInvalid: {
      en: "Original price must be a non-negative number",
      uk: "Початкова ціна має бути невід'ємним числом",
    },
    originalPriceMax: {
      en: "Original price cannot exceed 10.000",
      uk: "Початкова ціна не може перевищувати 10.000",
    },
    discountRequired: {
      en: "Discount is required",
      uk: "Знижка обов'язкова",
    },
    discountInvalid: {
      en: "Discount must be between 0 and 100",
      uk: "Знижка має бути від 0 до 100",
    },
    priceRequired: {
      en: "Price is required",
      uk: "Ціна обов'язкова",
    },
    priceInvalid: {
      en: "Price must be a non-negative number",
      uk: "Ціна має бути невід'ємним числом",
    },
    priceMax: {
      en: "Price cannot exceed 10.000",
      uk: "Ціна не може перевищувати 10.000",
    },
    coverImageRequired: {
      en: "Cover image is required",
      uk: "Обкладинка обов'язкова",
    },
    additionalImagesMaxCount: {
      en: "Maximum 5 additional images allowed",
      uk: "Дозволено максимум 5 додаткових зображень",
    },
    backgroundColorRequired: {
      en: "Background color is required",
      uk: "Колір фону обов'язковий",
    },
    descriptionRequired: {
      en: "Description is required",
      uk: "Опис обов'язковий",
    },
    descriptionMinLength: {
      en: "Description must be at least 500 characters",
      uk: "Опис має бути не менше 500 символів",
    },
    genresRequired: {
      en: "At least one genre is required",
      uk: "Потрібен хоча б один жанр",
    },
    genresMaxCount: {
      en: "Maximum 5 genres allowed",
      uk: "Дозволено максимум 5 жанрів",
    },
    languageRequired: {
      en: "Language is required",
      uk: "Мова обов'язкова",
    },
    publisherRequired: {
      en: "Publisher is required",
      uk: "Видавець обов'язковий",
    },
    publisherMinLength: {
      en: "Publisher must be at least 2 characters",
      uk: "Видавець має бути не менше 2 символів",
    },
    publicationYearRequired: {
      en: "Publication year is required",
      uk: "Рік видання обов'язковий",
    },
    publicationYearInvalid: {
      en: "Publication year must be between 1800 and the current year",
      uk: "Рік видання має бути між 1800 і поточним роком",
    },
    isbnRequired: {
      en: "ISBN is required",
      uk: "ISBN обов'язковий",
    },
    isbnInvalid: {
      en: "ISBN must be 10 or 13 digits",
      uk: "ISBN має містити 10 або 13 цифр",
    },
    pageCountRequired: {
      en: "Page count is required",
      uk: "Кількість сторінок обов'язкова",
    },
    pageCountMax: {
      en: "Page count cannot exceed 10.000",
      uk: "Кількість сторінок не може перевищувати 10.000",
    },
    coverTypeRequired: {
      en: "Cover type is required",
      uk: "Тип обкладинки обов'язковий",
    },
    bookTypeRequired: {
      en: "Book type is required",
      uk: "Тип книги обов'язковий",
    },
    paperTypeRequired: {
      en: "Paper type is required",
      uk: "Тип паперу обов'язковий",
    },
    sizeRequired: {
      en: "Size is required",
      uk: "Розмір обов'язковий",
    },
    sizeMinLength: {
      en: "Size must be at least 2 characters",
      uk: "Розмір має бути не менше 2 символів",
    },
    weightRequired: {
      en: "Weight must be greater than 0",
      uk: "Вага має бути більшою за 0",
    },
    weightMax: {
      en: "Weight cannot exceed 10.000 grams",
      uk: "Вага не може перевищувати 10.000 грамів",
    },
    illustrationsRequired: {
      en: "Illustrations status is required",
      uk: "Статус ілюстрацій обов'язковий",
    },
    availableQuantityRequired: {
      en: "Available quantity is required",
      uk: "Доступна кількість обов'язкова",
    },
    availableQuantityInvalid: {
      en: "Available quantity must be a non-negative number",
      uk: "Доступна кількість має бути невід'ємним числом",
    },
    availableQuantityMax: {
      en: "Available quantity cannot exceed 100",
      uk: "Кількість не може перевищувати 100",
    },
    skuRequired: {
      en: "Article is required",
      uk: "Артикул обов'язковий",
    },
    skuMinLength: {
      en: "Article must be at least 2 characters",
      uk: "Артикул має бути не менше 2 символів",
    },
  },

  alerts: {
    login: {
      error: {
        message: {
          en: "Failed to log in",
          uk: "Не вдалося увійти",
        },
      },
    },
    confirmLogout: {
      title: {
        en: "Confirm",
        uk: "Підтвердження",
      },
      message: {
        en: "Are you sure you want to log out?",
        uk: "Ви впевнені, що хочете вийти?",
      },
      success: {
        message: {
          en: "You have been logged out.",
          uk: "Ви вийшли з системи.",
        }
      },
      error: {
        message: {
          en: "Failed to log out.",
          uk: "Не вдалося вийти.",
        },
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
    profileUpdate: {
      success: {
        title: {
          en: "Success",
          uk: "Успішно",
        },
        message: {
          en: "Your profile has been updated.",
          uk: "Ваш профіль було оновлено.",
        },
      },
      error: {
        message: {
          en: "Failed to update profile. Please try again.",
          uk: "Не вдалося оновити профіль. Спробуйте ще раз.",
        },
      },
    },    
    editBook: {
      success: {
        message: {
          en: "Book updated successfully.",
          uk: "Книгу успішно оновлено."
        }
      },
      error: {
        message: {
          en: "Failed to update book. Please try again.",
          uk: "Не вдалося оновити книгу. Спробуйте ще раз."
        }
      },  
    },
    orderCopied: {
      title: {
        en: "Copied",
        uk: "Скопійовано",
      },
      message: {
        en: "Order ID copied to clipboard.",
        uk: "ID замовлення скопійовано.",
      },
    },
    noNetwork: {
      message: {
        en: "No internet connection. Please check your network and try again.",
        uk: "Немає підключення до Інтернету. Будь ласка, перевірте мережу та спробуйте ще раз.",
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
      success: {
        title: {
          en: "Success",
          uk: "Успішно",
        },
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
    auth: {
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
      emailAlreadyInUse: {
        en: "This email is already in use",
        uk: "Ця електронна пошта вже використовується",
      },
    },
    users: {
      userNotFound: {
        en: "User not found",
        uk: "Користувача не знайдено",
      },
      userNotFoundAfterUpdate: {
        en: "User not found after update",
        uk: "Користувача не знайдено після оновлення"
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
      processing: {
        en: "Processing",
        uk: "Обробка",
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
      processing: {
        en: "Your order is being prepared for shipment",
        uk: "Ваше замовлення готується до відправки",
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
