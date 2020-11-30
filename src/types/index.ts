import { Callback } from "@mayajs/core/types";
import { IMethod } from "../interfaces";

/**
 * Method factory options type
 */
export type MethodFactoryOptions = IMethod | string | undefined;

/**
 * Method factory function type
 */
export type MethodFactory = (param: MethodFactoryOptions, middlewares?: Callback[]) => MethodDecorator;
