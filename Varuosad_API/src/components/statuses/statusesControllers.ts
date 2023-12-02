import { Request, Response } from 'express';
import statusesServices from './statusesServices';

const statusesControllers = {
  getStatuses: async (req: Request, res: Response) => {
    const statuses = await statusesServices.getStatuses();
    if (!statuses) {
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'List of statuses',
      statuses,
      countOfStatuses: statuses.length,
    });
  },
  getStatusById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const status = await statusesServices.getStatusById(id);
    return res.status(200).json({
      success: true,
      message: 'Status',
      status,
    });
  },
};

export default statusesControllers;
