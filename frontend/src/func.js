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
      default:
        title = action;
        break;
    }
    return title;
  }
  