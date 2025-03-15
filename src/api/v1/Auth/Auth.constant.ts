type AuthConstants = {
  CREATED: string;
  CREATED_FAILED: string;
  LOGIN_FAILED: string;
  FETCHED: string;
  FETCH_FAILED: string;
  FAIL_TO_DECRYPT_TOKEN: string;
  INVALID_TOKEN: string;
  FAIL_TO_ENCREPT_EMAIL: string;
  EMAIL_REQUIRED: string;
  UPDATE: string;
  NOT_APPROVED: string;
  FAIL_TO_FIND_USER: string;
  LOGIN_SUCCESS: string;
  NOT_SUPER_ADMIN: string;
  INCORECT_PASSWORD: string;
  UPDATE_FAILED: string;
  SALT_ROUNDS: number;
};

const Auth_Constant: AuthConstants = {
  CREATED: 'User created successfully Wait for approval',
  CREATED_FAILED: 'User creation failed',
  LOGIN_SUCCESS: 'Login Success',
  LOGIN_FAILED: 'Login failed',
  FAIL_TO_DECRYPT_TOKEN: 'Failed to decrypt token',
  INVALID_TOKEN: 'Invalid Token',
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
