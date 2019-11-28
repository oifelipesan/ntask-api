const jwt = require('jwt-simple')

describe('Routes: Users', () => {
  const { User } = require('../../app/models')
  const { jwtSecret } = require('../../config')

  let token

  beforeEach(done => {
    User.destroy({ where: {} })
      .then(() =>
        User.create({
          name: 'John',
          email: 'john@mail.net',
          password: '123456'
        })
      )
      .then(user => {
        token = jwt.encode({ id: user.id }, jwtSecret)
        done()
      })
  })

  describe('GET /users', () => {
    describe('status 200', () => {
      it('returns an authenticate user', done => {
        request
          .get('/users')
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('John')
            expect(res.body.email).to.eql('john@mail.net')
            done(err)
          })
      })
    })

    describe('status 401', () => {
      it('throws error when user not is authenticated', done => {
        request
          .get('/users')
          .expect(401)
          .end((err, res) => done(err))
      })
    })
  })

  describe('POST /users', () => {
    describe('status 200', () => {
      it('creates a new user', done => {
        request
          .post('/users/register')
          .send({
            name: 'Mary',
            email: 'mary@mail.net',
            password: '12345'
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body.name).to.eql('Mary')
            expect(res.body.email).to.eql('mary@mail.net')
            done(err)
          })
      })
    })

    describe('status 400', () => {
      it('throws error when name is invalid', done => {
        request
          .post('/users/register')
          .send({
            name: 'Mary!',
            email: 'mary@mail.net',
            password: '12345'
          })
          .expect(400)
          .end((err, res) => done(err))
      })

      it('throws error when name is blank', done => {
        request
          .post('/users/register')
          .send({
            name: '',
            email: 'mary@mail.net',
            password: '12345'
          })
          .expect(400)
          .end((err, res) => done(err))
      })

      it('throws error when email is blank', done => {
        request
          .post('/users/register')
          .send({
            name: 'Mary',
            email: '',
            password: '12345'
          })
          .expect(400)
          .end((err, res) => done(err))
      })

      it('throws error when password is blank', done => {
        request
          .post('/users/register')
          .send({
            name: 'Mary',
            email: 'mary@mail.net',
            password: ''
          })
          .expect(400)
          .end((err, res) => done(err))
      })

      it('throws error when is invalid email format', done => {
        request
          .post('/users/register')
          .send({
            name: 'Mary',
            email: 'mary.mail.net',
            password: '12345'
          })
          .expect(400)
          .end((err, res) => done(err))
      })

      it('throws error when email already registered', done => {
        request
          .post('/users/register')
          .send({
            name: 'Mary',
            email: 'mary@mail.net',
            password: '12345'
          })
          .end((err, res) => {
            const { email } = res.body
            if (User.findOne({ where: { email } })) done(err)
          })
      })
    })
  })

  describe('PUT /users', () => {
    describe('status 200', () => {
      it('updates an  authenticated user', done => {
        request
          .put('/users')
          .set('Authorization', `bearer ${token}`)
          .send({ email: 'john@mail.com' })
          .expect(200)
          .end((err, res) => done(err))
      })
    })

    describe('status 401', () => {
      it('throws error when user not is authenticated', done => {
        request
          .put('/users')
          .expect(401)
          .end((err, res) => done(err))
      })
    })
  })

  describe('DELETE /users', () => {
    describe('status 200', () => {
      it('deletes an authenticated user', done => {
        request
          .delete('/users')
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .end((err, res) => done(err))
      })
    })

    describe('status 401', () => {
      it('throws error when user not is authenticated', done => {
        request
          .delete('/users')
          .expect(401)
          .end((err, res) => done(err))
      })
    })
  })
})
