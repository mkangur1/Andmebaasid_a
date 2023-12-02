import express, { Request, Response, Express } from 'express';
import sparesServices from './sparesServices';

const sparesControllers = {
  getSpares: async (req: Request, res: Response) => {
    const spares = await sparesServices.getSpares();
    if (!spares) {
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'List of spares',
      spares,
      countOfSpares: spares.length,
    });
  },
  getSparesById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const spare = await sparesServices.getSparesById(id);
    return res.status(200).json({
      success: true,
      message: 'Spares',
      spare,
    });
  },
  createSpare: async (req: Request, res: Response) => {
    try {
      const { name, manufacturer, code, type, volume, age } = req.body;
      if (!name || !manufacturer || !code || !type || !age) {
        return res.status(400).json({
          success: false,
          message: 'Check if all required fields are filled',
        });
      }
      const spareId = await sparesServices.createSpare(name, manufacturer, code, type, volume, age);
      return res.status(200).json({
        success: true,
        message: 'spare created',
        spareId,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },
  deleteSpare: async (req: Request, res: Response) => {
    const spareId = parseInt(req.params.id, 10);

    if (isNaN(spareId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid spare ID',
      });
    }

    const deleted = await sparesServices.deleteSpare(spareId);

    if (deleted) {
      return res.status(200).json({
        success: true,
        message: 'spare deleted',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'spare not found',
      });
    }
  },

updateSpare: async (req: Request, res: Response) => {
    try {
      const spareId = parseInt(req.params.id, 10);

      if (isNaN(spareId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid spare ID',
        });
      }

      const { name, manufacturer, code, type, volume, age } = req.body;
      if (!name || !manufacturer || !code || !type || !age) {
        return res.status(400).json({
          success: false,
          message: 'Check if all required fields are filled',
        });
      }

      const updated = await sparesServices.updateSpare(
        spareId,
        name,
        manufacturer,
        code,
        type,
        volume,
        age
      );

      if (updated) {
        return res.status(200).json({
          success: true,
          message: 'spare updated',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'spare not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },
};

export default sparesControllers;
