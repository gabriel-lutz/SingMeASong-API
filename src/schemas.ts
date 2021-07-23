import joi from "joi"

const youtubeLinkPattern = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/

export const recommendationBody = joi.object({
    name: joi.string().min(3).required().trim(),
    youtubeLink: joi.string().regex(youtubeLinkPattern).required().trim()
})