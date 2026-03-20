import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateBody = (schema: AnyZodObject) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    schema.parse(req.body);
    next();
  };
};
