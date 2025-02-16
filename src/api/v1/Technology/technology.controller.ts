import { Request, Response } from 'express';
import * as technologyService from './technology.service';
import { validateTechnology } from './technology.validator';

export const createTechnology = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = validateTechnology(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    const technology = await technologyService.createTechnology(req.body);
    res.status(201).send(technology);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
  }
};

export const getTechnologies = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const technologies = await technologyService.getTechnologies();
    res.status(200).send(technologies);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
  }
};

export const updateTechnology = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = validateTechnology(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    const technology = await technologyService.updateTechnology(
      req.params.id,
      req.body,
    );
    if (!technology) {
      res.status(404).send('Technology not found');
      return;
    }
    res.status(200).send(technology);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
  }
};

export const deleteTechnology = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const technology = await technologyService.deleteTechnology(req.params.id);
    if (!technology) {
      res.status(404).send('Technology not found');
      return;
    }
    res.status(200).send('Technology deleted');
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
  }
};

export const getTechnologyById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const technology = await technologyService.getTechnologyById(req.params.id);
    if (!technology) {
      res.status(404).send('Technology not found');
      return;
    }
    res.status(200).send(technology);
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(500).send(errorMessage);
  }
};
