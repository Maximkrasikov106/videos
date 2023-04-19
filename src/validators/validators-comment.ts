import {body, param} from "express-validator";
import {BlogsType, client, db} from "../DB";
import {ObjectId} from "bson";

export const validatorsComment = body('content', ).isLength({
    min: 20,
    max: 300
}).withMessage('content')

// export const commentYouValidate = param('id', ).custom( async (id) => {
// //     if (ObjectId.isValid(id)) {
// //         let o_id = new ObjectId(id);
// //         let comment = await db.collection('comments').findOne({_id: o_id})
// //         if (comment == user?._id) {
// //             throw new Error('id');
// //         } else {
// //             return true;
// //         }
// //     }
// // }).withMessage('blogId')