export const formatDate = (date) => {
    date = new Date(date);
    let m = String(date.getMonth() + 1).padStart(2, "0"); // month with leading zero
    let d = String(date.getDate()).padStart(2, "0"); // day with leading zero
    let y = date.getFullYear(); // year
    return `${y}-${m}-${d}`;
  };

export const formatDateFull = (date) => {
    date = new Date(date);
    let m = String(date.getMonth() + 1).padStart(2, "0"); // month with leading zero
    let d = String(date.getDate()).padStart(2, "0"); // day with leading zero
    let y = date.getFullYear(); // year
    let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // formatted time
    return `${y}-${m}-${d}  ${time}`;
  };
export const isDateCurrOrFutureMonth = (date) => {
    date = new Date(date);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
  
    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth();
  
    if (dateYear > currentYear) {
      return true; // Date is in a future year
    } else if (dateYear === currentYear && dateMonth >= currentMonth) {
      return true; // Date is in the current year and a current or future month
    } else {
      return false; // Date is in the past month or an earlier year
    }
  }
export const getActionTitle = (action) => {
    var title;
    switch (action) {
      case "login":
        title = "Prisijungimas";
        break;
      case "register":
        title = "Registracija";
        break;
      case "category_add":
        title = "Sukurta kategorija";
        break;
      case "category_edit":
        title = "Kategorijos redagavimas";
        break;
      case "category_delete":
        title = "Kategorijos trynimas";
        break;
      case "user_updateRole":
        title = "Rolės atnaujinimas";
        break;
      case "user_edit":
        title = "Vartotojo redagavimas";
        break;
      case "user_delete":
        title = "Vartotojo trynimas";
        break;
      case "income_add":
        title = "Pajamų pridėjimas";
        break;
      case "income_edit":
        title = "Pajamų redagavimas";
        break;
      case "income_delete":
        title = "Pajamų trynimas";
        break;
      case "expense_add":
        title = "Išlaidų pridėjimas";
        break;
      case "expense_edit":
        title = "Išlaidų redagavimas";
        break;
      case "expense_delete":
        title = "Išlaidų trynimas";
        break;
      case "limit_edit":
        title = "Limito redagavimas";
        break;
      default:
        title = action;
        break;
    }
    return title;
  }
  export const getPageNumbers = (totalPages, currentPage) => {
    let pages = [];
  
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 6) {
        if(totalPages == 8){
          pages = [1, 2, 3, 4,5,6,7, totalPages];
        }else{
          pages = [1, 2, 3, 4,5,6,7, "...", totalPages];
        }
      }
       else if (currentPage > 6 && currentPage < totalPages - 3) {
        pages = [
          1,
          "...",
          // currentPage -3,
          // currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          // totalPages - 6,
          // totalPages - 5,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }
    }
  
    return pages;
  };