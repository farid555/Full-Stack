import passport from 'passport'
import passportLocal from 'passport-local'
//declaration merging
import GoogleIdTokenStrategy from "passport-google-id-token"

import { Request, Response, NextFunction } from 'express'

import {  GOOGLE_CLIENT_ID } from "../util/secrets" 

//const LocalStrategy = passportLocal.Strategy

export const googleStrategy = GoogleIdTokenStrategy(
    { 
       clientId: GOOGLE_CLIENT_ID,
    },
     (parsedToken: any, googleId: any, done: any) =>{
         console.log("parsed token:", parsedToken);
         console.log("google token:", googleId);
         done(null, {})
         
     })

  
