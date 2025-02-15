type TechnologyConstantType = {
  TECHNOLOGY_CREATED: string;
  TECHNOLOGY_CREATED_FAILED: string;
  TECHNOLOGY_FETCHED: string;
  TECHNOLOGY_UPDATE: string;
  TECHNOLOGY_UPDATE_FAILED: string;
  TECHNOLOGY_DELETE: string;
  TECHNOLOGY_DELETE_FAILED: string;
  TECHNOLOGY_NOT_FOUND: string;
  TECHNOLOGY_ALREADY_EXISTS: string;
};

const TechnologyConstant: TechnologyConstantType = {
  TECHNOLOGY_CREATED: 'Technology created successfully',
  TECHNOLOGY_CREATED_FAILED: 'Technology creation failed',
  TECHNOLOGY_FETCHED: 'Technology fetched successfully',
  TECHNOLOGY_UPDATE: 'Technology updated successfully',
  TECHNOLOGY_UPDATE_FAILED: 'Technology update failed',
  TECHNOLOGY_DELETE: 'Technology deleted successfully',
  TECHNOLOGY_DELETE_FAILED: 'Technology delete failed',
  TECHNOLOGY_NOT_FOUND: 'Technology not found',
  TECHNOLOGY_ALREADY_EXISTS: 'Technology already exists',
};

export default Object.freeze(TechnologyConstant);
