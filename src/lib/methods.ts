import "reflect-metadata";
import { Callback, DecoratorMethodOptions, MethodNames } from "@mayajs/router";
import { MethodDecoratorFactory } from "../utils/method-factory";

/**
 * GET Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Get(properties: Callback[]): MethodDecorator;
export function Get(properties?: DecoratorMethodOptions): MethodDecorator;
export function Get(properties: string, middlewares?: Callback[]): MethodDecorator;
export function Get(properties: any, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory(MethodNames.get)(properties, middlewares);
}

/**
 * POST Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Post(properties: Callback[]): MethodDecorator;
export function Post(properties?: DecoratorMethodOptions): MethodDecorator;
export function Post(properties: string, middlewares?: Callback[]): MethodDecorator;
export function Post(properties: any, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory(MethodNames.post)(properties, middlewares);
}

/**
 * PATCH Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Patch(properties: Callback[]): MethodDecorator;
export function Patch(properties?: DecoratorMethodOptions): MethodDecorator;
export function Patch(properties: string, middlewares?: Callback[]): MethodDecorator;
export function Patch(properties: any, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory(MethodNames.patch)(properties, middlewares);
}

/**
 * PUT Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Put(properties: Callback[]): MethodDecorator;
export function Put(properties?: DecoratorMethodOptions): MethodDecorator;
export function Put(properties: string, middlewares?: Callback[]): MethodDecorator;
export function Put(properties: any, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory(MethodNames.put)(properties, middlewares);
}

/**
 * DELETE Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Delete(properties: Callback[]): MethodDecorator;
export function Delete(properties?: DecoratorMethodOptions): MethodDecorator;
export function Delete(properties: string, middlewares?: Callback[]): MethodDecorator;
export function Delete(properties: any, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory(MethodNames.delete)(properties, middlewares);
}

/**
 * OPTIONS Method Decorator
 * @param properties - Sets the properties of the method.
 * @param properties.path - Sets the path of the route.
 * @param properties.middlewares - Sets an array of middlewares for this method.
 */
export function Options(properties: Callback[]): MethodDecorator;
export function Options(properties?: DecoratorMethodOptions): MethodDecorator;
export function Options(properties: string, middlewares?: Callback[]): MethodDecorator;
export function Options(properties: any, middlewares: Callback[] = []): MethodDecorator {
  return MethodDecoratorFactory(MethodNames.options)(properties, middlewares);
}
