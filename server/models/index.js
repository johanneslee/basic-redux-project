import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configFactory from '../config/config';
const env = process.env.NODE_ENV || "development";
const config = configFactory[env];
const sequelize = new Sequelize("mysql://b0fbbd0580f94e:d7df589b@us-cdbr-iron-east-05.cleardb.net/heroku_f55f228bd4e98f2?reconnect=true");
const db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
