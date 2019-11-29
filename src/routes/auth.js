const express = require('express')
const authController = require('../app/controllers/authController')

const router = express.Router()

/**
 * @api {post} /auth Token
 * @apiName Autenticacao
 * @apiDescription Realiza a autenticação do usuário, retornando um token.
 * @apiVersion 1.0.0
 * @apiGroup Credencial
 *
 * @apiParam {string} email Email de usuário
 * @apiParam {string} password Senha de usuário
 * @apiParamExample {json} Entrada
 *  {
 *    "email": "john@mail.net"
 *    "password": "123456"
 *  }
 *
 * @apiSuccess {string} token Token de usuário autenticado
 * @apiSuccessExample {json} Sucesso
 *  HTTP/1.1 200 OK
 *  {"token": "xyz.abc.123.hgf"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Erro de autenticação
 *  HTTP/1.1 401 Unauthorized
 *  {"error": "Password invalid"}
 *
 * @apiError {string} error Mensagem de usuário
 * @apiErrorExample {json} Usuario não encontrado
 *  HTTP/1.1 404 Not Found
 *  {"error": "User not fould"}
 *
 * @apiError {string} error Mensagem de campo vazio
 * @apiErrorExample {json} Email e Senha obrigatórios
 *  HTTP/1.1 400 Bad Request
 *  {"error": "Email and Password required"}
 */

router.post('/', authController.auth)

module.exports = router
