import { CONTROLLER_ROUTES, Callback, RequestMethod, DecoratorMethodOptions } from "@mayajs/core";
import { MethodFactory } from "../types";

/**
 * Factory function for a decorator that recieve a method type and return a MethodDecorator
 *
 * @param method Type of method to be applied on the route ie: "GET" | "POST" | "DELETE" | "OPTIONS" | "PUT" | "PATCH"
 * @returns Function(param: DecoratorMethodOptions) => MethodDecorator
 */
export function MethodDecoratorFactory(requestMethod: RequestMethod): MethodFactory {
  function RequestMethodFactory(path: DecoratorMethodOptions): MethodDecorator;
  function RequestMethodFactory(path: string, middlewares: Callback[]): MethodDecorator;
  function RequestMethodFactory(path: any = "", middlewares: any = null): any {
    // Check if options is a string
    if (typeof path === "string") {
      // Set path to options if not undefined else set it to empty string
      path = path ?? "";
    }

    // Check if options is an object and also not an array
    if (typeof path === "object" && !Array.isArray(path)) {
      // Set path to path.path if not undefined else set it to empty string
      path = path.path ?? "";
      // Set middlewares to path.middlewares if not undefined else set it to empty array
      middlewares = path.middlewares ?? [];
    }

    return (target: object, propertyKey: string | symbol): void => {
      // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
      // To prevent any further validation simply set it to an empty array here.
      if (!Reflect.hasMetadata(CONTROLLER_ROUTES, target.constructor)) {
        Reflect.defineMetadata(CONTROLLER_ROUTES, [], target.constructor);
      }

      // Get the routes stored so far, extend it by the new route and re-set the metadata.
      const routes = Reflect.getMetadata(CONTROLLER_ROUTES, target.constructor) as any[];

      routes.push({ methodName: propertyKey as string, middlewares, path, requestMethod });

      // Add routes metadata to the target object
      Reflect.defineMetadata(CONTROLLER_ROUTES, routes, target.constructor);
    };
  }

  return RequestMethodFactory;
}
