import { Request, Response } from "express";
import { SicCodeService } from "../services/SicCodeService";
import { loggerInstance } from "../utils/Logger";
import CombinedSicActivitiesApiModel from "../models/CombinedSicActivitiesApiModel";

export class SicSearchController {
  private sicCodeService: SicCodeService;

  constructor(sicCodeService: SicCodeService) {
    this.sicCodeService = sicCodeService;
  }

  public renderView = (req: Request, res: Response) => {
    res.render("index", {
      searchText: "",
      matches: undefined,
      matchOptions: "or",
    });
  };

  public search = async (req: Request, res: Response) => {
    const matchOptions = req.body.matchOptions ?? "or";
    let matchPhrase = false;
    if (matchOptions === "and") {
      matchPhrase = true;
    }

    try {
      const searchResults = await this.sicCodeService.search(
        req.body.sicCodeSearchName,
        matchPhrase
      );

      res.render("index", {
        searchText: req.body.sicCodeSearchName,
        matches: this.format(searchResults),
        matchOptions: matchOptions,
      });
    } catch (error) {
      loggerInstance().error(`Error: ${error.message}`);
      res.render("index", {
        searchText: req.body.sicCodeSearchName,
        matchOptions: matchOptions,
        errors: error,
      });
    }
  };

  private format(searchResults: CombinedSicActivitiesApiModel[]) {
    return searchResults.map((obj, index) => [
      {
        text: obj.sic_code,
        attributes: { id: "sic_code_data_" + (index + 1) }
      },
      {
        text: obj.sic_description,
        attributes: { id: "sic_description_data_" + (index + 1) }
      },
      {
        text: obj.activity_description,
        attributes: { id: "activity_description_data_" + (index + 1) }
      },
    ]);
  }
}
