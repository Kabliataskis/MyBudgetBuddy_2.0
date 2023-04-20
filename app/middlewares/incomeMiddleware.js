
exports.validateIncome = (req, res, next) => {
    let selected_time = new Date(req.body.date).getTime();
    let curr_time = new Date().getTime();
    let errors = {};
    let max_sum = 9999999;
    if (!req.body.title) {
      errors.title = "Prašome užpildyti laukelį (Pavadinimas)";
    } else if (req.body.title.length > 20) {
      errors.title = "Pavadinimo ilgis iki 20 simbolių!";
    }

    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Check that the date is in the format "yyyy-mm-dd"
    if (!req.body.date) {
      errors.date = "Prašome užpildyti laukelį (Data)";
    } else if (selected_time > curr_time) {
      errors.date = "Data negali būti vėlesnė nei ši diena";
    }else if (!dateRegex.test(req.body.date)) {
      errors.date = "Neteisingas datos formatas. Pvz: 2023-04-20";
    }
  
    if (!req.body.sum) {
      errors.sum = "Prašome užpildyti laukelį (Suma)";
    } else if (req.body.sum <= 0) {
      errors.sum = "Minimali suma 0.01 €";
    } else if (req.body.sum > max_sum) {
      errors.sum = `Suma negali viršyti ${max_sum} €`;
    } else if (req.body.sum && !/^\d+(\.\d{1,2})?$/.test(req.body.sum)) {
      errors.sum = "Neteisingas formatas. Pvz: 10.21€";
    }
    !Object.keys(errors).length ? next() : res.status(500).json({status: "error", data: errors});
  };