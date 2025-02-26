import ContactConstant from './Contact.constant';
import ContactModel from './Contact.model';
import { createContact_Validator } from './Contact.validator';

class Contact_Service {
  public create = async ({
    name,
    userId,
    email,
    phone,
    message,
  }: {
    name: string;
    email: string;
    userId: string;
    phone: number;
    message: string;
  }) => {
    try {
      const { error } = createContact_Validator.validate({
        name,
        email,
        phone,
        message,
      });

      if (error) {
        console.log('Validation Error ', error);
        throw Error(error['details'][0]['message']);
      }

      const Contact_User = await ContactModel.create({
        name,
        email,
        userId,
        phone,
        message,
      });

      if (!Contact_User) {
        throw new Error(ContactConstant.CONTACT_CREATED_FAILED);
      }

      return Contact_User;
    } catch (error: any) {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  };

  public find_Contact_Data = async (userId: String) => {
    try {

      const Contact = await ContactModel.find({userId});

   
      if (!Contact) {
        throw new Error(ContactConstant.FAIL_TO_FIND_CONTACT);
      }

      return Contact;
    } catch (error: any) {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new Contact_Service();
