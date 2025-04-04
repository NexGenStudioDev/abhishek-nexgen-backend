import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import technologyService from './technology.service';
import { validateTechnology } from './technology.validator';
import SendResponse from '../../../utils/SendResponse';
import technologyConstant from './technology.constant';
import technologyDal from './technology.dal';
import AuthDal from '../Auth/Auth.dal';
import StatusConstant from '../../../constant/Status.constant';
import JwtUtils from '../../../utils/Jwt.utils';

class technology_Controller {
  public async createTechnology(req: Request, res: Response): Promise<void> {
    try {
      let { name, description, image, link } = req.body;

      let isTechnology_AlreadyExists =
        await technologyDal.isTechnology_AlreadyExists(name);

      if (isTechnology_AlreadyExists) {
        throw new Error(technologyConstant.TECHNOLOGY_ALREADY_EXISTS);
      }

      const Created_Technology = await technologyService.createTechnology({
        name,
        description,
        image,
        link,
      });

      SendResponse.success(
        res,
        201,
        technologyConstant.TECHNOLOGY_CREATED,
        Created_Technology,
      );
    } catch (err) {
      SendResponse.error(res, 500, (err as Error).message);
    }
  }

  public async getTechnologies(req: Request, res: Response): Promise<void> {
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
  }

  public async getTechnologyById(req: Request, res: Response): Promise<void> {
    try {
      let id = req.params.id;
      const technology = await technologyService.getTechnologyById(id);
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
  }

  public async updateTechnology(req: Request, res: Response): Promise<void> {
    try {
      let { name, description, image, link } = req.body;
      let _id = req.params.id;

      const Update_Technology: any = await technologyService.updateTechnology(
        _id,
        name,
        description,
        image,
        link,
      );

      if (!Update_Technology) {
        throw new Error(technologyConstant.TECHNOLOGY_UPDATE_FAILED);
      }
      SendResponse.success(
        res,
        200,
        technologyConstant.TECHNOLOGY_UPDATE,
        Update_Technology,
      );
    } catch (err) {
      SendResponse.error(res, 500, (err as Error).message);
    }
  }

  public async deleteTechnology(req: Request, res: Response): Promise<void> {
    try {
      const technology = await technologyService.deleteTechnology(
        req.params.id,
      );

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
  }

  public async chooseTechnology(req: Request, res: Response): Promise<void> {
    try {
      let { technologies } = req.body;

      const token = req.cookies.token || req.headers.authorization;

      if (!token) {
        throw new Error('Token is required');
      }

      let decoded = await JwtUtils.verifyJWT_TOKEN(token, 'refresh');

      console.log('decoded', decoded);

      // let email = decoded.sub;

      // let data = await technologyService.chooseTechnology(technologies, email);

      // SendResponse.success(
      //   res,
      //   StatusConstant.OK,
      //   technologyConstant.TECHNOLOGY_UPDATE,
      //   data,
      // );
    } catch (error: any) {
      console.log(error);
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  }

  public async getTechnologyByUser(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies.token || req.headers.authorization;

      if (!token) {
        throw new Error('Token is required');
      }

      let decoded = await JwtUtils.verifyJWT_TOKEN(token, 'access');

      console.log('decoded', decoded);

      // let email = decoded.email;

      // let data = await technologyService.getTechnologyByUser(email);

      // SendResponse.success(
      //   res,
      //   StatusConstant.OK,
      //   technologyConstant.TECHNOLOGY_FETCHED,
      //   data,
      // );
    } catch (error: any) {
      console.log(error);
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  }
}

export default new technology_Controller();
