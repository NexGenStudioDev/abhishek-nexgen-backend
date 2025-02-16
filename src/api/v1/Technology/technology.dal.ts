import Technology from './technology.model';

class TechnologyDAL {
  public async findTechnologyByName(name: string): Promise<boolean> {
    const technology = await Technology.findOne({ name });
    return technology !== null;
  }
}

export default new TechnologyDAL();
