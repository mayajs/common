import { IFunctions } from "../interfaces";
import { Utils } from "./utils";
import { Runner } from "./runner";

export class Functions<Chain> implements IFunctions<Chain> {
  private utils: Utils;
  constructor(private runner: Runner, private middleware: Chain) {
    this.utils = new Utils();
  }

  body(): Chain {
    this.runner.setReqType("body");
    return this.middleware;
  }

  params(): Chain {
    this.runner.setReqType("params");
    return this.middleware;
  }

  required(message?: string): Chain {
    const test = (field: any): boolean => {
      return this.utils.notUndefined(field) || this.utils.isObject(field) || Array.isArray(field);
    };
    this.runner.addValidation(test, "is required", { message, isOptional: false });
    return this.middleware;
  }

  isNumber(message?: string): Chain {
    const condition = (field: any): boolean => this.utils.number(field) && !isNaN(field);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a number", { message, isOptional: true });
    return this.middleware;
  }

  isBoolean(message?: string): Chain {
    const condition = (field: any): boolean => this.utils.boolean(field);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a boolean", { message, isOptional: true });
    return this.middleware;
  }

  isRegExp(regex: RegExp, message?: string): Chain {
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, regex);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, `not match the regexp pattern of ${regex}`, { message, isOptional: true });
    return this.middleware;
  }

  isString(message?: string): Chain {
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, /^[A-Za-z0-9.,\s]*$/);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a string or not a valid string format", { message, isOptional: true });
    return this.middleware;
  }

  isAddress(message?: string): Chain {
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, /^[a-zA-Z0-9#_\-.,()@\s]*$/);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a valid address format", { message, isOptional: true });
    return this.middleware;
  }

  minLength(value: number, message?: string): Chain {
    const condition = (field: any): boolean => (this.utils.number(field) ? field >= value : field.length >= value);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, `must have a length of ${value}`, { message, isOptional: true });
    return this.middleware;
  }

  maxLength(value: number, message?: string): Chain {
    const condition = (field: any): boolean => (this.utils.number(field) ? field <= value : field.length <= value);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, `must not exceed a length of ${value}`, { message, isOptional: true });
    return this.middleware;
  }

  isDate(message?: string): Chain {
    const condition = (field: any): boolean => {
      const date = new Date(field);
      return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime());
    };
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, `must be valid date format`, { message, isOptional: true });
    return this.middleware;
  }

  isEmail(message?: string): Chain {
    const validChars = /^[a-zA-Z0-9_.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, validChars);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a valid email", { message, isOptional: true });
    return this.middleware;
  }

  isPassword(message?: string): Chain {
    const validChars = /((?=.*\d)(?=.*[A-Z])(?=.*\W))/;
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, validChars);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a valid password", { message, isOptional: true });
    return this.middleware;
  }

  notEmpty(message?: string): Chain {
    const test = (field: any): boolean => (field !== null ? this.utils.validate(field, () => this.utils.sanitizeField(field).length > 0) : false);
    this.runner.addValidation(test, "is empty", { message, isOptional: true });
    return this.middleware;
  }

  isArray(message?: string): Chain {
    const test = (field: any): boolean => this.utils.validate(field, () => Array.isArray(field));
    this.runner.addValidation(test, "is not an array", { message, isOptional: true });
    return this.middleware;
  }

  includes<T>(array: T[], message?: string): Chain {
    const condition = (field: any) => {
      if (Array.isArray(field)) {
        const filtered = field.filter((e: any) => !array.includes(e));
        return filtered.length === 0;
      }

      return array.includes(field);
    };
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, `only accepts the following value(s) [ ${array.join(", ")} ]`, { message, isOptional: true });
    return this.middleware;
  }
}
