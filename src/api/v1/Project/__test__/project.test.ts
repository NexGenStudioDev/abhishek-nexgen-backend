import AuthModel from '../../Auth/Auth.model';
import Crypto from 'crypto';
import Project_Model from '../Project.model';

test('Create Test Project', () => {
  async function CreateProject() {
    let findUser = await AuthModel.findOne({ email: 'test@gmail.com' });
    if (!findUser) {
      throw new Error('User not found');
    }

    let Create_Test_Project = await Project_Model.create({
      User_id: findUser._id,
      title: 'Test Project' + Crypto.randomBytes(20).toString('hex'),
      description: 'Test Description' + Crypto.randomBytes(20).toString('hex'),
      features: [`Test Feature`],
      bg_color: 'red',
      techStack: ['Test Tech', 'Test Stack'],
      links: [{ label: 'Test Label', link: 'Test Link' }],
      video: 'Test Video',
    });

    if (!Create_Test_Project) {
      throw new Error('Project not created');
    }

    console.log('Create_Test_Project', Create_Test_Project);
  }
  CreateProject();
});
