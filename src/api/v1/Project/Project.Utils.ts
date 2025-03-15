import ProjectConstant from './Project.constant';
import Project_Model from './Project.model';
import { Project_Type } from './Project.type';

class Projec_Utils {
  public static async getProjectById(id: string): Promise<Project_Type> {
    try {
      let project = await Project_Model.findById(id);
      if (!project) {
        throw new Error(ProjectConstant.NOT_FOUND);
      }
      return project;
    } catch (error) {
      throw error;
    }
  }

  public static async findLast_Index(): Promise<number> {
    try {
      let project = await Project_Model.find().sort({ _id: -1 }).limit(1);
      if (!project) {
        throw new Error(ProjectConstant.NOT_FOUND);
      }
      return project.length;
    } catch (error) {
      throw error;
    }
  }
}

export default Projec_Utils;
