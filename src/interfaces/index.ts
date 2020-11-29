import { Callback, RequestMethod } from "../types";

export interface IFunctions<Chain> {
  body(): Chain;
  params(): Chain;
  required(): Chain;
  isNumber(): Chain;
  isBoolean(): Chain;
  isString(): Chain;
  isArray(message?: string): Chain;
  isAddress(): Chain;
  isRegExp(regex: RegExp): Chain;
  minLength(value: number): Chain;
  maxLength(value: number): Chain;
  isDate(): Chain;
  isEmail(): Chain;
  isPassword(): Chain;
  notEmpty(): Chain;
  includes<T>(array: T[], message?: string): Chain;
}

export interface IChain extends IFunctions<IChain> {
  (req: any, res: any, next: (error?: any) => void): void;
}

export interface IMethod {
  path: string; // Path to our method
  middlewares?: Callback[]; // Middleware for validition of method
}

export interface IRoute {
  path: string; // Path to our route
  requestMethod: RequestMethod; // HTTP Request method (get, post, patch, delete, put)
  methodName: string; // Method name within our class responsible for this route
  middlewares: Callback[]; // Middleware for validition of route
}
