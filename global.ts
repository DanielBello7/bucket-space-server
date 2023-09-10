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

export interface POSTS extends INITIALIZER {
  text: string
  likes: number
  comments: number
  isBlocked: boolean
  themes: string[]
  createdBy: string
}

export interface COMMENTS extends INITIALIZER {
  text: string
  createdBy: string
  postId: string
}

export interface SESSIONS extends INITIALIZER {
  token: string
  email: string
}

export interface CONSUMER_LIKED_POSTS extends INITIALIZER {
  consumerId: string
  postId: string
}

export interface CONSUMER_THEMES extends INITIALIZER {
  consumerId: string
  themeId: string
}

export interface THEMES extends INITIALIZER {
  title: string
  brief: string
  synonyms: string[]
  before: string[]
  after: string[]
}

export interface VIEWED_POSTS extends INITIALIZER {
  postId: string
  consumerId: string
}
