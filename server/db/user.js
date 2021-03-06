const conn = require('./connection')
const hash = require('../auth/hash')

function getUsers(testDb) {
  const db = testDb || conn
  return db('users').select()
}

function getUser(id, testDb) {
  const db = testDb || conn
  return db('users').select().where({id}).first()
}

function getAuthUsers(testDb) {
  const db = testDb || conn
  return db('userAuth').select()
}

function createUser(newUser, testDb) {
  return new Promise(function(resolve, reject) {
    const db = testDb || conn
    const {username, password} = newUser

    hash.generate(password, (err, hash) => {
      let authInfo = {
        password: hash,
        username,
      }
      delete newUser.password
      return db('users')
      .insert(newUser)
      .then((id) => {
        return db('userAuth')
        .insert(authInfo)
        .then(() => getUser(id[0]))
        .then(user => resolve(user))
      })
    })

  });
}

function userExists (username, testDb) {
  const db = testDb || conn
  return db('users')
    .where('username', username)
    .first()
}

function getUserByName (username, testDb) {
  const db = testDb || conn
  return db('userAuth').select()
  .where('username', username).first()
}


function updateUser(id, updatedInfo, testDb) {
  const db = testDb || conn
  return db('users')
  .where('id', id)
  .update(updatedInfo)
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  getAuthUsers,
  updateUser,
  userExists,
  getUserByName
}
