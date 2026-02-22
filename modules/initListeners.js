
import { comments } from "./comments.js";

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            const comment = comments[index];

            comment.isLiked ? comment.likes-- : comment.likes++;
            comment.isLiked = !comment.isLiked;

            renderComments();
        });
    }
};

export const initReplyListeners = () => {
    const commentElements = document.querySelectorAll(".comment");
    const commentInput = document.querySelector(".add-form-text");

    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            const comment = comments[index];
            commentInput.value = `> ${comment.text}\n\n${comment.name}, `;
        });
    }
};