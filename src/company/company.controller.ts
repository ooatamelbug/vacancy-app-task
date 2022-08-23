import { UserService } from "./../users/user.service";
import { CustomRequest } from "./../shared/interface/request";
import { ResponseData } from "./../shared/interface/response";
import { GetCompanyDTO, CreateCompanyDTO } from "./dto/company.dto";
import { CompanyService } from "./company.service";
import { Request, Response } from "express";
import ErrorValidateCompanyDTO from "./company.validate";
import { ObjectID } from "typeorm";

export class CompanyController {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  async getCompanies(req: Request, res: Response) {
    let response: ResponseData;
    try {
      const errors = await new ErrorValidateCompanyDTO().validateGetCompany(
        req.body as GetCompanyDTO
      );
      if (errors !== undefined) {
        response = {
          success: false,
          errors: errors,
        };
        res.status(404).json(response);
        return;
      }
    } catch (error) {
      response = { errors: [error.message] };
      return res.status(500).json(response);
    }
  }

  async createNewCompany(req: CustomRequest, res: Response) {
    let response: ResponseData;
    try {
      const obj = new ObjectID(req.user);
      const user = await new UserService().findUser({ id: obj });
      
      req.body.user = user;
      const errors = await new ErrorValidateCompanyDTO().validateCreateCompany(
        req.body as CreateCompanyDTO
      );
      if (errors !== undefined) {
        res.status(400).json({ errors });
        return;
      }
      const company = await this.companyService.createUser(
        req.body as CreateCompanyDTO
      );
      if (!user) {
        response = {
          success: false,
          errors: ["cannot added this company"],
        };
        return res.status(404).json(response);
      }
      res.status(201).json({
        data: user,
      });
    } catch (error) {
      response = { errors: [error.message] };
      return res.status(500).json(response);
    }
  }
}
