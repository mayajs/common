import { Callback, DecoratorMethodOptions } from "@mayajs/router";

/**
 * Method factory options type
 */
export type MethodFactoryOptions = DecoratorMethodOptions | string;

/**
 * Method factory function type
 */
export type MethodFactory = { (path: DecoratorMethodOptions): MethodDecorator; (path: string, middlewares: Callback[]): MethodDecorator };
