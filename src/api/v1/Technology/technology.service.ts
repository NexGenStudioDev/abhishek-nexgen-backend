import { ErrorReport } from 'joi';
import Technology from './technology.model';
import technologyConstant from './technology.constant';
import {
  validateTechnology,
  validateTechnologyUpdate,
} from './technology.validator';
import technologyDal from './technology.dal';

class TechnologyService {
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
      const { error } = validateTechnology.validate({
        name,
        description,
        image,
        link,
      });

      if (error) {
        throw new Error(error.message);
      }

      const createTechnology = await Technology.create({
        name,
        description,
        image,
        link,
      });

      if (!createTechnology) {
        throw new Error(technologyConstant.TECHNOLOGY_CREATED_FAILED);
      }

      return createTechnology;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  public getTechnologies = async () => {
    try {
      let find_all_technologies = await technologyDal.findAllTechnologies();
      if (!find_all_technologies) {
        new Error(technologyConstant.TECHNOLOGY_NOT_FOUND);
      }

      return find_all_technologies;
    } catch (error) {
      throw new Error(
        `Error fetching technologies: ${(error as ErrorReport).message}`,
      );
    }
  };

  public getTechnologyById = async (id: string) => {
    try {
      let FindByid = await technologyDal.findTechnologyById(id);
      if (!FindByid) {
        new Error(technologyConstant.TECHNOLOGY_NOT_FOUND);
      }

      return FindByid;
    } catch (error) {
      throw new Error(
        `Error fetching technology by ID: ${(error as ErrorReport).message}`,
      );
    }
  };

  public updateTechnology = async (
    _id: string,
    name: string,
    description: string,
    image: string,
    link: string,
  ) => {
    try {
      let { error } = validateTechnologyUpdate.validate({
        name,
        description,
        image,
        link,
      });

      if (error) {
        throw new Error(error.message);
      }
      let Update_Technology = await Technology.findByIdAndUpdate(
        _id,
        {
          $set: {
            name,
            description,
            image,
            link,
          },
        },
        { new: true },
      );

      if (!Update_Technology) {
        return false;
      }

      return Update_Technology;
    } catch (error) {
      throw new Error(
        `Error updating technology: ${(error as ErrorReport).message}`,
      );
    }
  };

  public deleteTechnology = async (id: string) => {
    try {
      let deleteTechnology_By_Id =
        await technologyDal.findAndDeleteTechnologyById(id);
      return deleteTechnology_By_Id;
    } catch (error) {
      throw new Error(
        `Error deleting technology: ${(error as ErrorReport).message}`,
      );
    }
  };
}

export default new TechnologyService();
