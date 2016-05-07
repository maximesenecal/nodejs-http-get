var profile = require("./profile");

/*
 * Récupération des parametres dans la console à partir du 3e item
 * Pouv voir les deux premiers param : console.dir(process.argv)
 */
users = process.argv.slice(2);
users.forEach(profile.get);
