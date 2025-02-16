import Token_Schema from './token.model';

class Token_Service {
  async createToken(userID: string, expiry: Date) {
    try {
      console.log('User Service');

      // let Create_Token = await Token_Schema.create({
      //   user: userID,
      //   token: token,
      //   expiry: expiry,
      // });

      // if (!Create_Token) {
      //   throw new Error('Failed to create token');
      // }

      // return Create_Token;
    } catch (error) {
      console.error('Error creating token:', error);
      throw error;
    }
  }

  static async deleteToken() {}
}

export default new Token_Service();
