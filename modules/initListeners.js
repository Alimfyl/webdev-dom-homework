import { comments } from "./comments.js";

export const initLikeListeners = (render) => {
    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            const comment = comments[index];

            comment.isLiked ? comment.likes-- : comment.likes++;
            comment.isLiked = !comment.isLiked;

            render();
        });
    }
};

export const initReplyListeners = () => {
    const commentElements = document.querySelectorAll(".comment");
    const commentInput = document.querySelector(".add-form-text");
    if (!commentInput) return;

    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            const comment = comments[index];
            commentInput.value = `QUOTE_BEGIN ${comment.text}\n${comment.name} QUOTE_END\n\n`;
            commentInput.focus();
        });
    }
};