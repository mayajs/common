export class Utils {
  sanitizeField(field: any): any {
    return this.NumberOrBoolean(field) ? field.toString() : field;
  }

  number(field: any): boolean {
    return this.checkVariableType(field, "number") && !isNaN(field);
  }

  boolean(field: any): boolean {
    return this.checkVariableType(field, "boolean");
  }

  string(field: any): boolean {
    return this.checkVariableType(field, "string");
  }

  notUndefined(field: any): boolean {
    return !this.checkVariableType(field, "undefined");
  }

  validate(field: any, callback: () => boolean): boolean {
    return this.fieldNotEmpty(field) ? callback() : true;
  }

  regExpTest(field: any, pattern: RegExp): boolean {
    return new RegExp(pattern).test(field);
  }

  private fieldNotEmpty(field: any): boolean {
    return this.notUndefined(field) && field !== null;
  }

  private checkVariableType(field: any, type: string): boolean {
    return typeof field === type;
  }

  private NumberOrBoolean(field: any): boolean {
    return this.number(field) || this.boolean(field);
  }
}
