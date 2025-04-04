import { Request, Response } from 'express';
import SendResponse from '../../../utils/SendResponse';
import StatusConstant from '../../../constant/Status.constant';
import AuthConstant from '../Auth/Auth.constant';
import AuthDal from '../Auth/Auth.dal';
import { Create_Project_Validator } from './Project.Validator';
import ProjectService from './Project.Service';
import ProjectConstant from './Project.constant';
import JwtUtils from '../../../utils/Jwt.utils';

class Project_Controller {
  public Create = async (req: Request, res: Response) => {
    try {
      let token = req.cookies.token || req.headers.authorization;
      if (!token) {
        throw new Error(AuthConstant.INVALID_TOKEN);
      }



      let Decord_Token = await JwtUtils.verifyJWT_TOKEN(token, 'access');

      let user = await AuthDal.FIND_byEmail(Decord_Token.email);
      const User_id = user._id;

      let { error } = Create_Project_Validator.validate(req.body);

      if (error) {
        throw new Error(error.message);
      }

      let CreateProject = await ProjectService.CreateProject({
        ...req.body,
        User_id,
      });

      SendResponse.success(
        res,
        StatusConstant.CREATED,
        ProjectConstant.CREATED,
        CreateProject,
      );
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  };

  public Find = async (req: Request, res: Response) => {
    try {
      let token = req.cookies.token || req.headers.authorization;
      if (!token) {
        throw new Error(AuthConstant.INVALID_TOKEN);
      }

      let Decord_Token = JwtUtils.verifyJWT_TOKEN(token, 'access');

      // let user = await AuthDal.FIND_byEmail(Decord_Token.email);
      // const User_id = user._id;

      // let FindProject = await ProjectService.FindProject(User_id.toString());

      // SendResponse.success(
      //   res,
      //   StatusConstant.OK,
      //   ProjectConstant.FIND_PROJECT,
      //   FindProject,
      // );
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  };

  public Delete = async (req: Request, res: Response) => {
    try {
      let token = req.cookies.token || req.headers.authorization;
      if (!token) {
        throw new Error(AuthConstant.INVALID_TOKEN);
      }

      let PROJECT_id = req.query.Project_id;
      if (!PROJECT_id) {
        throw new Error(ProjectConstant.PROJECT_ID_REQUIRED);
      }

      let DeletedProject = await ProjectService.DeleteProject(
        PROJECT_id.toString(),
      );

      SendResponse.success(
        res,
        StatusConstant.OK,
        ProjectConstant.DELETE,
        DeletedProject,
      );
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  };
}

export default new Project_Controller();
