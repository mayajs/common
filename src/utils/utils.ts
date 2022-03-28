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

  notNull(field: any): boolean {
    return field !== null;
  }

  validate(field: any, callback: () => boolean, isOptional = true): boolean {
    return this.notUndefinedOrNull(field) ? callback() : isOptional;
  }

  regExpTest(field: any, pattern: RegExp): boolean {
    return new RegExp(pattern).test(field);
  }

  isObject(field: any) {
    return this.checkVariableType(field, "object");
  }

  notUndefinedOrNull(field: any): boolean {
    return this.notUndefined(field) && this.notNull(field);
  }

  private checkVariableType(field: any, type: string): boolean {
    return typeof field === type;
  }

  private NumberOrBoolean(field: any): boolean {
    return this.number(field) || this.boolean(field);
  }
}
