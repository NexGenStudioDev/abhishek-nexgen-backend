type TokenConstant = {
  TOKEN_EXPIRATION: number;
  TOKEN_CREATED: string;
  TOKEN_EXPIRED: string;
  TOKEN_INVALID: string;
  TOKEN_NOT_FOUND: string;
};

let TokenConstant: TokenConstant = {
  TOKEN_EXPIRATION: 3600,
  TOKEN_CREATED: 'Token created successfully',
  TOKEN_EXPIRED: 'Token expired',
  TOKEN_INVALID: 'Token invalid',
  TOKEN_NOT_FOUND: 'Token not found',
};

export default Object.freeze(TokenConstant);
