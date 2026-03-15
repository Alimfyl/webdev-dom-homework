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
            
            commentInput.value = `> ${comment.text}\n\n${comment.name}, `;
            
            commentInput.scrollIntoView({ behavior: 'smooth' });
            commentInput.focus();
        });
    }
};
export const initValidationListeners = () => {
    const inputs = document.querySelectorAll(".add-form-name, .add-form-text");
    for (const input of inputs) {
        input.addEventListener("input", () => {
            input.classList.remove("error"); 
        });
    }
};