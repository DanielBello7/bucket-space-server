import { Request, Response, NextFunction } from "express";

export interface _Request extends Request { user?: any; secret?: any; session: any }
export interface _Response extends Response { }
export interface _NextFunction extends NextFunction { }