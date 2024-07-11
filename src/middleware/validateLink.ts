import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';

const validateLink = (linkSchema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await linkSchema.validate({
            body: req.body,
            query: req.query,
            params: req.params

        });
        next()
    } catch (e) {
        return res.sendStatus(400).send(e)
    }



}

export default validateLink


