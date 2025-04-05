import Token from './token.model';
import { IToken } from './token.type';

class Token_Utils {
  public getTokenByUserId = async (userId: string) => {
    return await Token.findOne({ userId });
  };

  async updateToken(tokenId: string, data: IToken) {
    return await Token.findByIdAndUpdate(tokenId, data, { new: true });
  }

  async getToken(token: string): Promise<IToken | null> {
    return await Token.findOne({ token });
  }

  async UpdateAccessTokenByRefreshToken(
    refreshToken: string,
    accessToken: string,
  ) {
    return await Token.findOneAndUpdate(
      { refreshToken },
      { accessToken },
      { new: true },
    );
  }
}

export default new Token_Utils();
