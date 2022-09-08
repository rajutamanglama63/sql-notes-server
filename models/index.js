const Note = require("./Note");
const User = require("./User");

Note.sync();
User.sync();

module.exports = {
  Note,
  User,
};
