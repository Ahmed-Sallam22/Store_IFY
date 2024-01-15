export const user=joi.object({
    userId:generalFields.id,
}).required()