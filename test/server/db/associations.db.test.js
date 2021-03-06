const request = require('supertest')

const env = require('../test-environment')
const Db = require('../../../server/db/associations')

// Manage the test database

let testDb = null
beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})
afterEach(() => env.cleanup(testDb))

// Tests

test('getAssociations from db returns array of associations', () => {
  return Db.getAssociations(testDb)
    .then(associations => {
    expect(associations.length).toBe(1)
    expect(associations[0].hasOwnProperty('id')).toBeTruthy()
    expect(associations[0].emotion).toBe('angry')
  })
})

test('createAssociations adds a new association to the db', () => {
  const newAssociation = {
    page_id: 2,
    emotion: 'scared',
    user_id: 3
  }
  return Db.createAssociations(newAssociation, testDb)
    .then(res => {
      expect(res[0]).toBe(2)
  })
})
