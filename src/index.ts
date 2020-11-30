// EXTERNAL IMPORTS
import "reflect-metadata";
import { NextFunction, Request, Response } from "@mayajs/core";
import { Callback } from "@mayajs/core/types";

// LOCAL IMPORTS
import { Runner, Container, Functions } from "./utils";
import { MethodFactoryOptions } from "./types";
import { MethodDecoratorFactory } from "./lib";
import { IChain } from "./interfaces";

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

/**
 * GET Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Get(properties?: MethodFactoryOptions, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory("get")(properties, middlewares);
}

/**
 * POST Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Post(properties?: MethodFactoryOptions, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory("post")(properties, middlewares);
}

/**
 * PATCH Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Patch(properties?: MethodFactoryOptions, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory("patch")(properties, middlewares);
}

/**
 * PUT Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Put(properties?: MethodFactoryOptions, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory("put")(properties, middlewares);
}

/**
 * DELETE Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Delete(properties?: MethodFactoryOptions, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory("delete")(properties);
}
