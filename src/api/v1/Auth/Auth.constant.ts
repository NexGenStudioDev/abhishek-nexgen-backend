import { AuthConstants } from './Auth.type';

const Auth_Constant: AuthConstants = {
  CREATED: 'User created successfully Wait for approval',
  CREATED_FAILED: 'User creation failed',
  LOGIN_SUCCESS: 'Login Success',
  LOGIN_FAILED: 'Login failed',
  FAIL_TO_UPDATE_REFRESH_TOKEN: 'Failed to update refresh token',
  FAIL_TO_DECRYPT_TOKEN: 'Failed to decrypt token',
  INVALID_TOKEN: 'Invalid Token',
  TOKEN_EXPIRED: 'Token Expired',
  NOT_APPROVED: 'User not approved',
  EMAIL_REQUIRED: 'Email is required',
  FAIL_TO_ENCREPT_EMAIL: 'Failed to encrept email',
  FETCHED: 'User fetched successfully',
  INCORECT_PASSWORD: 'Incorrect password',
  NOT_SUPER_ADMIN: 'You are not Verified Super Admin',
  FETCH_FAILED: 'User fetch failed',
  UPDATE: 'User updated successfully',
  UPDATE_FAILED: 'User update failed',
  FAIL_TO_FIND_USER: 'Failed to find user',
  SALT_ROUNDS: 10,
};

export default Object.freeze(Auth_Constant);
