const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports.hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        reject(err)
      }
      resolve(hash)
    });
  });
};

module.exports.authenticate = async (userPassword, password) => {
  return new Promise(async (resolve, reject) => {
    bcrypt.compare(password, userPassword)
      .then((allow) => {
        if (!allow) {
          return reject();
        }
        return resolve();
      })
      .catch(reject);
  })
};
