import { Request, Response } from 'express';
import usersServices from './usersServices';

const usersControllers = {
  getUsers: async (req: Request, res: Response) => {
    const users = await usersServices.getUsers();
    if (!users) {
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'List of users',
      users,
      countOfUsers: users.length,
    });
  },
  getUserById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id !== res.locals.user.id && res.locals.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    const user = await usersServices.getUserById(id);
    return res.status(200).json({
      success: true,
      message: 'User',
      user,
    });
  },
  createUser: async (req: Request, res: Response) => {
    const {
      firstName, lastName, email, password,
    } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Check if firstName, lastName, email or password are provided',
      });
    }
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };
    const userId = await usersServices.createUser(newUser);
    return res.status(200).json({
      success: true,
      message: 'User created',
      userId,
    });
  },
  deleteUser: async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const deleted = await usersServices.deleteUser(userId);

    if (deleted) {
      return res.status(200).json({
        success: true,
        message: 'User deleted',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  },
};

export default usersControllers;
