import { Request, Response, NextFunction } from "express";

export interface _Request extends Request { user?: any; secret?: any; session: any }
export interface _Response extends Response { }
export interface _NextFunction extends NextFunction { }

export interface INITIALIZER {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface USER extends INITIALIZER {
  email: string
  name: string
  password: string
  username: string
}

export interface ADMIN extends INITIALIZER {
  userId: string
  level: number
}

export interface CONSUMER extends INITIALIZER {
  userId: string
  bio: string | null
  avatar: string | null
} 
