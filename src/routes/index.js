const express = require('express')
const router = express.Router()

/**
 * @apiName Root
 * @api {get} / API Status
 * @apiDescription Mostra uma mensagem de status na raiz do sistema, quando o servidor está no ar.
 * @apiVersion 1.0.0
 * @apiGroup Status
 *
 * @apiSuccess {string} status Mensagem de status da API
 * @apiSuccessExample {json} Sucesso
 *   HTTP/1.1 200 OK
 *   {"status": "Ntask API"}
 */

router.get('/', (req, res) => {
  return res.status(200).json({ status: 'Ntask API' })
})

module.exports = router
