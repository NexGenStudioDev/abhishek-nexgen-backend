import tokenConstant from './token.constant';
import Token from './token.model';
import { IToken } from './token.type';
import { CreateToken_Validator } from './token.validation';

class Token_Service {
  public createTokenAndRefreshToken(
    CreateToken_Option: IToken,
  ) {
    try {

      let { error } = CreateToken_Validator.validate(CreateToken_Option);

      if (error) {
        throw new Error(
          `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
        );
      }

      

      let CREATE_USER_TOKEN = Token.create(CreateToken_Option);

      if (!CREATE_USER_TOKEN) {
        throw new Error(tokenConstant.TOKEN_CREATED_FAILED);
      }

      return CREATE_USER_TOKEN;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create token');
    }
  }
}

export default new Token_Service();
