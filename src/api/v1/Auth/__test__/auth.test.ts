import AuthConstant from '../Auth.constant';
import AuthModel from '../Auth.model';

let userArray = [];

test('Test the Auth constant', () => {
  expect(AuthConstant).toBeDefined();
});

test('Create Test User', () => {
  async function CreateUser() {
    let Find_Test_User = await AuthModel.find({ email: 'test@gmail.com' });

    if (Find_Test_User.length > 0) {
      console.log('User already created');
      return;
    }

    let Create_Test_User = await AuthModel.create({
      name: 'Test User',
      email: 'test@gmail.com',
      password: 'testpassword@123',
    });

    if (!Create_Test_User) {
      throw new Error('User not created');
    }

    userArray.push(Create_Test_User);
    console.log('Create_Test_User', Create_Test_User);
  }

  CreateUser();
});

test('Find Test User', () => {
  async function FindUser() {
    let Find_Test_User = await AuthModel.findOne({ email: 'test@gmail.com' });
    if (!Find_Test_User) {
      throw new Error('User not found');
    }
    console.log('Find_Test_User', Find_Test_User);
  }
  FindUser();
});
