import { comments } from "./comments.js";

export const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
            <div class="comment-header">
                <div>${sanitize(comment.name)}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${sanitize(comment.text)}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
                </div>
            </div>
        </li>`;
    }).join("");

    commentsList.innerHTML = commentsHtml;
    initLikeButtons();
};

