import { mediaFileTransformer } from "./mediaFiles"
import { userTransformer } from "./user"
import human from "human-time"

export const postTransformer = (post) => {
    return {
        id: post.id,
        text: post.text,
        mediaFiles: !!post.mediaFiles ? post.mediaFiles.map(mediaFileTransformer) : [],
        author: !!post.author ? userTransformer(post.author) : null,
        replies: !!post.replies ? post.replies.map(postTransformer) : [],
        replyTo: !!post.replyTo ? postTransformer(post.replyTo) : null,
        repliesCount: !!post.replies ? post.replies.length : 0,
        postedAtHuman: human(post.createdAt)
    }
}