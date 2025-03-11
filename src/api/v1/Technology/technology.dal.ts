import Technology from './technology.model';

class TechnologyDAL {
  public async findTechnologyByName(name: string) {
    const technology = await Technology.findOne({ name });
    if (!technology) {
      return false;
    }

    return technology;
  }

  public async findAllTechnologies() {
    try {
      let find_all_technologies = await Technology.find();
      if (!find_all_technologies) {
        return false;
      }

      return find_all_technologies;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findTechnologyById(id: string) {
    try {
      let FindByid = await Technology.findById(id);
      if (!FindByid) {
        return false;
      }

      return FindByid;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findAndDeleteTechnologyById(id: string) {
    try {
      let FindByid = await Technology.findByIdAndDelete(id);
      if (!FindByid) {
        return false;
      }

      return FindByid;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async isTechnology_AlreadyExists(name: string) {
    try {
      const isTechnology_AlreadyExists = await this.findTechnologyByName(name);

      if (isTechnology_AlreadyExists) {
        return true;
      }

      return false;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default new TechnologyDAL();
