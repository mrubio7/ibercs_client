type t = "json" | "form";
type PayloadType = "application/json" | "application/x-www-form-urlencoded";

export interface Payload {
  type: PayloadType;
  params: string | FormData;
}

const buildType = (t: t): PayloadType => {
  switch (t) {
    case "json":
      return "application/json";
    case "form":
      return "application/x-www-form-urlencoded";
  }
};

const buildParams = (tp: t, d: any): string | FormData => {
    if (tp === "json") {
      return JSON.stringify(d);
    } else {
      const formData = new FormData();
      Object.entries(d).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      return formData;
    }
  }

  export const BuildPayload = (tp: t, d: any): Payload => {
    const contentType = buildType(tp);
    const params = buildParams(tp, d);
  
    return {
      type: contentType,
      params,
    };
};
