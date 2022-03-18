import { NextFunction, Request, Response } from "express";
import e = require("express");

export class SicSearchController {

    public renderView = (req: Request, res: Response) => {
        console.log("in render view");
        res.render("index", {searchText: "", matches: undefined, matchOptions: "or"});
    };

    public search = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Searching for SIC codes using [" + req.body.sicCodeSearchName + "], matchOptions = [" + req.body.matchOptions + "] " );

        const matchOptions = req.body.matchOptions ?? "or";
        let matchPhrase = false;
        if (matchOptions === "and") {
            matchPhrase = true;
        }

}