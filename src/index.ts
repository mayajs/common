import { NextFunction, Request, Response } from "express";

import { IChain } from "./lib/Interface";
import { Functions } from "./lib/Functions";
import { Runner } from "./lib/Runner";
import { Container } from "./lib/Container";

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
