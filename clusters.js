const cluster = require('cluster')
const os = require('os')

const CPUS = os.cpus()

if (cluster.isMaster) {
  CPUS.forEach(() => cluster.fork())

  cluster.on('listening', worker => {
    console.log('Cluster %d connected', worker.process.pid)
  })

  cluster.on('disconnect', worker => {
    console.log('Cluster %d disconected', worker.process.pid)
  })

  cluster.on('exit', worker => {
    console.log('Cluster %d went down', worker.process.pid)
    cluster.fork()
  })
} else {
  require('./src/server')
}
