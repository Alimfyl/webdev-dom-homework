import { comments } from "./comments.js";
import { initLikeListeners, initReplyListeners } from "./initListeners.js";
import { token, userName } from "./api.js"; 
import { renderLogin } from "./renderLogin.js"

const sanitize = (str) => str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export const renderComments = () => {
    const container = document.querySelector('.container');

    
    const commentsHTML = comments.map((comment, index) => {
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

    const actionHtml = token 
        ? `
        <div class="add-form" id="add-form">
            <!-- ИЗМЕНЕНИЕ 1: Подставляем реальное userName и оставляем readonly -->
            <input type="text" class="add-form-name" value="${userName}" readonly />
            <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
        </div>
        <div id="add-loader" class="loader" style="display: none;">Комментарий добавляется...</div>`
        : `
        <div class="login-alert">
            Чтобы добавить комментарий, <button class="link-button" id="login-link">авторизуйтесь</button>
        </div>`;

    container.innerHTML = `
        <ul class="comments">${commentsHTML}</ul>
        ${actionHtml}
    `;

    initLikeListeners(renderComments);
    initReplyListeners();

    if (!token) {
        
        const loginLink = document.getElementById("login-link");
        if (loginLink) {
            loginLink.addEventListener("click", () => {
                renderLogin(); 
            });
        }
    }
};
