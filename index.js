import { fetchComments, postComment } from "./modules/api.js";
import { setComments } from "./modules/comments.js";
import { renderComments } from "./modules/renderComments.js";

const addButton = document.querySelector(".add-form-button");
const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const listLoader = document.getElementById("load-label"); 
const addForm = document.querySelector(".add-form");       
const addLoader = document.getElementById("add-loader");   

const handleError = (error) => {
    if (error.message === "Failed to fetch") {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
    } else if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
    } else if (error.message === "Имя и комментарий должны быть не короче 3 символов") {
        alert(error.message);
    } else {
        alert("Произошла неизвестная ошибка, попробуйте позже");
    }
};

const getAndRenderComments = () => {
    return fetchComments()
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
            if (listLoader) listLoader.style.display = "none";
        })
        .catch((error) => {
            handleError(error);
        });
};

getAndRenderComments();

addButton.addEventListener("click", () => {
    const trimmedName = nameInput.value.trim();
    const trimmedText = commentInput.value.trim();

    if (trimmedName.length < 3 || trimmedText.length < 3) {
        alert("Имя и комментарий должны быть не короче 3 символов");
        return;
    }

    addForm.style.display = "none";
    addLoader.style.display = "block";

    postComment(trimmedText, trimmedName)
        .then(() => {
            return getAndRenderComments();
        })
        .then(() => {
            addForm.style.display = "flex";
            addLoader.style.display = "none";
            nameInput.value = "";
            commentInput.value = "";
        })
        .catch((error) => {
            addForm.style.display = "flex";
            addLoader.style.display = "none";
            handleError(error);
        });
});
