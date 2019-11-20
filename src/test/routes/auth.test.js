describe('Router: Auth', () => {
  const { User } = require('../../app/models')
  describe('Post /auth', () => {
    beforeEach(done => {
      User.destroy({ where: {} }).then(() =>
        User.create({
          name: 'John',
          email: 'john@mail.net',
          password: '123456'
        }).then(() => done())
      )
    })
    describe('status 200', () => {
      it('returns authenticated user token', done => {
        request
          .post('/auth')
          .send({
            email: 'john@mail.net',
            password: '123456'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys('token')
            done(err)
          })
      })
    })
    describe('status 404', () => {
      it('throws error when user not exist', done => {
        request
          .post('/auth')
          .send({
            email: 'email_errado@mail.net',
            password: '123456'
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body).to.include.keys('error')
            done(err)
          })
      })
    })
    describe('status 401', () => {
      it('throws error when password is incorrect', done => {
        request
          .post('/auth')
          .send({
            email: 'john@mail.net',
            password: 'senha_errada'
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.include.keys('error')
            done(err)
          })
      })
    })
    describe('status 400', () => {
      it('throws error when email and password are blank', done => {
        request
          .post('/auth')
          .expect(400)
          .end((err, res) => done(err))
      })
    })
  })
})
