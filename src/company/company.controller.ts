import { UserService } from "./../users/user.service";
import { CustomRequest } from "./../shared/interface/request";
import { ResponseData } from "./../shared/interface/response";
import { GetCompanyDTO, CreateCompanyDTO } from "./dto/company.dto";
import { CompanyService } from "./company.service";
import { Request, Response } from "express";
import ErrorValidateCompanyDTO from "./company.validate";

export class CompanyController {
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
      const company = await new CompanyService().findAllCompany(req.body);
      res.status(200).json({ data: company });
    } catch (error) {
      response = { success: false, errors: [error.message] };
      return res.status(500).json(response);
    }
  }

  async createNewCompany(req: CustomRequest, res: Response) {
    let response: ResponseData;
    try {
      const user = await new UserService().findUser({ email: req.user.email });
      delete user.password;
      req.body.userBy = user.id;
      const errors = await new ErrorValidateCompanyDTO().validateCreateCompany(
        req.body as CreateCompanyDTO
      );
      if (errors !== undefined) {
        res.status(400).json({ success: false, errors });
        return;
      }
      const company = await new CompanyService().createCompany(
        req.body as CreateCompanyDTO
      );
      if (!company) {
        response = {
          success: false,
          errors: ["cannot added this company"],
        };
        return res.status(404).json(response);
      }
      res.status(201).json({
        data: company,
      });
    } catch (error) {
      console.log(error);
      response = { success: false, errors: [error.message] };
      return res.status(500).json(response);
    }
  }
}
