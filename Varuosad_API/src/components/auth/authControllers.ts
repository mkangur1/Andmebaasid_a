import { Request, Response } from 'express';
import usersServices from '../users/usersServices';
import hashServices from '../helpers/hashServices';
import jwtServices from '../helpers/jwtServices';

const authControllers = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Check if email or password are provided',
      });
    }
    const user = await usersServices.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
    const isPasswordCorrect = await hashServices.comparePasswords(
      password,
      user.password!,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Wrong password',
      });
    }
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await jwtServices.sign(payload);
    return res.status(200).json({
      success: true,
      message: 'User logged in',
      token,
    });
  },
};

export default authControllers;
