import { MayaJsRequest } from "@mayajs/router";

export class Runner {
  private requestType: "body" | "params";
  private validations: any[] = [];

  constructor(private field: string) {
    this.requestType = "body";
  }

  setField(value: string): this {
    this.field = value;
    return this;
  }

  setReqType(value: "body" | "params"): this {
    this.requestType = value;
    return this;
  }

  addValidation(method: Function, message: string, options: { message?: string; isOptional: boolean }): void {
    this.validations.push({ method, message: options?.message ?? message, isOptional: options?.isOptional ?? false });
  }

  mapField(value: string, memo: any): any {
    try {
      return value.includes(".") ? this.mapField(value.split(".")[1], memo[value.split(".")[0]]) : memo[value];
    } catch (err) {
      return null;
    }
  }

  run(req: MayaJsRequest): { status: boolean; message?: string } {
    let error: Array<string | undefined> = [];

    if (this.validations.length > 0) {
      error = this.validations
        .map((validation) => {
          const field = this.mapField(this.field, req[this.requestType]);

          if (!validation.method(field, validation.isOptional)) {
            return `${this.requestType.toUpperCase()}[${this.field}] : ${validation.message}`;
          }
        })
        .filter((e) => typeof e !== "undefined");
    }

    return error.length > 0 ? { status: true, message: error.join(", ") } : { status: false, message: "" };
  }
}
