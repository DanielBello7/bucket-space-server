export type JSON_ABLE = string | number | boolean | null | undefined | readonly JSON_ABLE[] | { readonly [key: string]: JSON_ABLE } | { toJSON(): JSON_ABLE }
interface APIErrorOptions {
  cause?: Error
  context?: JSON_ABLE
}

class APIError extends Error {
  public readonly statusCode: number;
  public readonly context?: JSON_ABLE;

  constructor(status: number, msg: string, options: APIErrorOptions = {}) {
    super(msg)
    this.name = this.constructor.name;
    this.context = options.context;
    this.statusCode = status;

  }
}

export default APIError;
