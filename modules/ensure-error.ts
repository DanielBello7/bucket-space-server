export default function ensureError(err: unknown): Error {
  if (err instanceof Error) return err;
  let stringified = '[couldnt stringify error]';
  try {
    stringified = JSON.stringify(err, Object.getOwnPropertyNames(err));
  } catch { }
  const error = new Error(`error occured: ${stringified}`);
  return error;
}
