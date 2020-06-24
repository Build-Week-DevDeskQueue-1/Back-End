const request = require('supertest')
const db = require('./data/dbConfig')
const server = require('./server')

describe('index.js', () => {

  describe('/auth', () => {
    
    beforeAll(async () => {
      await db('users').truncate()
    })

    it('missing username or password failure', async () => {
      const response = await request(server).post('/auth/register')
      .send({ username: "test1" })
      expect(response.text).toBe("Missing username or password")
    })

    describe('/register', () => {

      it('success', async () => {
        const response = await request(server).post('/auth/register')
        .send({ username: "test1", password: "test1" })
        expect(response.text).toBe("Registered Successfully")
      })
    })
  
    describe('/login', () => {

      beforeAll(async () => {
        return await request(server).post('/auth/register')
        .send({ username: "test4", password: "test4" })
      })

      it('success', async () => {
        const response = await request(server).post('/auth/login')
        .send({ username: "test4", password: "test4" })
        expect(response.text).toBe("Logged in")
      })
  
      it('wrong password failure', async () => {
        const response = await request(server).post('/auth/login')
        .send({ username: "test4", password: "test3" })
        expect(response.text).toBe("Invalid credentials")
      })
  
      it('no account failure', async () => {
        const response = await request(server).post('/auth/login')
        .send({ username: "asdasdasd3", password: "test4" })
        expect(response.text).toBe("Account doesn't exist")
      })
    })
  })
})