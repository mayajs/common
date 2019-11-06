import { Runner } from "./Runner";
import { IFunctions } from "./Interface";
import { Utils } from "./Utils";

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

  required(): Chain {
    const test = (field: any): boolean => this.utils.undefined(field);
    this.runner.addValidation(test, "is required");
    return this.middleware;
  }

  isNumber(): Chain {
    const condition = (field: any): boolean => this.utils.number(field) && !isNaN(field);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a number");
    return this.middleware;
  }

  isBoolean(): Chain {
    const condition = (field: any): boolean => this.utils.boolean(field);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a boolean");
    return this.middleware;
  }

  isRegExp(regex: RegExp): Chain {
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, regex);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, `not match the regexp pattern of ${regex}`);
    return this.middleware;
  }

  isString(): Chain {
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, /^[A-Za-z0-9.,\s]*$/);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a string or not a valid string format");
    return this.middleware;
  }

  isAddress(): Chain {
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, /^[a-zA-Z0-9#_\-.,()@\s]*$/);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a valid address format");
    return this.middleware;
  }

  minLength(value: number): Chain {
    const test = (field: any): boolean => this.utils.validate(field, () => field.length >= value);
    this.runner.addValidation(test, `must have a length of ${value}`);
    return this.middleware;
  }

  maxLength(value: number): Chain {
    const test = (field: any): boolean => this.utils.validate(field, () => field.length <= value);
    this.runner.addValidation(test, `must be ${value} in length or fewer`);
    return this.middleware;
  }

  isDate(): Chain {
    const condition = (field: any): boolean => {
      const date = new Date(field);
      return Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime());
    };
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, `must be valid date format`);
    return this.middleware;
  }

  isEmail(): Chain {
    const validChars = /^[a-zA-Z0-9_.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, validChars);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a valid email");
    return this.middleware;
  }

  isPassword(): Chain {
    const validChars = /((?=.*\d)(?=.*[A-Z])(?=.*\W))/;
    const condition = (field: any) => this.utils.string(field) && this.utils.regExpTest(field, validChars);
    const test = (field: any): boolean => this.utils.validate(field, () => condition(field));
    this.runner.addValidation(test, "is not a valid password");
    return this.middleware;
  }

  notEmpty(): Chain {
    const test = (field: any): boolean => (this.utils.undefined(field) ? this.utils.sanitizeField(field).length > 0 : true);
    this.runner.addValidation(test, "is emtpy");
    return this.middleware;
  }
}
