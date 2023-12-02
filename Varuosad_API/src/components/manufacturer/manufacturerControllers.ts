import express, { Request, Response } from 'express';
import manufacturersServices from './manufacturerServices';

const manufacturersControllers = {
  getManufacturers: async (req: Request, res: Response) => {
    const manufacturers = await manufacturersServices.getManufacturers();
    if (!manufacturers) {
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'List of Manufacturers',
      manufacturers,
      countOfManufacturers: manufacturers.length,
    });
  },
  getManufacturersById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const manufacturer = await manufacturersServices.getManufacturersById(id);
    return res.status(200).json({
      success: true,
      message: 'Manufacturer',
      manufacturer,
    });
  },
  createManufacturer: async (req: Request, res: Response) => {
    const { name, title, description } = req.body;
    if (!name || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Check if all required fields are filled',
      });
    }
    const manufacturerId = await manufacturersServices.createManufacturer(name, title, description);
    return res.status(200).json({
      success: true,
      message: 'Manufacturer created',
      manufacturerId,
    });
  },
  deleteManufacturer: async (req: Request, res: Response) => {
    const manufacturerId = parseInt(req.params.id, 10);
  
    if (isNaN(manufacturerId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid manufacturer ID',
      });
    }
  
    const deleted = await manufacturersServices.deleteManufacturer(manufacturerId);
  
    if (deleted) {
      return res.status(200).json({
        success: true,
        message: 'Manufacturer deleted',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Manufacturer not found',
      });
    }
  },

updateManufacturer: async (req: Request, res: Response) => {
    try {
      const manufacturerId = parseInt(req.params.id, 10);

      if (isNaN(manufacturerId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid manufacturer ID',
        });
      }

      const { name, title, description } = req.body;
      if (!name || !title || !description) {
        return res.status(400).json({
          success: false,
          message: 'Check if all required fields are filled',
        });
      }

      const updated = await manufacturersServices.updateManufacturer(
        manufacturerId,
        name,
        title,
        description
      );

      if (updated) {
        return res.status(200).json({
          success: true,
          message: 'Manufacturer updated',
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Manufacturer not found',
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

export default manufacturersControllers;