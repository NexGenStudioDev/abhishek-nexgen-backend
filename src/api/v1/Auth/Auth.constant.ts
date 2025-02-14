type AuthConstants = {
  CREATED: string;
  CREATED_FAILED: string;
  FETCHED: string;
  FETCH_FAILED: string;
  UPDATE: string;
  UPDATE_FAILED: string;
};

const Auth_Constant: AuthConstants = {
  CREATED: 'User created successfully',
  CREATED_FAILED: 'User creation failed',
  FETCHED: 'User fetched successfully',
  FETCH_FAILED: 'User fetch failed',
  UPDATE: 'User updated successfully',
  UPDATE_FAILED: 'User update failed',
};

export default Object.freeze(Auth_Constant);
