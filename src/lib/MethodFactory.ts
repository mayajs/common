import { CONTROLLER_ROUTES } from "@mayajs/core";
import { IMethod, IRoute } from "./Interface";
import { RequestMethod } from "./Types";

/**
 * Factory function for a decorator that recieve a method type and return a MethodDecorator
 * @param method Type of method to be applied on the route ie: "get" | "post" | "delete" | "options" | "put" | "patch"
 * @returns Function(param: IMethod) => MethodDecorator
 */
export function MethodDecoratorFactory(method: RequestMethod): (param: IMethod) => MethodDecorator {
  return ({ path, middlewares = [] }: IMethod): MethodDecorator => {
    return (target: object, propertyKey: string | symbol): void => {
      // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
      // To prevent any further validation simply set it to an empty array here.
      if (!Reflect.hasMetadata(CONTROLLER_ROUTES, target.constructor)) {
        Reflect.defineMetadata(CONTROLLER_ROUTES, [], target.constructor);
      }

      // Get the routes stored so far, extend it by the new route and re-set the metadata.
      const routes = Reflect.getMetadata(CONTROLLER_ROUTES, target.constructor) as IRoute[];

      // Push current route object to existing routes
      routes.push({ methodName: String(propertyKey), middlewares, path, requestMethod: method });

      // Add routes metadata to the target object
      Reflect.defineMetadata(CONTROLLER_ROUTES, routes, target.constructor);
    };
  };
}
