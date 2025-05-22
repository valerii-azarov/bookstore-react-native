export type TranslationValue = string | { [key: string]: string };

export type Translations = {
  [key: string]: TranslationValue | Translations;
};

const translations: Translations = {
  screens: {
    welcome: {
      header: {
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
      },
      buttons: {
        start: {
          en: "Get started",
          uk: "Почати",
        },
      },
    },

    signIn: {
      header: {
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
      },
      labels: {
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
        register: {
          en: "Sign Up",
          uk: "Зареєструватися",
        },
        trouble: {
          en: "Contact us",
          uk: "Зв'яжіться з нами",
        },
      },
      fields: {
        email: {
          label: {
            en: "Email",
            uk: "Електронна пошта",
          },
          placeholder: {
            en: "Enter your email",
            uk: "Введіть електронну пошту",
          },
        },
        password: {
          label: {
            en: "Password",
            uk: "Пароль",
          },
          placeholder: {
            en: "Enter your password",
            uk: "Введіть пароль",
          },
        },
      },
      validators: {
        email: {
          required: {
            en: "Email is required",
            uk: "Електронна пошта обов'язкова",
          },
          invalid: {
            en: "Please enter a valid email address",
            uk: "Будь ласка, введіть правильно електронну пошту",
          },
        },
        password: {
          required: {
            en: "Password is required",
            uk: "Пароль обов'язковий",
          },
          tooShort: {
            en: "Password must be at least 6 characters",
            uk: "Пароль має бути не менше 6 символів",
          },
        },
      },
      buttons: {
        signIn: {
          en: "Sign In",
          uk: "Увійти",
        },
      },
      alerts: {
        failedLogin: {
          title: {
            en: "Error",
            uk: "Помилка",
          },
          message: {
            en: "Failed to log in",
            uk: "Не вдалося увійти",
          },  
        },
      },
    },

    books: {
      header: {
        title: {
          user: {
            en: "Books",
            uk: "Книги",
          },
          admin: {
            en: "List of books",
            uk: "Перелік книг",
          },
        },
      },
      searchInput: {
        title: {
          en: "Search by title or article",
          uk: "Пошук за назвою або артикулом",
        }
      },
      buttons: {
        showAll: {
          en: "Show all",
          uk: "Показати всі",          
        }, 
      },
      messages: {
        empty: {
          title: {
            en: "Oops, nothing here!",
            uk: "Ой, тут порожньо!",
          },
          subtitle: {
            en: "Looks like we don’t have anything to show yet",
            uk: "Здається, нам поки що нічого показати",
          },
        },
      },
      alerts: {
        confirmDelete: {
          title: {
            en: "Delete Book",
            uk: "Видалити книгу",
          },
          message: {
            en: "Are you sure you want to delete this book? This action cannot be undone",
            uk: "Ви впевнені, що хочете видалити цю книгу? Цю дію неможливо скасувати",
          },
          buttons: {
            confirm: {
              en: "Delete",
              uk: "Видалити",
            },
            cancel: {
              en: "Cancel",
              uk: "Скасувати",
            },
          },
          responses: {
            success: {
              title: {
                en: "Success",
                uk: "Успішно",
              },
              message: {
                en: "The book has been deleted",
                uk: "Книгу видалено",
              },
            },
            error: {
              title: {
                en: "Error",
                uk: "Помилка",
              },
              message: {
                en: "Failed to delete the book",
                uk: "Не вдалося видалити книгу",
              },
            },
          },
        },
      },
    },

    categoryBooks: {            
      messages: {
        empty: {
          title: {
            en: "No books here yet!",
            uk: "Тут ще немає книг!",
          },
          subtitle: {
            en: "Explore other categories for more books",
            uk: "Перегляньте інші категорії, щоб знайти книги",
          },
        },
      },   
    },

    bookDetails: {
      header: {
        title: {
          en: "Book Details",
          uk: "Деталі книги",
        },
      },
      labels: {
        outOfStock: {
          en: "Out of stock",
          uk: "Немає в наявності",
        },
      },
      sections: {
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
      buttons: {
        buy: {
          en: "Buy",
          uk: "Купити",
        },
        viewAllCharacteristics: {
          en: "View all characteristics",
          uk: "Подивитись всі характеристики",
        },
        viewFullDescription: {
          en: "View full description",
          uk: "Подивитись весь опис",
        },
      },
    },

    bookSettings: {
      header: {
        title: {
          en: "Book Settings",
          uk: "Параметри книги",
        },
      },
      buttons: {
        edit: {
          en: "Edit",
          uk: "Змінити",
        },
      },
    },

    search: {
      header: {
        title: {
          en: "Search",
          uk: "Пошук",
        },
      },
      searchInput: {
        title: {
          en: "What to find?",
          uk: "Що знайти?",
        }
      },
      startPrompt: {
        title: {
          en: "Find your favorite book",
          uk: "Ми шукаємо\n твою улюблену книгу",
        },
        subtitle: {
          en: "Tap the search bar to find and buy",
          uk: "Натисни панель пошуку, щоб знайти та купити книгу",
        },
      },
    },

    searchBooks: {
      header: {
        title: {
          en: "Search",
          uk: "Пошук",
        },
      },
      searchInput: {
        title: {
          user: {
            en: "What to find?",
            uk: "Що знайти?",
          },
          admin: {
            en: "Search by title or article",
            uk: "Пошук за назвою або артикулом",
          },
        },
      },
      messages: {
        empty: {
          title: {
            en: "We looked everywhere but found nothing",
            uk: "Шукали скрізь,\n але нічого не знайшли",
          },
        },
      },
    },

    orderHistory: {
      header: {
        title: {
          en: "Order History",
          uk: "Історія замовлень",
        },
      },
      messages: {
        empty: {
          title: {
            en: "No orders available",
            uk: "Немає замовлень",
          },
          subtitle: {
            en: "You haven't placed any orders yet",
            uk: "Ви ще не зробили жодного замовлення",
          },
        },
      },
    },

    orderDetails: {
      header: {
        title: {
          en: "Order Details",
          uk: "Деталі замовлення",
        },
      },
      sections: {
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
          en: "Subtotal",
          uk: "Підсумок",
        },
        discount: {
          en: "Discount",
          uk: "Знижка",
        },
        total: {
          en: "Total",
          uk: "Всього",
        },
      },
      fields: {
        paymentMethod: {
          label: {
            en: "Payment method",
            uk: "Спосіб оплати",
          },
          values: {
            cod: {
              en: "Cash on Delivery",
              uk: "Накладений платіж",
            },
            card: {
              en: "Bank Card",
              uk: "Банківською карткою",
            },
          },
          notSpecified: {
            en: "Payment method not selected",
            uk: "Не обрано спосіб оплати",
          },
        },
        paymentStatus: {
          label: {
            en: "Payment status",
            uk: "Статус оплати",
          },
          values: {
            paid: {
              en: "Paid",
              uk: "Оплачено",
            },
            unpaid: {
              en: "Unpaid",
              uk: "Не оплачено",
            },
          },
        },
        deliveryAddress: {
          label: {
            en: "Delivery address",
            uk: "Адреса доставки",
          },
        },
        fullName: {
          label: {
            en: "Full Name",
            uk: "ПІБ",
          },
        },
        phoneNumber: {
          label: {
            en: "Phone number",
            uk: "Номер телефону",
          },
        },
        createdAt: {
          label: {
            en: "Creation date",
            uk: "Дата створення",
          },
        },
        updatedAt: {
          label: {
            en: "Update date",
            uk: "Дата оновлення",
          },
        },
      },
      buttons: {
        viewStatus: {
          en: "View status",
          uk: "Переглянути статус",
        },
        viewReceipt: {
          en: "View receipt",
          uk: "Переглянути квитанцію",
        },
      },
      alerts: {
        copied: {
          title: {
            en: "Copied",
            uk: "Скопійовано",
          },
          message: {
            en: "Order ID copied to clipboard",
            uk: "ID замовлення скопійовано",
          },
        },
      },
    },

    orders: { 
      header: {
        title: {
          en: "Orders",
          uk: "Замовлення",
        },
      },
      messages: {
        empty: {
          title: {
            en: "No orders available",
            uk: "Немає замовлень",
          },
          subtitle: {
            en: "No orders available yet, or they might show up later",
            uk: "Поки що замовлень немає, або вони з’являться пізніше",
          },
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
      sections: {
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
        version: {
          en: "Version",
          uk: "Версія додатку",
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
          buttons: {
            confirm: {
              en: "Confirm",
              uk: "Підтвердити",
            },
            cancel: {
              en: "Cancel",
              uk: "Скасувати",
            },
          },
          responses: {
            success: {
              title: {
                en: "Success",
                uk: "Успішно",
              },
              message: {
                en: "You have been logged out",
                uk: "Ви вийшли з системи",
              },
            },
            error: {
              title: {
                en: "Error",
                uk: "Помилка",
              },
              message: {
                en: "Failed to log out",
                uk: "Не вдалося вийти",
              },
            },
          },
        },
      },
    },

    profile: {
      header: {
        title: {
          en: "Profile",
          uk: "Профіль",
        },
      },
      fields: {
        firstName: {
          label: {
            en: "First Name",
            uk: "Ім'я",
          },
        },
        lastName: {
          label: {
            en: "Last Name",
            uk: "Прізвище",
          },
        },
        email: {
          label: {
            en: "Email",
            uk: "Електронна пошта",
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

    favorites: {            
      header: {
        title: {
          en: "Favorites",
          uk: "Обрані книги",
        },
      },
      messages: {    
        empty: {
          title: {
            en: "No favorites available",
            uk: "Немає обраних книг",
          },
        },
      },     
    },

    viewingHistory: {            
      header: {
        title: {
          en: "Viewing History",
          uk: "Переглянуті книги",
        },
      },
      messages: {       
        empty: {
          title: {
            en: "No viewing history available",
            uk: "Жодної переглянутої книги",
          },
        },
      },     
    },
  },

  modals: {
    signUp: {
      header: {
        title: {
          en: "Sign Up",
          uk: "Реєстрація",
        },
      },
      steps: {
        step1: {
          title: {
            en: "Personal Details",
            uk: "Особисті дані",
          },
          fields: {
            firstName: {
              label: {
                en: "First Name",
                uk: "Ім'я",
              },
              placeholder: {
                en: "Enter first name",
                uk: "Введіть ім'я",
              },
            },
            lastName: {
              label: {
                en: "Last Name",
                uk: "Прізвище",
              },
              placeholder: {
                en: "Enter last name",
                uk: "Введіть прізвище",
              },
            },
          },
        },
        step2: {
          title: {
            en: "Account Credentials",
            uk: "Облікові дані",
          },
          fields: {
            email: {
              label: {
                en: "Email",
                uk: "Електронна пошта",
              },
              placeholder: {
                en: "Enter your email",
                uk: "Введіть електронну пошту",
              },
            },
            password: {
              label: {
                en: "Password",
                uk: "Пароль",
              },
              placeholder: {
                en: "Enter your password",
                uk: "Введіть пароль",
              },
            },
            confirmPassword: {
              label: {
                en: "Confirm Password",
                uk: "Підтвердження пароля",
              },
              placeholder: {
                en: "Confirm password",
                uk: "Підтвердіть пароль",
              },
            },
          },
        },
      },
      validators: {
        firstName: {
          required: {
            en: "First name is required",
            uk: "Ім'я обов'язково",
          },
          minLength: {
            en: "First name must be at least 2 characters",
            uk: "Ім'я має бути не менше 2 символів",
          },
        },
        lastName: {
          required: {
            en: "Last name is required",
            uk: "Прізвище обов'язково",
          },
          minLength: {
            en: "Last name must be at least 2 characters",
            uk: "Прізвище має бути не менше 2 символів",
          },
        },
        email: {
          required: {
            en: "Email is required",
            uk: "Електронна пошта обов'язкова",
          },
          invalid: {
            en: "Please enter a valid email address",
            uk: "Будь ласка, введіть правильно електронну пошту",
          },
        },
        password: {
          required: {
            en: "Password is required",
            uk: "Пароль обов'язковий",
          },
          invalid: {
            en: "Password must be at least 6 characters and contain an uppercase letter, number, or special character",
            uk: "Пароль має бути не менше 6 символів і містити велику букву, цифру або спеціальний символ",
          },
        },
        confirmPassword: {
          required: {
            en: "Confirm password is required",
            uk: "Підтвердіть пароль",
          },
          match: {
            en: "Passwords do not match",
            uk: "Паролі не співпадають",
          },
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
      buttons: {
        back: {
          en: "Back",
          uk: "Назад",
        },
        continue: {
          en: "Continue",
          uk: "Продовжити",
        },
        register: {
          en: "Register",
          uk: "Зареєструватися",
        },
        finish: {
          en: "Finish",
          uk: "Перейти",
        },
      },
      messages: {
        success: {
          title: {
            en: "Welcome!",
            uk: "Вітаємо!",
          },
          subtitle: {
            en: "Your account has been created!\n Proceed to the main page",
            uk: "Ваш обліковий запис створений!\n Перейдіть на головну сторінку",
          },
        },
        error: {
          title: {
            en: "Error ❌",
            uk: "Помилка ❌",
          },
          subtitle: {
            en: "Please try again later",
            uk: "Будь ласка, спробуйте ще раз пізніше",
          },
        },
      },
    },

    bookCharacteristics: {
      header: {
        title: {
          en: "Characteristics",
          uk: "Характеристики",
        },
      },
      reportIssue: {
        title: {
          en: "Found an error?",
          uk: "Знайшли помилку?",
        },
        subtitle: {
          en: "If you found an error or inaccuracy in the characteristics, please let us know via email",
          uk: "Якщо ви виявили помилку чи неточність у характеристиках, будь ласка, повідомте нас на емейл",
        },
      }, 
    },

    bookDescription: {
      header: {
        title: {
          en: "Description",
          uk: "Опис",
        },
      },
      reportIssue: {
        title: {
          en: "Found an error?",
          uk: "Знайшли помилку?",
        },
        subtitle: {
          en: "If you found an error or inaccuracy in the description, please let us know via email",
          uk: "Якщо ви виявили помилку чи неточність в описі, будь ласка, повідомте нас на емейл",
        },
      },      
    },

    createBook: {
      header: {
        title: {
          en: "Create Book",
          uk: "Створення книги",
        },
      },
      steps: {
        step1: {
          title: {
            en: "Book Title and Authors",
            uk: "Назва книги та автори",
          },
          fields: {
            title: {
              label: {
                en: "Enter the title of the book",
                uk: "Введіть назву книги",
              },
              placeholder: {
                en: "e.g. Murder on the Orient Express",
                uk: "Наприклад, Вбивство в «Східному експресі»",
              },
            },
            authors: {
              label: {
                en: "Enter authors separated by commas",
                uk: "Введіть авторів, розділяючи комами",
              },
              placeholder: {
                en: "e.g. Agatha Christie",
                uk: "Наприклад, Агата Крісті",
              },
            },
          },
        },
        step2: {
          title: {
            en: "Genres",
            uk: "Жанри",
          },
          fields: {
            genres: {
              label: {
                en: "Select the genres that best describe the book",
                uk: "Виберіть жанри, які найкраще описують книгу",
              },
              option: {
                en: "Select genres",
                uk: "Виберіть жанри",
              },
            },
          },
        },
        step3: {
          title: {
            en: "Description",
            uk: "Опис",
          },
          fields: {
            description: {
              label: {
                en: "Provide a brief description of the book",
                uk: "Напишіть короткий опис книги",
              },
              placeholder: {
                en: "e.g. A detective novel involving the famous detective Hercule Poirot...",
                uk: "Наприклад, Детективний роман про знаменитого детектива Еркюля Пуаро...",
              },
            },
          },
        },
        step4: {
          title: {
            en: "Page Count",
            uk: "Кількість сторінок",
          },
          fields: {
            pageCount: {
              label: {
                en: "Enter the number of pages in the book",
                uk: "Введіть кількість сторінок",
              },
              placeholder: {
                en: "e.g. 288",
                uk: "Наприклад, 288",
              },
            },
          },
        },
        step5: {
          title: {
            en: "Illustrations",
            uk: "Ілюстрації",
          },
          fields: {
            illustrations: {
              checkboxLabel: {
                en: "Does the book contain illustrations?",
                uk: "Чи містить книга ілюстрації?",
              },
              values: {
                contains: {
                  en: "Contains illustrations",
                  uk: "Містить ілюстрації",
                },
              },
            },
          },
        },
        step6: {
          title: {
            en: "Language",
            uk: "Мова",
          },
          fields: {
            language: {
              label: {
                en: "Select the language of the book",
                uk: "Виберіть мову книги",
              },
              option: {
                en: "Select language",
                uk: "Виберіть мову",
              },
            },
          },
        },
        step7: {
          title: {
            en: "Images",
            uk: "Зображення",
          },
          fields: {
            coverImage: {
              label: {
                en: "Cover Image",
                uk: "Обкладинка",
              },
              prompt: {
                en: "Tap to select cover image",
                uk: "Натисніть, щоб вибрати обкладинку",
              },
              alerts: {
                denied: {
                  title: {
                    en: "Permission denied",
                    uk: "Дозвіл відхилено",
                  },
                  subtitle: {
                    en: "We need camera roll permissions to select images",
                    uk: "Нам потрібні дозволи на доступ до галереї для вибору зображень",
                  },
                },
              },
            },
            additionalImages: {
              label: {
                en: "Additional Images",
                uk: "Додаткові зображення",
              },
              prompt: {
                en: "Tap to add image",
                uk: "Натисніть, щоб додати зображення",
              },
            },
          },
        },
        step8: {
          title: {
            en: "Background Color",
            uk: "Колір фону",
          },
          fields: {
            backgroundColor: {
              label: {
                en: "Select background color",
                uk: "Виберіть колір фону",
              },
            },
          },
        },
        step9: {
          title: {
            en: "Publisher and Year",
            uk: "Видавець і рік", 
          },
          fields: {
            publisher: {
              label: {
                en: "Enter the publisher of the book",
                uk: "Введіть видавництво книги",
              },
              placeholder: {
                en: "e.g. Canon of Hercule Poirot",
                uk: "Наприклад, Канон Еркюля Пуаро",
              },
            },
            publicationYear: {
              label: {
                en: "Enter the year the book was published",
                uk: "Введіть рік публікації книги",
              },
              placeholder: {
                en: "e.g. 1938",
                uk: "Наприклад, 1938",
              },
            },
          },
        },
        step10: {
          title: {
            en: "ISBN",
            uk: "ISBN",
          },
          fields: {
            isbn: {
              label: {
                en: "Enter the book's ISBN number",
                uk: "Введіть ISBN книги",
              },
              placeholder: {
                en: "e.g. 978-617-12-9854-5",
                uk: "Наприклад, 978-617-12-9854-5",
              },
            },
          },
        },
        step11: {
          title: {
            en: "Book Format",
            uk: "Формат книги",
          },
          fields: {
            coverType: {
              label: {
                en: "Select the type of cover",
                uk: "Виберіть тип обкладинки",
              },
              option: {
                en: "Select the type of cover",
                uk: "Виберіть тип обкладинки",
              },
            },
            bookType: {
              label: {
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
                en: "Select the paper type",
                uk: "Виберіть тип паперу",
              },
              option: {
                en: "Select paper type",
                uk: "Виберіть тип паперу",
              },
            },
          },
        },
        step12: {
          title: {
            en: "Size and Weight",
            uk: "Розмір і вага",
          },
          fields: {
            size: {
              label: {
                en: "Enter the dimensions o fthe book",
                uk: "Введіть розміри книги",
              },
              placeholder: {
                en: "e.g. 170 x 123 x 25 mm",
                uk: "Наприклад, 170 x 123 x 25 мм",
              },
            },
            weight: {
              label: {
                en: "Enter the weight of the book",
                uk: "Введіть вагу книги",
              },
              placeholder: {
                en: "e.g. 210 grams",
                uk: "Наприклад, 210 грам",
              },
            },
          },
        },
        step13: {
          title: {
            en: "Cost",
            uk: "Вартість",
          },
          fields: {
            originalPrice: {
              label: {
                en: "Enter original price",
                uk: "Введіть початкову ціну",
              },
              placeholder: {
                en: "e.g. 500.00",
                uk: "Наприклад, 500.00",
              },
            },
            discount: {
              label: {
                en: "Enter percents",
                uk: "Введіть відсотки",
              },
              placeholder: {
                en: "e.g. 15",
                uk: "Наприклад, 15",
              },
            },
            price: {
              label: {
                en: "Enter price",
                uk: "Введіть ціну",
              },
              placeholder: {
                en: "e.g. 425.00",
                uk: "Наприклад, 425.00",
              },
            },
            manual: {
              checkboxLabel: {
                en: "Manual price entry",
                uk: "Ручне введення",
              },
            },
          },
        },
        step14: {
          title: {
            en: "Quantity",
            uk: "Кількість",
          },
          fields: {
            availableQuantity: {
              label: {
                en: "Enter quantity of books",
                uk: "Введіть кількість книг",
              },
              placeholder: {
                en: "e.g. 25",
                uk: "Наприклад, 25",
              },
            },
          },
        },
        step15: {
          title: {
            en: "Article",
            uk: "Артикул",
          },
          fields: {
            sku: {
              label: {
                en: "Enter the article of the book",
                uk: "Введіть артикул книги",      
              },
              placeholder: {
                en: "e.g. 825751754618",
                uk: "Наприклад, 825751754618",
              },
            },
          },
        },
      },
      validators: {
        title: {
          required: {
            en: "Title is required",
            uk: "Назва обов'язкова",
          },
          minLength: {
            en: "Title must be at least 2 characters",
            uk: "Назва має бути не менше 2 символів",
          },
        },
        authors: {
          required: {
            en: "At least one author is required",
            uk: "Потрібен хоча б один автор",
          },
          invalid: {
            en: "Each author name must be at least 2 characters",
            uk: "Кожне ім'я автора має бути не менше 2 символів",
          },
          maxCount: {
            en: "Maximum 5 authors allowed",
            uk: "Дозволено максимум 5 авторів",
          },
        }, 
        originalPrice: {
          required: {
            en: "Original price must be greater than 0",
            uk: "Початкова ціна має бути більшою за 0",
          },
          invalid: {
            en: "Original price must be a non-negative number",
            uk: "Початкова ціна має бути невід'ємним числом",
          },
          max: {
            en: "Original price cannot exceed 10.000",
            uk: "Початкова ціна не може перевищувати 10.000",
          },
        },
        discount: {
          required: {
            en: "Discount is required",
            uk: "Відсотки обов'язкові",
          },
          invalid: {
            en: "Discount must be between 0 and 100",
            uk: "Відсотки мають бути від 0 до 100",
          },
        },        
        price: {
          required: {
            en: "Price is required",
            uk: "Ціна обов'язкова",
          },
          pinvalid: {
            en: "Price must be a non-negative number",
            uk: "Ціна має бути невід'ємним числом",
          },
          max: {
            en: "Price cannot exceed 10.000",
            uk: "Ціна не може перевищувати 10.000",
          },
        },
        coverImage: {
          required: {
            en: "Cover image is required",
            uk: "Обкладинка обов'язкова",
          },
        },
        additionalImages: {
          maxCount: {
            en: "Maximum 5 additional images allowed",
            uk: "Дозволено максимум 5 додаткових зображень",
          },
        },
        backgroundColor: {
          required: {
            en: "Background color is required",
            uk: "Колір фону обов'язковий",
          },
        },
        description: {
          required: {
            en: "Description is required",
            uk: "Опис обов'язковий",
          },
          minLength: {
            en: "Description must be at least 500 characters",
            uk: "Опис має бути не менше 500 символів",
          },
        },
        genres: {
          required: {
            en: "At least one genre is required",
            uk: "Потрібен хоча б один жанр",
          },
          maxCount: {
            en: "Maximum 5 genres allowed",
            uk: "Дозволено максимум 5 жанрів",
          },
        },
        language: {
          required: {
            en: "Language is required",
            uk: "Мова обов'язкова",
          },
        },
        publisher: {
          required: {
            en: "Publisher is required",
            uk: "Видавець обов'язковий",
          },
          minLength: {
            en: "Publisher must be at least 2 characters",
            uk: "Видавець має бути не менше 2 символів",
          },
        },
        publicationYear: {
          required: {
            en: "Publication year is required",
            uk: "Рік видання обов'язковий",
          },
          invalid: {
            en: "Publication year must be between 1800 and the current year",
            uk: "Рік видання має бути між 1800 і поточним роком",
          },
        },
        isbn: {
          required: {
            en: "ISBN is required",
            uk: "ISBN обов'язковий",
          },
          invalid: {
            en: "ISBN must be 10 or 13 digits",
            uk: "ISBN має містити 10 або 13 цифр",
          },
        },
        pageCount: {
          required: {
            en: "Page count is required",
            uk: "Кількість сторінок обов'язкова",
          },
          max: {
            en: "Page count cannot exceed 10.000",
            uk: "Кількість сторінок не може перевищувати 10.000",
          },
        },
        coverType: {
          required: {
            en: "Cover type is required",
            uk: "Тип обкладинки обов'язковий",
          },
        },
        bookType: {
          required: {
            en: "Book type is required",
            uk: "Тип книги обов'язковий",
          },
        },
        paperType: {
          required: {
            en: "Paper type is required",
            uk: "Тип паперу обов'язковий",
          },
        },
        size: {
          required: {
            en: "Size is required",
            uk: "Розмір обов'язковий",
          },
          minLength: {
            en: "Size must be at least 2 characters",
            uk: "Розмір має бути не менше 2 символів",
          },
        },
        weight: {
          required: {
            en: "Weight must be greater than 0",
            uk: "Вага має бути більшою за 0",
          },
          max: {
            en: "Weight cannot exceed 10.000 grams",
            uk: "Вага не може перевищувати 10.000 грамів",
          },
        },
        illustrations: {
          required: {
            en: "Illustrations status is required",
            uk: "Статус ілюстрацій обов'язковий",
          },
        },
        availableQuantity: {
          required: {
            en: "Available quantity is required",
            uk: "Доступна кількість обов'язкова",
          },
          invalid: {
            en: "Available quantity must be a non-negative number",
            uk: "Доступна кількість має бути невід'ємним числом",
          },
          max: {
            en: "Available quantity cannot exceed 100",
            uk: "Кількість не може перевищувати 100",
          },
        },
        sku: {
          required: {
            en: "Article is required",
            uk: "Артикул обов'язковий",
          },
          minLength: {
            en: "Article must be at least 2 characters",
            uk: "Артикул має бути не менше 2 символів",
          },
        },
      },
      buttons: {
        back: {
          en: "Back",
          uk: "Назад",
        },
        continue: {
          en: "Continue",
          uk: "Продовжити",
        },
        create: {
          en: "Create",
          uk: "Створити",
        },
        complete: {
          en: "Complete",
          uk: "Завершити",
        },
        exit: {
          en: "Return",
          uk: "Повернутись",
        },
      },
      messages: {
        success: {
          title: {
            en: "Book has been added ✅",
            uk: "Книгу додано ✅",
          },
          subtitle: {
            en: "Successfully added to the book list",
            uk: "Успішно додано до списку книг",
          },
        },
        error: {
          title: {
            en: "Error ❌",
            uk: "Помилка ❌",
          },
          subtitle: {
            en: "Please try again later",
            uk: "Будь ласка, спробуйте ще раз пізніше",
          },
        },
      },
    },

    editBook: {
      header: {
        title: {
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
      },
      buttons: {
        save: {
          en: "Save",
          uk: "Зберегти",
        },
      },
      alerts: {
        updateBook: {
          responses: {
            success: {
              title: {
                en: "Success",
                uk: "Успішно",
              },
              message: {
                en: "The book has been updated",
                uk: "Книгу оновлено",
              },
            },
            error: {
              title: {
                en: "Error",
                uk: "Помилка",
              },
              message: {
                en: "Failed to update the book",
                uk: "Не вдалося оновити книгу",
              },
            },
          },
        },
      },
    },
    
    cart: {
      header: {
        title: {
          en: "Cart",
          uk: "Кошик",
        },
      },
      labels: {
        order: {
          en: "Your order",
          uk: "Ваше замовлення",
        },
        subtotal: {
          en: "Subtotal",
          uk: "Підсумок",
        },
        discount: {
          en: "Discount",
          uk: "Знижка",
        },
        total: {
          en: "Total",
          uk: "Загалом",
        },
      },
      buttons: {
        checkout: {
          en: "Checkout",
          uk: "Оформити замовлення",
        },
      },
      messages: {       
        empty: {
          title: {
            en: "Your cart is empty",
            uk: "Ваш кошик порожній",
          },
        },
      },
      alerts: {
        confirmDelete: {
          title: {
            en: "Delete Book",
            uk: "Видалити книгу",
          },
          message: {
            en: "Do you want to remove this book from your cart?",
            uk: "Ви хочете видалити цю книгу з кошика?",
          },
          buttons: {
            confirm: {
              en: "Delete",
              uk: "Видалити",
            },
            cancel: {
              en: "Cancel",
              uk: "Скасувати",
            },
          },
        },
      },
    },

    checkout: {
      header: {
        title: {
          en: "Checkout",
          uk: "Оформлення",
        },
      },
      steps: {
        step1: {
          title: {
            en: "Delivery",
            uk: "Доставка",
          },
          fields: {
            city: {
              label: {
                en: "Select location",
                uk: "Оберіть пункт",
              },
              placeholder: {
                en: "Search location...",
                uk: "Пошук пункту...",
              },
              responses: {
                loading: {
                  en: "Loading locations...",
                  uk: "Завантаження пунктів...",
                },
                empty: {
                  en: "Location not found",
                  uk: "Пункт не знайдено",
                },
                error: {
                  en: "Error loading locations",
                  uk: "Помилка при завантаженні пунктів",
                },
              },
            },
            warehouse: {
              label: {
                en: "Select branch",
                uk: "Оберіть відділення",
              },
              placeholder: {
                en: "Search branch...",
                uk: "Пошук відділення...",
              },
              responses: {
                loading: {
                  en: "Loading branches...",
                  uk: "Завантаження відділень...",
                },
                empty: {
                  en: "Branch not found",
                  uk: "Відділення не знайдено",
                },
                error: {
                  en: "Error loading branches",
                  uk: "Помилка при завантаженні відділень",
                },
              }
            },
          },
          notice: {
            subtitle: {  
              en: "Select a city and Nova Post branch so we can deliver your order to a convenient location for you",
              uk: "Виберіть місто та відділення Нової Пошти, щоб ми доставили замовлення саме туди, де вам зручно",
            },
          },
        },
        step2: {
          title: {
            en: "Contact Information",
            uk: "Контактні дані",
          },
          fields: {
            firstName: {
              label: {
                en: "First Name",
                uk: "Ім'я",
              },
              placeholder: {
                en: "Enter first name",
                uk: "Введіть ім'я",
              },
            },
            lastName: {
              label: {
                en: "Last Name",
                uk: "Прізвище",
              },
              placeholder: {
                en: "Enter last name",
                uk: "Введіть прізвище",
              },
            },
            middleName: {
              label: {
                en: "Middle Name (optional)",
                uk: "По батькові (необов’язково)",
              },
              placeholder: {
                en: "Enter middle name",
                uk: "Введіть по батькові",
              },
            },
            phoneNumber: {
              label: {
                en: "Phone Number",
                uk: "Номер телефону",
              },
            },
          },
        },
        step3: {
          title: {
            en: "Payment Method",
            uk: "Спосіб оплати",
          },
          labels: {
            totalAmount: {
              en: "Total amount to pay:",
              uk: "Загальна сума до сплати:",
            },
          },
          fields: {
            paymentMethod: {
              label: {
                en: "Select payment method",
                uk: "Оберіть спосіб оплати",
              },
              values: {
                cod: {
                  en: "Cash on Delivery",
                  uk: "Накладений платіж",
                },
                card: {
                  en: "Bank Card",
                  uk: "Банківською карткою",
                },
              },
            },
          },
          notice: {
            title: {
              en: "❗Please note",
              uk: "❗Зверніть увагу",
            },
            subtitle: {  
              en: "Payment by bank card is temporarily unavailable. You can pay for your order upon receipt at a Nova Post branch",
              uk: "Оплата банківською карткою тимчасово недоступна. Можна оплатити замовлення при отриманні у відділенні Нова Пошта",
            },
          },
        },
        step4: {
          title: {
            en: "Confirmation",
            uk: "Підтвердження",
          },
          labels: {
            check: {
              en: "Please check your details",
              uk: "Будь ласка, перевірте ваші дані",
            },
          },
          fields: {
            deliveryAddress: {
              label: {
                en: "Delivery address:",
                uk: "Адреса доставки:",
              },
              notSpecified: {
                en: "City and branch not specified",
                uk: "Не вказано місто та відділення",
              },
            },
            recipient: {
              label: {
                en: "Recipient:",
                uk: "Отримувач:",
              },
              notSpecified: {
                en: "Last name and first name not specified",
                uk: "Не вказано прізвище та ім'я",
              },
            },
            phoneNumber: {
              label: {
                en: "Phone number:",
                uk: "Номер телефону:",
              },
              notSpecified: {
                en: "Phone number not specified",
                uk: "Не вказано номер телефону",
              },
            },
            paymentMethod: {
              label: {
                en: "Payment method:",
                uk: "Спосіб оплати:",
              },
              values: {
                cod: {
                  en: "Cash on Delivery",
                  uk: "Накладений платіж",
                },
                card: {
                  en: "Bank Card",
                  uk: "Банківською карткою",
                },
              },
              notSpecified: {
                en: "Payment method not selected",
                uk: "Не обрано спосіб оплати",
              },
            },
          },
        },
        step5: {
          title: {
            en: "Payment",
            uk: "Оплата",
          },
          notice: {
            title: {
              en: "Payment system under development 🚀",
              uk: "Платіжна система в розробці 🚀",
            },
            subtitle: {  
              en: "Beta testing is currently underway. We are actively working on adding a payment system. A little patience—and everything will be ready! Thank you for your understanding!",
              uk: "Зараз триває бета-тестування. Ми активно працюємо над додаванням платіжної системи. Трішки терпіння — і все буде готово! Дякуємо за розуміння!",
            },
          },
        },
      },
      buttons: {
        back: {
          en: "Back",
          uk: "Назад",
        },
        continue: {
          en: "Continue",
          uk: "Продовжити",
        },
        confirm: {
          en: "Confirm",
          uk: "Підтвердити",
        },
        complete: {
          en: "Complete",
          uk: "Завершити",
        },
        return: {
          en: "Return",
          uk: "Повернутись",
        },
      },
      messages: {
        success: {
          title: {
            en: "Your order has been placed ✅",
            uk: "Ваше замовлення оформлено ✅",
          },
          subtitle: {
            en: "Await a message with delivery details.\n Thank you for choosing us!",
            uk: "Очікуйте на повідомлення з деталями доставки.\n Дякуємо, що обрали нас!",
          },
        },
        error: {
          title: {
            en: "Error ❌",
            uk: "Помилка ❌",
          },
          subtitle: {
            en: "Please try again later",
            uk: "Будь ласка, спробуйте ще раз пізніше",
          },
        },
      },
    },

    editProfile: {
      header: {
        title: {
          firstName: {
            en: "Change First Name",
            uk: "Зміна імені",
          },
          lastName: {
            en: "Change Last Name",
            uk: "Зміна прізвища",          
          },
        },
      },
      fields: {
        firstName: {
          label: {
            en: "New first name",
            uk: "Нове ім'я",
          },
          placeholder: {
            en: "Enter your new first name",
            uk: "Введіть нове ім'я",
          },
        },
        lastName: {
          label: {
            en: "New last name",
            uk: "Нове прізвище",
          },
          placeholder: {
            en: "Enter your last name",
            uk: "Введіть нове прізвище",
          },
        },
      },
      buttons: {
        save: {
          en: "Save",
          uk: "Зберегти",
        },
      },
      alerts: {
        profileUpdate: {
          responses: {
            success: {
              title: {
                en: "Success",
                uk: "Успішно",
              },
              message: {
                en: "Profile has been updated",
                uk: "Профіль оновлено",
              },
            },
            error: {
              title: {
                en: "Error",
                uk: "Помилка",
              },
              message: {
                en: "Failed to update the profile",
                uk: "Не вдалося оновити профіль",
              },
            },
          },
        },
      },
    },

    orderStatus: {
      header: {
        title: {
          en: "Order status",
          uk: "Статус замовлення",
        },
      },
    },

    orderReceipt: {
      header: {
        title: {
          en: "Your receipt",
          uk: "Ваша квитанція",
        },
      },
      notice: {
        title: {
          en: "❗Please note",
          uk: "❗Зверніть увагу"
        },
        subtitle: {
          en: "In accordance with the Law of Ukraine \"On protecting the functioning of the Ukrainian language as the state language\", the receipt is issued in Ukrainian.",
          uk: "Відповідно до Закону України \"Про забезпечення функціонування української мови як державної\", квитанція видається українською мовою.",
        }
      },  
    },

    editOrder: {
      header: {
        title: {
          en: "Change Status",
          uk: "Зміна статусу",
        },
      },
      fields: {
        status: {
          label: {
            en: "New status",
            uk: "Новий статус",
          },
          option: {
            en: "Select new status",
            uk: "Виберіть новий статус",
          },
        },
      },
      buttons: {
        save: {
          en: "Save",
          uk: "Зберегти",
        },
      },
      alerts: {
        statusUpdate: {
          responses: {
            success: {
              title: {
                en: "Success",
                uk: "Успішно",
              },
              message: {
                en: "Status has been updated",
                uk: "Статус оновлено",
              },
            },
            error: {
              title: {
                en: "Error",
                uk: "Помилка",
              },
              message: {
                en: "Failed to update the status",
                uk: "Не вдалося оновити статус",
              },
            },
          },
        },
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

  components: {
    bookItem: {
      labels: {
        quantity: {
          en: "Quantity",
          uk: "Кількість",
        },
        availability: {
          available: {
            en: "Available",
            uk: "В наявності",
          },
          unavailable: {
            en: "Not Available",
            uk: "Відсутні",
          },
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
      },
      buttons: {
        details: {
          en: "Details",
          uk: "Деталі",
        },
      },
    },

    favoriteBookItem: {
      buttons: {
        favorite: {
          en: "Favorite",
          uk: "Обране",
        },
      },
    },

    orderItem: {
      labels: {
        quantity: {
          en: "Number of books",
          uk: "Кількість книг",
        },
        cost: {
          en: "Cost",
          uk: "Вартість",
        },
        date: {
          en: "Creation date",
          uk: "Дата створення",
        },
      },
      actions: {
        edit: {
          en: "Edit",
          uk: "Змінити",
        },
      },
    },
  },

  common: {
    parameters: {
      id: {
        label: {
          en: "ID",
          uk: "ID",
        },
      },
      title: {
        label: {
          en: "Title",
          uk: "Назва",
        },
        placeholder: {
          en: "Enter title",
          uk: "Введіть назву",
        },
        editedLabel: {
          en: "New title",
          uk: "Нова назва",
        },
        editedPlaceholder: {
          en: "Enter new title",
          uk: "Введіть нову назву",
        },
      },
      authors: {
        label: {
          en: "Authors",
          uk: "Автори",
        },
        placeholder: {
          en: "Enter authors separated by commas",
          uk: "Введіть авторів, розділяючи комами",
        },
        editedLabel: {
          en: "New authors",
          uk: "Нові автори",
        },
        editedPlaceholder: {
          en: "Enter new authors separated by commas",
          uk: "Введіть нових авторів, розділяючи комами",
        },
      },
      rates: {
        label: {
          en: "Cost",
          uk: "Вартість",
        },
      },
      manual: {
        checkboxLabel: {
          en: "Manual price entry",
          uk: "Ручне введення",
        },
      },
      originalPrice: {
        label: {
          en: "Original price",
          uk: "Початкова ціна",
        },
        placeholder: {
          en: "Enter original price",
          uk: "Введіть початкову ціну",
        },
        editedLabel: {
          en: "New original price",
          uk: "Нова початкова ціна",
        },
        editedPlaceholder: {
          en: "Enter new original price",
          uk: "Введіть нову початкову ціну",
        },
      },
      discount: {
        label: {
          en: "Percents",
          uk: "Відсотки",
        },
        placeholder: {
          en: "Enter percents",
          uk: "Введіть відсотки",
        },
        editedLabel: {
          en: "New percents",
          uk: "Нові відсотки",
        },
        editedPlaceholder: {
          en: "Enter new percents",
          uk: "Введіть нові відсотки",
        },
      },
      price: {
        label: {
          en: "Price",
          uk: "Ціна",
        },
        placeholder: {
          en: "Enter price",
          uk: "Введіть ціну",
        },
        editedLabel: {
          en: "New price",
          uk: "Нова ціна",
        },
        editedPlaceholder: {
          en: "Enter new price",
          uk: "Введіть нову ціну",
        },
      },
      images: {
        label: {
          en: "Images",
          uk: "Зображення",
        },
      },
      coverImage: {
        label: {
          en: "Cover Image",
          uk: "Обкладинка",
        },
        editedLabel: {
          en: "New Cover Image",
          uk: "Нова обкладинка",
        },
        prompt: {
          en: "Tap to select cover image",
          uk: "Натисніть, щоб вибрати обкладинку",
        },
        alerts: {
          denied: {
            title: {
              en: "Permission denied",
              uk: "Дозвіл відхилено",
            },
            subtitle: {
              en: "We need camera roll permissions to select images",
              uk: "Нам потрібні дозволи на доступ до галереї для вибору зображень",
            },
          },
        },
      },
      additionalImages: {
        label: {
          en: "Additional Images",
          uk: "Додаткові зображення",
        },
        editedLabel: {
          en: "New Additional Images",
          uk: "Нові додаткові зображення",
        },
        prompt: {
          en: "Tap to add image",
          uk: "Натисніть, щоб додати зображення",
        },
      },
      backgroundColor: {
        label: {
          en: "Background color",
          uk: "Колір фону",
        },
        editedLabel: {
          en: "New background color",
          uk: "Новий колір фону",
        },
      },
      description: {
        label: {
          en: "Description",
          uk: "Опис",
        },
        placeholder: {
          en: "Enter description",
          uk: "Введіть опис",
        },
        editedLabel: {
          en: "New description",
          uk: "Новий опис",
        },
        editedPlaceholder: {
          en: "Enter new description",
          uk: "Введіть новий опис",
        },
      },
      genres: {
        label: {
          en: "Genres",
          uk: "Жанри",
        },
        editedLabel: {
          en: "New genres",
          uk: "Нові жанри",
        },
        option: {
          en: "Select genres",
          uk: "Виберіть жанри",
        },
        editedOption: {
          en: "Select new genres",
          uk: "Виберіть нові жанри",
        },
      },
      language: {
        label: {
          en: "Language",
          uk: "Мова",
        },
        editedLabel: {
          en: "New language",
          uk: "Нова мова",
        },
        option: {
          en: "Select language",
          uk: "Виберіть мову",
        },
        editedOption: {
          en: "Select new language",
          uk: "Виберіть нову мову",
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
        editedLabel: {
          en: "New publisher",
          uk: "Новий видавець",
        },
        editedPlaceholder: {
          en: "Enter new publisher",
          uk: "Введіть нового видавця",
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
        editedLabel: {
          en: "New publication year",
          uk: "Новий рік публікації",
        },
        editedPlaceholder: {
          en: "Enter new publication year",
          uk: "Введіть новий рік публікації",
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
        editedLabel: {
          en: "New ISBN",
          uk: "Новий ISBN",
        },
        editedPlaceholder: {
          en: "Enter new ISBN",
          uk: "Введіть новий ISBN",
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
        editedLabel: {
          en: "New page count",
          uk: "Нова кількість сторінок",
        },
        editedPlaceholder: {
          en: "Enter new page count",
          uk: "Введіть нову кількість сторінок",
        },
      },
      coverType: {
        label: {
          en: "Cover type",
          uk: "Тип обкладинки",
        },
        editedLabel: {
          en: "New cover type",
          uk: "Новий тип обкладинки",
        },
        option: {
          en: "Select cover type",
          uk: "Виберіть тип обкладинки",
        },
        editedOption: {
          en: "Select new type of cover",
          uk: "Виберіть новий тип обкладинки",
        },
      },
      bookType: {
        label: {
          en: "Book type",
          uk: "Тип книжки",
        },
        editedLabel: {
          en: "New book type",
          uk: "Новий тип книги",
        },
        option: {
          en: "Select book type",
          uk: "Виберіть тип книги",
        },
        editedOption: {
          en: "Select new book type",
          uk: "Виберіть новий тип книги",
        },
      },
      paperType: {
        label: {
          en: "Paper type",
          uk: "Тип паперу",
        },
        editedLabel: {
          en: "New paper type",
          uk: "Новий тип паперу",
        },
        option: {
          en: "Select paper type",
          uk: "Виберіть тип паперу",
        },
        editedOption: {
          en: "Select new paper type",
          uk: "Виберіть новий тип паперу",
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
        editedLabel: {
          en: "New size",
          uk: "Новий розмір",
        },
        editedPlaceholder: {
          en: "Enter new size",
          uk: "Введіть новий розмір",
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
        editedLabel: {
          en: "New weight",
          uk: "Нова вага",
        },
        editedPlaceholder: {
          en: "Enter new weight",
          uk: "Введіть нову вагу",
        },
      },
      illustrations: {
        label: {
          en: "Illustrations",
          uk: "Ілюстрації",
        },
        checkboxLabel: {
          en: "Does the book contain illustrations?",
          uk: "Чи містить книга ілюстрації?",
        },
        values: {
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
      availableQuantity: {
        label: {
          en: "Quantity",
          uk: "Кількість",
        },
        placeholder: {
          en: "Enter quantity",
          uk: "Введіть кількість",
        },
        editedLabel: {
          en: "New quantity",
          uk: "Нова кількість",
        },
        editedPlaceholder: {
          en: "Enter new quantity",
          uk: "Введіть нову кількість",
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
        editedLabel: {
          en: "New article",
          uk: "Новий артикул",
        },
        editedPlaceholder: {
          en: "Enter new article",
          uk: "Введіть новий артикул",
        },
      },
      createdAt: {
        label: {
          en: "Creation date",
          uk: "Дата створення",
        },
      },
      updatedAt: {
        label: {
          en: "Update date",
          uk: "Дата оновлення",
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

    orderStatus: {
      processing: {
        title: {
          en: "Processing",
          uk: "Обробка",
        },
        subtitle: {
          en: "Your order is being prepared for shipment",
          uk: "Ваше замовлення готується до відправки",
        },
      },
      shipped: {
        title: {
          en: "Shipped",
          uk: "Відправлено",
        },
        subtitle: {
          en: "Your order has been shipped",
          uk: "Ваше замовлення відправлено",
        },
      },
      delivered: {
        title: {
          en: "Delivered",
          uk: "Доставлено",
        },
        subtitle: {
          en: "Your order has been delivered",
          uk: "Ваше замовлення доставлено",
        },
      },
      received: {
        title: {
          en: "Received",
          uk: "Отримано",
        },
        subtitle: {
          en: "Your order receipt has been confirmed",
          uk: "Отримання замовлення підтверджено",
        },
      },
    },

    buttons: {
      errorWithRetry: {
        en: "Retry",
        uk: "Спробувати ще раз",
      },
    },

    alerts: {
      noNetwork: {
        title: {
          en: "Error",
          uk: "Помилка",
        },
        message: {
          en: "No internet connection. Please check your network and try again",
          uk: "Немає підключення до Інтернету. Будь ласка, перевірте мережу та спробуйте ще раз",
        },
      },
    },

    messages: {
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
      failedLoad: {
        title: {
          en: "Failed to load data",
          uk: "Не вдалося завантажити дані",
        },          
        subtitle: {
          en: "Try again in a few moments",
          uk: "Спробуйте ще раз за кілька хвилин",
        },
      },
      errorWithRetry: {
        title: {
          en: "An error occurred",
          uk: "Виникла помилка",
        },
        subtitle: {
          en: "Something went wrong. Please try again",
          uk: "Щось пішло не так. Спробуйте ще раз",
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
        orderNotFoundAfterUpdate: {
          en: "Order not found after update",
          uk: "Замовлення не знайдено після оновлення"
        },
      },
    },
  },
};

export default translations;
