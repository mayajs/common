import { Callback, RequestMethod } from "@mayajs/core/types";
import { CONTROLLER_ROUTES } from "@mayajs/core/utils/constants";
import { MethodFactory, MethodFactoryOptions } from "../types";
import { IRoute } from "../interfaces";

/**
 * Factory function for a decorator that recieve a method type and return a MethodDecorator
 *
 * @param method Type of method to be applied on the route ie: "get" | "post" | "delete" | "options" | "put" | "patch"
 * @returns Function(param: IMethod) => MethodDecorator
 */
export function MethodDecoratorFactory(method: RequestMethod): MethodFactory {
  return (options: MethodFactoryOptions = "", middlewares: Callback[] = []): MethodDecorator => {
    // Initital path string
    let path = "";

    // Check if options is a string
    if (typeof options === "string") {
      // Set path to options if not undefined else set it to empty string
      path = options ?? "";
    }

    // Check if options is an object and also not an array
    if (typeof options === "object" && !Array.isArray(options)) {
      // Set path to options.path if not undefined else set it to empty string
      path = options.path ?? "";
      // Set middlewares to options.middlewares if not undefined else set it to empty array
      middlewares = options.middlewares ?? [];
    }

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
