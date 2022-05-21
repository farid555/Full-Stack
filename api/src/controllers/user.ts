import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
import bcrypt from 'bcrypt'

// POST /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new User(req.body)
    await UserService.create(user)
    res.json(user)
    console.log(req.body)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId

    const updatedUser = await UserService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({
      message: 'Update Failed',
      error: error,
    })
    console.log(error)
  }
}

// DELETE /users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body

    if (!email) {
      res.status(400)
      throw new BadRequestError('Invalid Request')
    }

    const user = await UserService.findByEmail(email)

    if (user) {
      res.json({
        _id: user._id,
        email: user.email,
        token: await UserService.generateToken(user._id),
        role: user.role,
      })
    } else {
      res.status(400)
      throw new BadRequestError('Invalid Request')
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// export const loginUserWithPassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, password } = req.body

//     if (!email || !password) {
//       res.status(400)
//       throw new BadRequestError('Invalid Request')
//     }

//     const user = await UserService.findByEmail(email)

//     if (user && await bcrypt.compare(password, user)) {

//       res.json({
//         _id: user._id,
//         email: user.email,
//         token: await UserService.generateToken(user._id),
//         role: user.role,
//       })
//     } else {
//       res.status(400)
//       throw new BadRequestError('Invalid Request')
//     }
//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', error))
//     } else {
//       next(error)
//     }
//   }
// }
