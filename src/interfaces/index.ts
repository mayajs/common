export interface IFunctions<Chain> {
  body(): Chain;
  params(): Chain;
  required(message?: string): Chain;
  isNumber(message?: string): Chain;
  isBoolean(message?: string): Chain;
  isString(message?: string): Chain;
  isArray(message?: string): Chain;
  isAddress(message?: string): Chain;
  isRegExp(regex: RegExp, message?: string): Chain;
  minLength(value: number, message?: string): Chain;
  maxLength(value: number, message?: string): Chain;
  isDate(message?: string): Chain;
  isEmail(message?: string): Chain;
  isPassword(message?: string): Chain;
  notEmpty(message?: string): Chain;
  includes<T>(array: T[], message?: string): Chain;
}

export interface IChain extends IFunctions<IChain> {
  (req: any, res: any, next: (error?: any) => void): void;
}
