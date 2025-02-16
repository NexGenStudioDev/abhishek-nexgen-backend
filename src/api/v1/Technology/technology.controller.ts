import { Request, Response } from 'express';
import technologyService from './technology.service';
import { validateTechnology } from './technology.validator';
import SendResponse from '../../../utils/SendResponse';
import technologyConstant from './technology.constant';
import { send } from 'process';
import technologyDal from './technology.dal';

// create technology
export const createTechnology = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { error } = validateTechnology(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    if (await technologyDal.findTechnologyByName(req.body.name)) {
      throw new Error(technologyConstant.TECHNOLOGY_ALREADY_EXISTS);
    }
    const technology = await technologyService.createTechnology(req.body);

    SendResponse.success(
      res,
      201,
      technologyConstant.TECHNOLOGY_CREATED,
      technology,
    );
  } catch (err) {
    SendResponse.error(res, 500, (err as Error).message);
  }
};

// get all technologies
export const getTechnologies = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const technologies: any = await technologyService.getTechnologies();
    if (!technologies) {
      throw new Error(technologyConstant.TECHNOLOGY_NOT_FOUND);
    }
    SendResponse.success(
      res,
      200,
      technologyConstant.TECHNOLOGY_FETCHED,
      technologies,
    );
  } catch (err) {
    SendResponse.error(res, 500, (err as Error).message);
  }
};

// get technology by id
export const getTechnologyById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const technology = await technologyService.getTechnologyById(req.params.id);
    if (!technology) {
      throw new Error(technologyConstant.TECHNOLOGY_NOT_FOUND);
    }
    SendResponse.success(
      res,
      200,
      technologyConstant.TECHNOLOGY_FETCHED,
      technology,
    );
  } catch (err) {
    SendResponse.error(res, 500, (err as Error).message);
  }
};

// update technology
export const updateTechnology = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = validateTechnology(req.body);

  try {
    if (error) {
      throw new Error(error.details[0].message);
    }
    const technology: any = await technologyService.updateTechnology(
      req.params.id,
      req.body,
    );
    if (!technology) {
      throw new Error(technologyConstant.TECHNOLOGY_UPDATE_FAILED);
    }
    SendResponse.success(
      res,
      200,
      technologyConstant.TECHNOLOGY_UPDATE,
      technology,
    );
  } catch (err) {
    SendResponse.error(res, 500, (err as Error).message);
  }
};

// delete technology
export const deleteTechnology = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const technology = await technologyService.deleteTechnology(req.params.id);
    if (!technology) {
      throw new Error(technologyConstant.TECHNOLOGY_DELETE_FAILED);
    }
    SendResponse.success(
      res,
      200,
      technologyConstant.TECHNOLOGY_DELETE,
      technology,
    );
  } catch (err) {
    SendResponse.error(res, 500, (err as Error).message);
  }
};
