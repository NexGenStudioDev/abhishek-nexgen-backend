import ProjectConstant from './Project.constant';
import Project_Model from './Project.model';
import { Project_Type } from './Project.type';
import Projec_Utils from './Project.Utils';

class ProjectService {
  async CreateProject(project: Project_Type): Promise<Project_Type> {
    try {

      let last_index = await Projec_Utils.findLast_Index();

      let Create_Project = await Project_Model.create({
        _id: last_index + 1,
        User_id: project.User_id.toString(),
        title: project.title,
        description: project.description,
        features: project.features,
        bg_color: project.bg_color,
        techStack: project.techStack,
        links: project.links,
        video: project.video,
      });

      if (!Create_Project) {
        throw new Error(ProjectConstant.CREATED_FAILED);
      }
      console.log('Create_Project', Create_Project);
      return Create_Project;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProjectService();
