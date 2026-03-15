import { fetchComments, postComment } from "./modules/api.js";
import { setComments } from "./modules/comments.js";
import { renderComments } from "./modules/renderComments.js";

const addButton = document.querySelector(".add-form-button");
const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
// Элементы для лоадеров (добавь эти ID в свой HTML)
const listLoader = document.getElementById("load-label"); // Надпись "Загрузка списка..."
const addForm = document.querySelector(".add-form");       // Сама форма
const addLoader = document.getElementById("add-loader");   // Надпись "Комментарий добавляется..."

const getAndRenderComments = () => {
    return fetchComments()
        .then((data) => {
            // Убираем вложенный then, возвращаем Promise.all в цепочку
            if (data.comments.length === 0) {
                return Promise.all([
                    postComment("Это будет первый комментарий", "Глеб Фокин"),
                    postComment("Мне нравится оформление! ❤", "Варвара Н.")
                ]).then(() => fetchComments()); // Повторный запрос после создания
            }
            return data;
        })
        .then((data) => {
            const appComments = data.comments.map((comment) => ({
                name: comment.author.name,
                date: new Date(comment.date).toLocaleString().slice(0, -3),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            }));

            setComments(appComments);
            renderComments();
            
            // Скрываем лоадер списка после первой загрузки
            if (listLoader) listLoader.style.display = "none";
        })
        .catch((error) => {
            alert("Ошибка загрузки: " + error.message);
        });
};

getAndRenderComments();

addButton.addEventListener("click", () => {
    const trimmedName = nameInput.value.trim();
    const trimmedText = commentInput.value.trim();

    if (!trimmedName || !trimmedText) return;

    // Сценарий добавления: скрываем форму, показываем лоадер
    addForm.style.display = "none";
    addLoader.style.display = "block";

    postComment(trimmedText, trimmedName)
        .then(() => {
            // Возвращаем вызов функции в цепочку (плоская структура)
            return getAndRenderComments();
        })
        .then(() => {
            // Возвращаем форму в исходное состояние
            addForm.style.display = "flex";
            addLoader.style.display = "none";
            nameInput.value = "";
            commentInput.value = "";
        })
        .catch((error) => {
            // В случае ошибки тоже возвращаем форму, чтобы пользователь мог исправить текст
            addForm.style.display = "flex";
            addLoader.style.display = "none";
            alert("Ошибка: " + error.message);
        });
});
