type Contact_Type = {
  CONTACT_CREATED: string;
  CONTACT_CREATED_FAILED: string;

  FETCHED: string;
  FETCH_FAILED: string;
  FAIL_TO_FIND_CONTACT: string;
};

const Contact_Constant: Contact_Type = {
  CONTACT_CREATED: 'Contact created successfully',
  CONTACT_CREATED_FAILED: 'FAIL TO CREATE CONTACT',
  FETCHED: 'Contact fetched successfully',
  FETCH_FAILED: 'Contact fetch failed',
  FAIL_TO_FIND_CONTACT: 'Failed to find contact',
};

export default Object.freeze(Contact_Constant);
