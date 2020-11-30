// EXTERNAL IMPORTS
import "reflect-metadata";
import { Callback } from "@mayajs/core/types";

// LOCAL IMPORTS
import { MethodFactoryOptions } from "../types";
import { MethodDecoratorFactory } from "../lib";

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
