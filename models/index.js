const Note = require("./Note");
const User = require("./User")

User.hasMany(Note)
Note.belongsTo(User)
Note.sync({ alter: true })
User.sync({ alter: true })


module.exports = {
  Note,
  User,
};
