import { ErrorReport } from 'joi';
import Technology from './technology.model';

// Create a new technology
export const createTechnology = async (data: any) => {
  try {
    const technology = new Technology(data);
    return await technology.save();
  } catch (error) {
    throw new Error(
      `Error creating technology: ${(error as ErrorReport).message}`,
    );
  }
};

// Get all technologies
export const getTechnologies = async () => {
  try {
    return await Technology.find();
  } catch (error) {
    throw new Error(
      `Error fetching technologies: ${(error as ErrorReport).message}`,
    );
  }
};

// Get a technology by ID
export const getTechnologyById = async (id: string) => {
  try {
    return await Technology.findById(id);
  } catch (error) {
    throw new Error(
      `Error fetching technology by ID: ${(error as ErrorReport).message}`,
    );
  }
};

// Update a technology by ID
export const updateTechnology = async (id: string, data: any) => {
  try {
    return await Technology.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(
      `Error updating technology: ${(error as ErrorReport).message}`,
    );
  }
};

// Delete a technology by ID
export const deleteTechnology = async (id: string) => {
  try {
    return await Technology.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(
      `Error deleting technology: ${(error as ErrorReport).message}`,
    );
  }
};
