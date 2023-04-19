import {body} from "express-validator";

export const validatorsComment = body('content', ).isLength({
    min: 20,
    max: 300
}).withMessage('content')