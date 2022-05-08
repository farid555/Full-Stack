import {Request, Response, NextFunction} from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ForbiddenError } from "../helpers/apiError";
import { JWT_SECRET } from "../util/secrets";


export default async function protect (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        let token: string | null = null;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(' ')[1]
                
                const decoded: string | JwtPayload = jwt.verify(token, JWT_SECRET)

                next()
            } catch(error) {
                console.log(error)
                res.status(401)
                throw new ForbiddenError('Not Authorized')
            }
        }
        if(!token) {
            res.status(401)
            throw new ForbiddenError('Forbidden')
        }
    } catch(error) {
        if (error instanceof Error) {
            next(new ForbiddenError('Forbidden', error))
          } else {
            next(error)
          }
    }
}