const express = require('express')
const taskController = require('../app/controllers/taskController')
const auth = require('../app/middlewares/auth')

const router = express.Router()

router.use(auth.authenticate)

/**
 * @apiName Index Tasks
 * @api {get} /tasks Lista tarefas
 * @apiDescription Lista todas as tarefas do usuário autenticado.
 * @apiVersion 1.0.0
 * @apiGroup Tarefas
 *
 * @apiHeader {string} Authorization Token de usuário
 * @apiHeaderExample {json} Header
 *  {"Authorization": "bearer xyz.abc.123.hgf"}
 *
 * @apiSuccess {object[]} tasks Lista de tarefas
 * @apiSuccess {number} tasks.id Id de registro
 * @apiSuccess {string} tasks.title Título ta tarefa
 * @apiSuccess {boolean} tasks.done Tarefa concluida?
 * @apiSuccess {date} tasks.createdAt Data de cadastro
 * @apiSuccess {date} tasks.updatedAt Data de atualização
 * @apiSuccessExample {json} Sucesso
 *  HTML/1.1 200 OK
 *  [
 *    {
 *      "id": 1,
 *      "title": "Work",
 *      "done": false,
 *      "createdAt": "2019-11-28T18:58:50.099Z",
 *      "updatedAt": "2019-11-28T18:58:50.099Z"
 *    },
 *    {
 *      "id": 2,
 *      "title": "Study",
 *      "done": false,
 *      "createdAt": "2019-11-28T18:59:01.215Z",
 *      "updatedAt": "2019-11-28T18:59:01.215Z"
 *    }
 *  ]
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Erro de autenticação
 *  HTTP/1.1 401 Unauthorized
 *  {"error": "Please login to access system!"}
 */
router.get('/', taskController.index)

/**
 * @apiName Store Task
 * @api {post} /tasks Cadastra Tarefa
 * @apiDescription Cadastra uma nova tarefa para o usuário autenticado.
 * @apiVersion 1.0.0
 * @apiGroup Tarefas
 *
 * @apiParam {string} title Título da tarefa
 * @apiParamExample {json} Entrada
 *  {
 *    "title": "Work"
 *  }
 *
 * @apiSuccess {number} id Id de registro
 * @apiSuccess {string} title Título da tarefa
 * @apiSuccess {number} UserId Id do usuário
 * @apiSuccess {date} createdAt Data de cadastro
 * @apiSuccess {date} updatedAt Data de atualização
 * @ApiSuccessExample {json} Sucesso
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "title": "Work",
 *    "UserId": 1,
 *    "createdAt": "2019-11-28T18:58:50.099Z",
 *    "updatedAt": "2019-11-28T18:58:50.099Z"
 *  }
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Título obrigatório
 *  HTTP/1.1 400 Bad Request
 *  {"error": "Title is required"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Título inválido
 *  HTTP/1.1 400 Bad Request
 *  {"error": "The title can only contain numbers and letters"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Erro de autenticação
 *  HTTP/1.1 401 Unauthorized
 *  {"error": "Please login to access system!"}
 */
router.post('/register', taskController.store)

/**
 * @apiName Show Task
 * @api {get} /tasks/:id Exibe uma tarefa
 * @apiDescription Exibe uma tarefa do usuário autenticado, passando um ID como parâmetro na URL.
 * @apiVersion 1.0.0
 * @apiGroup Tarefas
 *
 * @apiHeader {string} Authorization Token de usuário
 * @apiHeaderExample {json} Header
 *  {"Authorization": "bearer xyz.abc.123.hgf"}
 *
 * @apiParam {id} id Id da tarefa
 *
 * @apiSuccess {number} id Id de registro
 * @apiSuccess {string} title Título ta tarefa
 * @apiSuccess {boolean} done Tarefa concluida?
 * @apiSuccess {date} createdAt Data de cadastro
 * @apiSuccess {date} updatedAt Data de atualização
 * @apiSuccessExample {json} Sucesso
 *  HTTP/1.1 200 OK
 *  {
 *    "id": 1,
 *    "title": "Work",
 *    "done": false,
 *    "createdAt": "2019-11-28T18:58:50.099Z",
 *    "updatedAt": "2019-11-28T18:58:50.099Z"
 *  }
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Tarefa não existe
 *  HTTP/1.1 404 Not Found
 *  {"error": "Tasks not found"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Erro de autenticação
 *  HTTP/1.1 401 Unauthorized
 *  {"error": "Please login to access system!"}
 */
router.get('/:id', taskController.show)

/**
 * @apiName Update Task
 * @api {get} /tasks/:id Atualiza uma tarefa
 * @apiDescription Atualiza uma tarefa do usuário autenticado, passando um ID como parâmetro na URL.
 * @apiVersion 1.0.0
 * @apiGroup Tarefas
 *
 * @apiHeader {string} Authorization Token de usuário
 * @apiHeaderExample {json} Header
 *  {"Authorization": "bearer xyz.abc.123.hgf"}
 *
 * @apiParam {string} title Título da tarefa
 * @apiParam {boolean} done Tarefa concluída?
 * @apiParamExample {json} Entrada
 *  {
 *    "title": "Trabalhar",
 *    "done": true
 *  }
 *
 * @apiSuccess {string} title Título da tarefa
 * @apiSuccess {boolean} done Tarefa concluída?
 * @apiSuccess {date} createdAt Data de cadastro
 * @apiSuccess {date} updatedAt Data de atualização
 * @apiSuccessExample {json} Sucesso
 *  HTTP/1.1 200 OK
 *  {
 *    "title": "Trabalhar",
 *    "done": true,
 *    "createdAt": "2019-11-29T12:09:52.320Z",
 *    "updatedAt": "2019-11-29T12:48:30.608Z"
 *  }
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Tarefa não encontrada
 *  HTTP/1.1 404 Not Found
 *  {"error": "Tasks not found"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Erro de autenticação
 *  HTTP/1.1 401 Unauthorized
 *  {"error": "Please login to access system!"}
 */
router.put('/:id', taskController.update)

/**
 * @apiName Destroy Task
 * @api {delete} /tasks/:id Exclui uma tarefa
 * @apiDescription Exclui uma tarefa do usuário autenticado, passando um ID como parâmetro da URL.
 * @apiVersion 1.0.0
 * @apiGroup Tarefas
 *
 * @apiHeader {string} Authorization Token de usuário
 * @apiHeaderExample {json} Header
 *  {"Authorization": "bearer xyz.abc.123.hgf"}
 *
 * @apiParam {id} id Id da tarefa
 *
 * @apiSuccess {string} msg Mensagem de sucesso
 * @apiSuccessExample {json} Sucesso
 *  HTML/1.1 200 OK
 *  {"msg": "Task is removed"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Tarefa não encontrada
 *  HTTP/1.1 404 Not Found
 *  {"error": "Could not find task"}
 *
 * @apiError {string} error Mensagem de erro
 * @apiErrorExample {json} Erro de autenticação
 *  HTTP/1.1 401 Unauthorized
 *  {"error": "Please login to access system!"}
 */
router.delete('/:id', taskController.destroy)

module.exports = router
