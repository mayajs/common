import "reflect-metadata";
import { NextFunction, Request, Response } from "express";

import { Runner } from "./lib/Runner";
import { IChain } from "./lib/Interface";
import { Functions } from "./lib/Functions";
import { Container } from "./lib/Container";
import { MethodDecoratorFactory } from "./lib/MethodFactory";

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

/**
 * GET Method Decorator
 * @param properties - Sets the path and validation for this method.
 */
export function Get(properties: { path: string; middlewares?: Array<(...args: any[]) => void> }): MethodDecorator {
  return MethodDecoratorFactory("get")(properties);
}

/**
 * POST Method Decorator
 * @param properties - Sets the path and validation for this method.
 */
export function Post(properties: { path: string; middlewares?: Array<(...args: any[]) => void> }): MethodDecorator {
  return MethodDecoratorFactory("post")(properties);
}

/**
 * PATCH Method Decorator
 * @param properties - Sets the path and validation for this method.
 */
export function Patch(properties: { path: string; middlewares?: Array<(...args: any[]) => void> }): MethodDecorator {
  return MethodDecoratorFactory("patch")(properties);
}

/**
 * PUT Method Decorator
 * @param properties - Sets the path and validation for this method.
 */
export function Put(properties: { path: string; middlewares?: Array<(...args: any[]) => void> }): MethodDecorator {
  return MethodDecoratorFactory("put")(properties);
}

/**
 * DELETE Method Decorator
 * @param properties - Sets the path and validation for this method.
 */
export function Delete(properties: { path: string; middlewares?: Array<(...args: any[]) => void> }): MethodDecorator {
  return MethodDecoratorFactory("delete")(properties);
}
