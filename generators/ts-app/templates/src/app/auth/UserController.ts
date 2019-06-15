import UserService from './UserService';

class UserController {

  public login(req, res) {
    const body = req.body;
    UserService.isValidUser(body)
      .then((result) => res.status(200).send({ token: result }))
      .catch((err) => res.status(500).send({ error: err.message }));
  }

  public register(req, res) {
    const body = req.body;
    UserService.create(body)
      .then((result) =>  res.status(201).send({ token: result }))
      .catch((err) => res.status(500).send({ error: err.message }));
  }

  public search(req, res) {
    UserService.find({})
      .then((result) => res.status(200).send({ users: result }))
      .catch((err) => res.status(500).send({ error: err.message }));
  }

  public update() {
    // Update Code would written here
  }

  public delete() {
    // delete Code would written here
  }
}

export default new UserController();
