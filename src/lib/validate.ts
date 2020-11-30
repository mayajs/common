// EXTERNAL IMPORTS
import "reflect-metadata";
import { NextFunction, Request, Response } from "@mayajs/core";

// LOCAL IMPORTS
import { Runner, Container, Functions } from "../utils";
import { IChain } from "../interfaces";

/**
 * Checks specified field for validation
 * @param fieldName name of the field to be checked
 */
export function Check(fieldName: string): IChain {
  const runner = new Runner(fieldName);
  const middleware: any = (req: Request, res: Response, next: NextFunction) => {
    const error = runner.run(req);
    if (error.status) {
      res.status(403).json({ status: "Validation Error", message: error.message });
    } else {
      next();
    }
  };
  return Object.assign(middleware, Container(new Functions<IChain>(runner, middleware)));
}
