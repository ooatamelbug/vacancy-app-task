import { CompanyService } from "./../company/company.service";
import { UserService } from "./../users/user.service";
import { CustomRequest } from "./../shared/interface/request";
import { ResponseData } from "./../shared/interface/response";
import { GetVacancyDTO, CreateVacancyDTO, ApplyDTO } from "./dto/vacancy.dto";
import { VacancyService } from "./vacancy.service";
import { Request, Response } from "express";
import ErrorValidateVacancyDTO from "./vacancy.validation";
import Company from "company/entity/company";

export class VacancyController {
  async searchVacancies(req: Request, res: Response) {
    let response: ResponseData;
    try {
      const errors = await new ErrorValidateVacancyDTO().validateGetVacancy(
        req.body as GetVacancyDTO
      );
      if (errors !== undefined) {
        response = {
          success: false,
          errors: errors,
        };
        res.status(404).json(response);
        return;
      }
      const vacancy = await new VacancyService().findVacancy(req.body);
      res.status(200).json({ data: vacancy });
    } catch (error) {
      response = { success: false, errors: [error.message] };
      return res.status(500).json(response);
    }
  }

  async createNewVacancy(req: CustomRequest, res: Response) {
    let response: ResponseData;
    try {
      const user = await new UserService().findUser({ email: req.user.email });

      let company: Company;
      if (req.body.company || req.body.company !== "") {
        company = await new CompanyService().findCompany({
          email: req.body.company,
          userBy: user.id,
        });

        if (company == null) {
          response = {
            success: false,
            errors: ["you not allowed to add this job"],
          };
          res.status(400).json(response);
          return;
        }

        req.body.company = company;
      }

      delete user.password;
      req.body.created_by = user.id;
      const errors = await new ErrorValidateVacancyDTO().validateCreateVacancy(
        req.body as CreateVacancyDTO
      );

      if (errors !== undefined) {
        res.status(400).json({ errors });
        return;
      }

      const vacancy = await new VacancyService().createVacancy(
        req.body as CreateVacancyDTO
      );

      if (!vacancy) {
        response = {
          success: false,
          errors: ["cannot added this vacancy"],
        };
        return res.status(404).json(response);
      }
      res.status(201).json({
        data: vacancy,
      });
    } catch (error) {
      console.log(error);
      response = { errors: [error.message] };
      return res.status(500).json(response);
    }
  }

  async applyVacancy(req: CustomRequest, res: Response) {
    let response: ResponseData;
    try {
      req.body.email = req.user.email;
      const errors = await new ErrorValidateVacancyDTO().validateApplyVacancy(
        req.body as ApplyDTO
      );
      if (errors !== undefined) {
        response = {
          success: false,
          errors: errors,
        };
        res.status(404).json(response);
        return;
      }

      const apply = await new VacancyService().applyVacancy(
        req.body as ApplyDTO
      );
      return res
        .status(201)
        .json({ success: true, message: `successful apply (^_^) ${apply.message}` });
    } catch (error) {
      response = { success: false, errors: [error.message] };
      return res.status(500).json(response);
    }
  }
}
