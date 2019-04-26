import UserService from './UserService';

class UserController {
  login (req, res) {
    let body = req.body;
    UserService.isValidUser(body)
      .then((token) => res.status(200).send({ token: token }))
      .catch((err) => res.status(500).send({ error: err.message }));
  }

  register (req, res) {
    let body = req.body;
    UserService.create(body)
      .then((token) => res.status(201).send({ token: token }))
      .catch((err) => res.status(500).send({ error: err.message }));
  }

  search (req, res) {
    UserService.find({})
      .then((result) => res.status(200).send({ users: result }))
      .catch((err) => res.status(500).send({ error: err.message }));
  }

  update () {

  }

  delete () {

  }
}

export default new UserController();
