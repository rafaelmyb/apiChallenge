const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    const { orderBy } = request.query;
    const users = await UsersRepository.findAll(orderBy);

    response.json(users);
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await UsersRepository.findById(id);

    if (!user) {
      // 404: not found
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const userExists = await UsersRepository.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const user = await UsersRepository.create({
      name, email, phone, category_id,
    });

    response.json(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const userExists = await UsersRepository.findById(id);

    if (!userExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const userByEmail = await UsersRepository.findByEmail(email);

    if (userByEmail && userByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const user = await UsersRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    await UsersRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new UserController();
