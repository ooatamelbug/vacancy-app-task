import ConnectDB from "../database/db.config";
import { GetVacancyDTO, MergeCreateWithUuidDTO } from "./dto/vacancy.dto";
import Vacancy from "./entity/vacancy";

export class VacancyRepository {
  private connection;

  constructor() {
    this.connection = ConnectDB;
  }

  async create(paramData: MergeCreateWithUuidDTO): Promise<Vacancy> {
    const vacancy = await this.connection
      .getRepository(Vacancy)
      .create(paramData);
    return await this.connection.getRepository(Vacancy).save(vacancy);
  }

  async getAll(paramData?: GetVacancyDTO): Promise<Vacancy> {
    return await this.connection.getRepository(Vacancy).find(paramData, {
      relations: ["created_by"],
    });
  }

  async getOne(paramData: GetVacancyDTO): Promise<Vacancy> {
    let filter = {};
    if (paramData.jobApplicants) {
      filter = {
        where: {
          "jobApplicants._id": { $eq: paramData.jobApplicants },
        },
      };
    }
    return await this.connection
      .getRepository(Vacancy)
      .findOneBy(paramData, filter);
  }

  async update(paramData, vacancyId): Promise<Vacancy> {
    return await this.connection
      .getRepository(Vacancy)
      .update({ uuid: vacancyId }, { ...paramData });
  }
}
