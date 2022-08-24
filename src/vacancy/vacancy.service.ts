import { User } from "./../users/entity/user";
import { UserService } from "./../users/user.service";
import {
  GetVacancyDTO,
  CreateVacancyDTO,
  ApplyDTO,
  QueryDTO,
} from "./dto/vacancy.dto";
import { VacancyRepository } from "./vacancy.repository";
import { v4 as uuidv4 } from "uuid";
import { JobDay } from "users/entity/user";
import { JobApplicants } from "./entity/vacancy";
import { Console, timeStamp } from "console";

export class VacancyService {
  private vacancyRepository: VacancyRepository;
  private userService: UserService;

  constructor() {
    this.vacancyRepository = new VacancyRepository();
    this.userService = new UserService();
  }

  async findVacancy(findData: GetVacancyDTO) {
    findData.status = "OPEN";
    return await this.vacancyRepository.getAll(findData, {});
  }

  async findAllVacancy(filterData, queryData: QueryDTO) {
    return await this.vacancyRepository.getAll({ status: "OPEN" }, queryData);
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
        await this.handleThreeMaxInDay(user.jobInDay);
      }

      if (vacancy.jobApplicants !== undefined) {
        await this.handleApplyItBefore(vacancy.jobApplicants, user);
      }

      let day = new Date().getDate();
      const handleJobInDay = await this.handleCountingAllApplyForDay(
        user.jobInDay,
        day
      );

      user.jobInDay = handleJobInDay;

      const vacancyJobApplicants = await this.handlJobApplicantsForRequest(
        vacancy.jobApplicants,
        user
      );
      vacancy.jobApplicants = vacancyJobApplicants;

      await this.vacancyRepository.update(vacancy, vacancy.uuid);
      await this.userService.updateUser(user, user.email);

      return { message: "OK" };
    } catch (error) {
      throw error;
    }
  }

  private async handleThreeMaxInDay(userJobInDay: [JobDay]) {
    try {
      let numberApplyJob = userJobInDay.length;
      let userTimesApplyJob: JobDay;
      if (numberApplyJob > 0) {
        userTimesApplyJob = userJobInDay[numberApplyJob - 1];
        if (
          new Date(userTimesApplyJob.date).getDate() === new Date().getDate() &&
          userTimesApplyJob.numb >= 3
        ) {
          throw new Error(
            "you not allowed to apply this job you reach to max 3 number of apply this day"
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }

  private async handleApplyItBefore(
    jobApplicationsForVacancy: [JobApplicants],
    user: User
  ) {
    try {
      let usersIn = jobApplicationsForVacancy.filter((applicant) => {
        return String(applicant.id) === user.id.toString();
      });
      if (usersIn.length > 0) {
        throw new Error("you not allowed to apply this job you apply before");
      }
      return usersIn;
    } catch (error) {
      throw error;
    }
  }

  private async handleCountingAllApplyForDay(
    numberOfJobInUser: [JobDay],
    numberDay: number
  ): Promise<[JobDay]> {
    try {
      if (numberOfJobInUser !== undefined) {
        const userDay = numberOfJobInUser.findIndex((dayIn) => {
          return new Date(dayIn.date).getDate() === numberDay;
        });
        let userCountJob = numberOfJobInUser[userDay];
        if (userCountJob && userCountJob.numb < 3) {
          numberOfJobInUser.splice(userDay, 1);
          numberOfJobInUser.push({
            ...userCountJob,
            numb: userCountJob.numb + 1,
          });
        } else {
          numberOfJobInUser.push({ date: new Date(), numb: 1 });
        }
      } else {
        numberOfJobInUser = [{ date: new Date(), numb: 1 }];
      }
      return numberOfJobInUser;
    } catch (error) {
      throw error;
    }
  }

  private async handlJobApplicantsForRequest(
    jobApplications: [JobApplicants],
    user: User
  ) {
    try {
      if (jobApplications !== undefined) {
        jobApplications.push({ id: user.id, timeApply: new Date() });
      } else {
        jobApplications = [{ id: user.id, timeApply: new Date() }];
      }
      return jobApplications;
    } catch (error) {
      throw error;
    }
  }
}
