import { UserService } from "./../users/user.service";
import { GetVacancyDTO, CreateVacancyDTO, ApplyDTO } from "./dto/vacancy.dto";
import { VacancyRepository } from "./vacancy.repository";
import { v4 as uuidv4 } from "uuid";
import { JobDay } from "users/entity/user";

export class VacancyService {
  private vacancyRepository: VacancyRepository;
  private userService: UserService;

  constructor() {
    this.vacancyRepository = new VacancyRepository();
    this.userService = new UserService();
  }

  async findVacancy(findData: GetVacancyDTO) {
    findData.status = "OPEN";
    return await this.vacancyRepository.getAll(findData);
  }

  async createVacancy(createdata: CreateVacancyDTO) {
    try {
      return await this.vacancyRepository.create({
        ...createdata,
        uuid: uuidv4(),
      });
    } catch (error) {
      throw error;
    }
  }

  async applyVacancy(applyDto: ApplyDTO) {
    try {
      const user = await this.userService.findUser({ email: applyDto.email });
      const vacancy = await this.vacancyRepository.getOne({
        uuid: applyDto.vacancyId,
      });

      if (String(vacancy.created_by) === user.id.toString()) {
        throw new Error("you not allowed to apply this job");
      }

      if (user.jobInDay !== undefined) {
        let numberApplyJob = user.jobInDay.length;
        let userTimesApplyJob: JobDay;
        if (numberApplyJob > 0) {
          userTimesApplyJob = user.jobInDay[numberApplyJob - 1];
          if (
            new Date(userTimesApplyJob.date).getDate() ===
              new Date().getDate() &&
            userTimesApplyJob.numb >= 3
          ) {
            throw new Error(
              "you not allowed to apply this job you reach to max 3 number of apply this day"
            );
          }
        }
      }

      if (vacancy.jobApplicants !== undefined) {
        let usersIn = vacancy.jobApplicants.filter((applicant) => {
          return String(applicant.id) === user.id.toString();
        });
        if (usersIn.length > 0) {
          throw new Error("you not allowed to apply this job you apply before");
        }
      }

      let day = new Date().getDate();
      if (user.jobInDay !== undefined) {
        const userDay = user.jobInDay.findIndex((dayIn) => {
          return new Date(dayIn.date).getDate() === day;
        });
        let userCountJob = user.jobInDay[userDay];
        if (userCountJob && userCountJob.numb < 3) {
          user.jobInDay.splice(userDay, 1);
          user.jobInDay.push({ ...userCountJob, numb: userCountJob.numb + 1 });
        } else {
          user.jobInDay.push({ date: new Date(), numb: 1 });
        }
      } else {
        user.jobInDay = [{ date: new Date(), numb: 1 }];
      }

      if (vacancy.jobApplicants !== undefined) {
        vacancy.jobApplicants.push({ id: user.id, timeApply: new Date() });
      } else {
        vacancy.jobApplicants = [{ id: user.id, timeApply: new Date() }];
      }

        await this.vacancyRepository.update(vacancy, vacancy.uuid);

        await this.userService.updateUser(user, user.email);

      return { message: "OK" };
    } catch (error) {
      throw error;
    }
  }
}
