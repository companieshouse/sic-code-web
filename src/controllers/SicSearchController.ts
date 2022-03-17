import { NextFunction, Request, Response } from "express";
import e = require("express");

export class SicSearchController {

    public renderView = (req: Request, res: Response) => {
        console.log("in render view");
        res.render("index", {searchText: "", matches: undefined, matchOptions: "or"});
    };
}