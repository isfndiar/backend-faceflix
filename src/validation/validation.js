import { ResponseError } from "../exception/response-error.js";

export async function validation(schema, request, callback = null) {
  const result = schema.validate(request, { abortEarly: false });
  if (result.error) {
    if (callback && typeof callback === "function") {
      callback();
    }
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
}
