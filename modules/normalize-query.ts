import ensureError from "./ensure-error";

function normalizeQueryString(item: unknown): string {
  try {
    const response = JSON.stringify(item);
    return response;
  } catch (error) {
    const err = ensureError(error);
    throw err;
  }
}

function normalizeQueryInt(item: unknown): number {
  try {
    const response = JSON.stringify(item);
    return parseInt(response);
  } catch (error) {
    const err = ensureError(error);
    throw err;
  }
}

export {
  normalizeQueryInt, normalizeQueryString
}