import { fetchComments, postComment } from "./modules/api.js";
import { setComments } from "./modules/comments.js";
import { renderComments } from "./modules/renderComments.js";

const addButton = document.querySelector(".add-form-button");
const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");


const getAndRenderComments = () => {
    return fetchComments().then((data) => {
        
        if (data.comments.length === 1) {
            return Promise.all([
                postComment("Это будет первый комментарий на этой странице", "Глеб Фокин"),
                postComment("Мне нравится как оформлена эта страница! ❤", "Варвара Н.")
            ]).then(() => getAndRenderComments()); 
        }

       
        const appComments = data.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: new Date(comment.date).toLocaleString().slice(0, -3),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });

        setComments(appComments); // Сохраняем в модуль данных
        renderComments();         // Рисуем (слушатели внутри этой функции)
    });
};

// Запуск при загрузке страницы
getAndRenderComments();

// Логика добавления нового комментария
addButton.addEventListener("click", () => {
    const trimmedName = nameInput.value.trim();
    const trimmedText = commentInput.value.trim();

    if (!trimmedName || !trimmedText) return;

    addButton.disabled = true;
    addButton.textContent = "Добавление...";

    postComment(trimmedText, trimmedName)
        .then(() => {
            return getAndRenderComments(); 
        })
        .then(() => {
            addButton.disabled = false;
            addButton.textContent = "Написать";
            nameInput.value = "";
            commentInput.value = "";
        })
        .catch((error) => {
            addButton.disabled = false;
            addButton.textContent = "Написать";
            alert("Ошибка: " + error.message);
        });
});
