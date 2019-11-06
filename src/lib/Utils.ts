export class Utils {
  sanitizeField(field: any): any {
    return this.NumberOrBoolean(field) ? field.toString() : field;
  }

  number(field: any): boolean {
    return this.checkVariableType(field, "number");
  }

  boolean(field: any): boolean {
    return this.checkVariableType(field, "boolean");
  }

  string(field: any): boolean {
    return this.checkVariableType(field, "string");
  }

  undefined(field: any): boolean {
    return !this.checkVariableType(field, "undefined");
  }

  validate(field: any, callback: () => boolean): boolean {
    return this.fieldEmpty(field) ? callback() : true;
  }

  regExpTest(field: any, pattern: RegExp): boolean {
    return new RegExp(pattern).test(field);
  }

  private fieldEmpty(field: any): boolean {
    const isNumber = this.number(field) ? field > 0 : false;
    return this.undefined(field) && field.length ? field.length > 0 : isNumber;
  }

  private checkVariableType(field: any, type: string): boolean {
    return typeof field === type;
  }

  private NumberOrBoolean(field: any): boolean {
    return this.number(field) || this.boolean(field);
  }
}
