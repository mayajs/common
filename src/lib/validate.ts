import { MayaJsNextFunction, MayaJsRequest, MayaJsResponse } from "@mayajs/router";
import { Runner, Container, Functions } from "../utils";
import { IChain } from "../interfaces";

/**
 * Checks specified field for validation
 * @param fieldName name of the field to be checked
 */
export function Check(fieldName: string): IChain {
  const runner = new Runner(fieldName);
  const middleware: any = (req: MayaJsRequest, res: MayaJsResponse, next: MayaJsNextFunction) => {
    const error = runner.run(req);
    if (error.status) {
      res.send({ status: "Validation Error", message: error.message });
    } else {
      next();
    }
  };
  return Object.assign(middleware, Container(new Functions<IChain>(runner, middleware)));
}
