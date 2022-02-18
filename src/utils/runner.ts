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

  addValidation(method: Function, message: string, customMessage?: string): void {
    this.validations.push({ method, message: customMessage ?? message });
  }

  run(req: MayaJsRequest): { status: boolean; message?: string } {
    let error: Array<string | undefined> = [];
    if (this.validations.length > 0) {
      error = this.validations
        .map((validation) => {
          const mapField: any = (value: string, memo: any) => {
            return value.includes(".") ? mapField(value.split(".")[1], memo[value.split(".")[0]]) : memo[value];
          };

          const field = mapField(this.field, req[this.requestType]);

          if (!validation.method(field)) {
            return `${this.requestType.toUpperCase()}[${this.field}] : ${validation.message}`;
          }
        })
        .filter((e) => typeof e !== "undefined");
    }
    return error.length > 0 ? { status: true, message: error.join(", ") } : { status: false, message: "" };
  }
}
