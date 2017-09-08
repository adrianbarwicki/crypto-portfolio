const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

var sequelize = new Sequelize('bitcoin', process.env.VQ_DB_USER, process.env.VQ_DB_PW, {
  host: process.env.VQ_DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var db = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
/**
Object.keys(db).forEach(modelName => {
    console.log(db)
  if ("associate" in db[modelName]) {
    
    db[modelName].associate(db);
  }
});
 */
db.assetPosition.belongsTo(db.priceTicker);
db.priceTicker.hasMany(db.assetPosition);

db.seq = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
