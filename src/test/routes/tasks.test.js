const jwt = require('jwt-simple')

describe('Routes: Tasks', () => {
  const { User, Task } = require('../../app/models')
  const { jwtSecret } = require('../../config')

  let token
  let fakeTask
  let userId

  beforeEach(done => {
    User.destroy({ where: {} })
      .then(() =>
        User.create({
          name: 'John',
          email: 'john@email.net',
          password: '123456'
        })
      )
      .then(user => {
        userId = user.id
        Task.destroy({ where: {} })
          .then(() =>
            Task.bulkCreate([
              {
                id: 1,
                title: 'Work',
                UserId: user.id
              },
              {
                id: 2,
                title: 'Study',
                UserId: user.id
              }
            ])
          )
          .then(tasks => {
            fakeTask = tasks[0]
            token = jwt.encode({ id: user.id }, jwtSecret)
            done()
          })
      })
  })
  describe('GET /tasks', () => {
    describe('status 200', () => {
      it('returns a list of tasks', done => {
        request
          .get('/tasks')
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2)
            expect(res.body[0].title).to.eql('Work')
            expect(res.body[1].title).to.eql('Study')
            done(err)
          })
      })
    })
  })

  describe('POST /tasks/', () => {
    describe('status 200', () => {
      it('creates a new task', done => {
        request
          .post('/tasks/register')
          .set('Authorization', `bearer ${token}`)
          .send({ title: 'Run', UserId: `${userId}` })
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Run')
            done(err)
          })
      })
    })

    describe('status 400', () => {
      it('throws error when title are blank', done => {
        request
          .post('/tasks/register')
          .set('Authorization', `bearer ${token}`)
          .send({ title: '', UserId: `${userId}` })
          .expect(400)
          .end((err, res) => {
            done(err)
          })
      })

      it('throws error when title not numbers or letters', done => {
        request
          .post('/tasks/register')
          .set('Authorization', `bearer ${token}`)
          .send({ title: '!@é', UserId: `${userId}` })
          .expect(400)
          .end((err, res) => {
            done(err)
          })
      })
    })
  })

  describe('GET /tasks/:id', () => {
    describe('status 200', () => {
      it('returns one task', done => {
        request
          .get(`/tasks/${fakeTask.id}`)
          .set('Authorization', `bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Work')
            done(err)
          })
      })
    })

    describe('status 404', () => {
      it('throws error when task not exist', done => {
        request
          .get('/tasks/0')
          .set('Authorization', `bearer ${token}`)
          .expect(404)
          .end((err, res) => {
            done(err)
          })
      })
    })
  })

  describe('PUT /tasks/:id', () => {
    describe('status 200', () => {
      it('updates a task', done => {
        request
          .put(`/tasks/${fakeTask.id}`)
          .set('Authorization', `bearer ${token}`)
          .send({ title: 'Travel', done: true, UserId: `${userId}` })
          .expect(200)
          .end((err, res) => done(err))
      })
    })

    describe('status 400', () => {
      it('throws error when task not found', done => {
        request
          .put('/tasks/0')
          .set('Authorization', `bearer ${token}`)
          .send({ title: 'Travel', done: true, UserId: `${userId}` })
          .expect(400)
          .end((err, res) => done(err))
      })
    })
  })

  describe('DELETE /tasks/:id', () => {
    describe('status 200', () => {
      it('removes a task', done => {
        request
          .delete(`/tasks/${fakeTask.id}`)
          .set('Authorization', `bearer ${token}`)
          .send({ UserId: `${userId}` })
          .expect(200)
          .end((err, res) => done(err))
      })
    })

    describe('status 400', () => {
      it('throws error when task not found', done => {
        request
          .delete('/tasks/0')
          .set('Authorization', `bearer ${token}`)
          .send({ UserId: `${userId}` })
          .expect(400)
          .end((err, res) => done(err))
      })
    })
  })
})
