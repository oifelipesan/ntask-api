const express = require('express')
const userController = require('../app/controllers/userController')
const auth = require('../app/middlewares/auth')

const router = express.Router()

/**
 * @apiName Show User
 * @api {get} /users Exibe usuário
 * @apiDescription Exibe os dados do usuário autenticado, incluindo as tarefas.
 * @apiVersion 1.0.0
 * @apiGroup Usuario
 *
 * @apiHeader {string} Authorization Token de usuário
 * @apiHeaderExample {json} Header
 *  {"Authorization": "bearer xyz.abc.123.hgf"}
 *
 * @apiSuccess {number} id Id de registro
 * @apiSuccess {string} name Nome do usuário
 * @apiSuccess {string} email Email do usuário
 * @apiSuccess {date} createdAt Data de criação
 * @apiSuccess {date} updatedAt Data de atualização
 * @apiSuccess {array} tasks Tarefas do usuário
 * @apiSuccessExample {json} Sucesso
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "name": "John Connor",
 *    "email": "john@connor.net",
 *    "createdAt": "2019-11-28T17:17:57.989Z",
 *    "updatedAt": "2019-11-28T17:17:57.989Z",
 *    "tasks": [
 *       {
 *          "id": 1,
 *          "title": "Work",
 *          "done": false,
 *          "createdAt": "2019-11-28T18:58:50.099Z",
 *          "updatedAt": "2019-11-28T18:58:50.099Z"
 *        },
 *        {
 *          "id": 2,
 *          "title": "Study",
 *          "done": false,
 *          "createdAt": "2019-11-28T18:59:01.215Z",
 *          "updatedAt": "2019-11-28T18:59:01.215Z"
 *        }
 *    ]
 *  }
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Erro de autenticação
 *  HTTP/1.1 401 Unauthorized
 *  {"error": "Please login to access system!"}
 */

router.get('/', auth.authenticate, userController.index)

/**
 * @apiName Store User
 * @api {post} /user/register Cadastra usuário
 * @apiDescription Cadastra um novo usuário.
 * @apiVersion 1.0.0
 * @apiGroup Usuario
 *
 * @apiParam {string} name Nome do usuário
 * @apiParam {string} email Email do usuário
 * @apiParam {string} password Senha do usuário
 * @apiParamExample {json} Entrada
 *  {
 *    "name": "John Connor",
 *    "email": "john@connor.net",
 *    "password": "123456"
 *  }
 *
 * @apiSuccess {number} id Id de registro
 * @apiSuccess {string} name Nome do usuário
 * @apiSuccess {string} email Email do usuário
 * @apiSuccess {date} createdAt Data de criação
 * @apiSuccess {date} updatedAt Data de atualização
 * @apiSuccess {string} token Token de autenticação
 * @apiSuccessExample {json} Sucesso
 *  HTML/1.1 200 OK
 *  {
 *    "id": 1,
 *    "name": "John Connor",
 *    "email": "john@connor.net",
 *    "createdAt": "2019-11-28T20:36:39.921Z",
 *    "updatedAt": "2019-11-28T20:36:39.921Z",
 *    "token": "xyz.abc.123.hgf"
 *  }
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Nome inválido
 *  Entrada
 *  {
 *    "name": "J0hn !Connor"
 *  }
 *
 *  HTTP/1.1 400 Bad Request
 *  {"error": "Please enter a valid name"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Nome em branco
 *  Entrada
 *  {
 *    "name": ""
 *  }
 *
 *  HTTP/1.1 400 Bad Request
 *  {"error": "Please enter a valid name"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Email em branco
 *  Entrada
 *  {
 *    "email": ""
 *  }
 *
 *  HTTP/1.1 400 Bad Request
 *  {"error": "Email is requerid"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Senha em branco
 *  Entrada
 *  {
 *    "password": ""
 *  }
 *
 *  HTTP/1.1 400 Bad Request
 *  {"error": "Password is requerid"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Formato de email inválido
 *  Entrada
 *  {
 *    "email": "john@connor"
 *  }
 *
 *  HTTP/1.1 400 Bad Request
 *  {"error": "Invalid email format"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Email já cadastrado
 *  HTTP/1.1 400 Bad Request
 *  {"error": "E-mail already registered"}
 *
 */
router.post('/register', userController.store)

/**
 * @apiName Update User
 * @api {put} /users Atualiza usuário
 * @apiDescription Atualiza os dados do usuário autenticado.
 * @apiVersion 1.0.0
 * @apiGroup Usuario
 *
 * @apiHeader {string} Authorization Token de usuário
 * @apiHeaderExample {json} Header
 *  {"Authorization": "bearer xyz.abc.123.hgf"}
 *
 * @apiParam {string} name Nome do usuário
 * @apiParam {string} email Email do usuário
 * @apiParam {string} password Senha do usuário
 * @apiParamExample {json} Entrada
 *  {
 *    "name": "John Conner"
 *  }
 *
 * @apiSuccess {number} id Id de registro
 * @apiSuccess {string} name Nome do usuário
 * @apiSuccess {string} email Email do usuário
 * @apiSuccess {date} createdAt Data de criação
 * @apiSuccess {date} updatedAt Data de atualização
 * @apiSuccessExample {json} Sucesso
 *  HTML/1.1 200 OK
 *  {
 *    "id": 1,
 *    "name": "John Conner",
 *    "email": "john@connor.net",
 *    "createdAt": "2019-11-28T20:36:39.921Z",
 *    "updatedAt": "2019-11-28T21:36:39.921Z",
 *  }
 */
router.put('/', auth.authenticate, userController.update)

/**
 * @apiName Destroy User
 * @api {delete} /users Exclui usuário
 * @apiDescription Exclui o usuário autenticado.
 * @apiVersion 1.0.0
 * @apiGroup Usuario
 *
 * @apiHeader {string} Authorization Token de usuário
 * @apiHeaderExample {json} Header
 *  {"Authorization": "bearer xyz.abc.123.hgf"}
 *
 * @apiSuccess {string} msg Mensagem de sucesso
 * @apiSuccessExample {json} Sucesso
 *  HTML/1.1 200 OK
 *  {"msg": "User is removed"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Erro de autenticação
 *  HTTP/1.1 401 Unauthorized
 *  {"error": "Please login to access system!"}
 */
router.delete('/', auth.authenticate, userController.destroy)

module.exports = router
