import { NextFunction, Request, Response } from "express";
import { SicCodeService } from "../services/SicCodeService";
import e = require("express");
import CombinedSicActivitiesApiModel from "../models/CombinedSicActivitiesApiModel"


export class SicSearchController {

    private sicCodeService: SicCodeService;

    constructor(sicCodeService: SicCodeService) {
        this.sicCodeService = sicCodeService;
    }

    public renderView = (req: Request, res: Response) => {
        console.log("in render view");
        res.render("index", {searchText: "", matches: undefined, matchOptions: "or"});
    };

    public search = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);

        console.log("Searching for SIC codes using [" + req.body.sicCodeSearchName + "], matchOptions = [" + req.body.matchOptions + "] " );

        const matchOptions = req.body.matchOptions ?? "or";
        let matchPhrase = false;
        if (matchOptions === "and") {
            matchPhrase = true;
        }

        try {
            const searchResults = await this.sicCodeService.search(req.body.sicCodeSearchName, matchPhrase);

            res.render("index", {searchText: req.body.sicCodeSearchName, matches: this.format(searchResults), matchOptions: matchOptions});

        }
        catch (error) {
            console.log("error", error.message);     
            res.render("index", {searchText: req.body.sicCodeSearchName, matchOptions: matchOptions, errors: error});
        }
        finally {
            console.log("finally called");
        }
    }

    private format(searchResults: CombinedSicActivitiesApiModel[]) {
        return searchResults.map(obj => [{
            text: obj.sic_code
        }, {
            text: obj.sic_description
        }, {
            text: obj.activity_description
        }]);
    }

}