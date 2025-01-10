const { ERROR_MESSAGES } = require("./errorMessages");

const validateRequestBody = (req, res, next) => {
  const { title, date } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }
  

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ error: ERROR_MESSAGES.INVALID_DATE_FORMAT });
  }

  req.body.date = parsedDate;
  next();
};

module.exports = { validateRequestBody };
