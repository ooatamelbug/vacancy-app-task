import { GetCompanyDTO, CreateCompanyDTO } from "./dto/company.dto";
import { CompanyService } from "./company.service";
import { Request, Response } from "express";
import ErrorValidateCompanyDTO from "./company.validate";

export class CompanyController {
  private companyService: CompanyService;

  constructor() {
    this.companyService = new CompanyService();
  }

  async getCompanies(req: Request, res: Response) {
    try {
      const errors = await new ErrorValidateCompanyDTO().validateGetCompany(
        req.body as GetCompanyDTO
      );
      if (errors !== undefined) {
        res.status(400).json({ errors });
        return;
      }
    } catch (error) {}
  }

  async createNewCompany(req: Request, res: Response) {
    try {
      const errors = await new ErrorValidateCompanyDTO().validateCreateCompany(
        req.body as CreateCompanyDTO
      );
      if (errors !== undefined) {
        res.status(400).json({ errors });
        return;
      }
      const user = await this.companyService.createUser(
        req.body as CreateCompanyDTO
      );
      if (!user) {
        throw new Error("cannot added this user");
      }
      res.status(201).json({
        data: user,
      });
    } catch (error) {
      throw error;
    }
  }
}
