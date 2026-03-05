import { comments, commentsList } from "./comments.js";
import { initLikeListeners, initReplyListeners } from "./initListeners.js";

const sanitize = (str) => str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
            <div class="comment-header">
                <div>${sanitize(comment.name)}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text" style="white-space:pre-line">${sanitize(comment.text)}</div>
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
    
   
    initLikeListeners(renderComments); 
    initReplyListeners();
};
