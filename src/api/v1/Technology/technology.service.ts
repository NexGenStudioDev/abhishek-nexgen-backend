import { ErrorReport } from 'joi';
import Technology from './technology.model';
import technologyConstant from './technology.constant';

class TechnologyService {
  // Create a new technology
  public createTechnology = async ({
    name,
    description,
    image,
    link,
  }: {
    name: string;
    description: string;
    image: string;
    link: string;
  }) => {
    try {
      const technology = await Technology.create({
        name,
        description,
        image,
        link,
      });

      if (!technology) {
        throw new Error(technologyConstant.TECHNOLOGY_CREATED_FAILED);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  // Get all technologies
  public getTechnologies = async () => {
    try {
      return await Technology.find();
    } catch (error) {
      throw new Error(
        `Error fetching technologies: ${(error as ErrorReport).message}`,
      );
    }
  };

  // Get a technology by ID
  public getTechnologyById = async (id: string) => {
    try {
      return await Technology.findById(id);
    } catch (error) {
      throw new Error(
        `Error fetching technology by ID: ${(error as ErrorReport).message}`,
      );
    }
  };

  // Update a technology by ID
  public updateTechnology = async (id: string, data: any) => {
    try {
      return await Technology.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(
        `Error updating technology: ${(error as ErrorReport).message}`,
      );
    }
  };

  // Delete a technology by ID
  public deleteTechnology = async (id: string) => {
    try {
      return await Technology.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(
        `Error deleting technology: ${(error as ErrorReport).message}`,
      );
    }
  };
}

export default new TechnologyService();
