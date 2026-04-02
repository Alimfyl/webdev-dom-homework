import { fetchComments, postComment } from "./modules/api.js";
import { setComments } from "./modules/comments.js";
import { renderComments } from "./modules/renderComments.js";
import {initReplyListeners} from"./modules/initListeners.js"

export const getAndRenderComments = () => {
    return fetchComments()
        .then((data) => {
            const appComments = data.comments.map((comment) => ({
                name: comment.author.name,
                date: new Date(comment.date).toLocaleString().slice(0, -3),
                text: comment.text,
                likes: comment.likes,
                isLiked: comment.isLiked,
            }));

            setComments(appComments);
            renderComments(); 
            subscribeToAddEvents();
            initReplyListeners();
        })
        .catch((error) => {
            console.error(error);
            if (error.message === "Failed to fetch") {
                alert("Интернет упал");
            } else {
                alert(error.message);
            }
        });
};

const subscribeToAddEvents = () => {
    const addButton = document.querySelector(".add-form-button");
    const commentInput = document.querySelector(".add-form-text");

    if (!addButton) return;

    addButton.addEventListener("click", () => {
        const trimmedText = commentInput.value.trim();

        if (trimmedText.length < 3) {
            alert("Комментарий должен быть не короче 3 символов");
            return;
        }
        
        const addForm = document.querySelector(".add-form");
        const addLoader = document.getElementById("add-loader");

        addForm.style.display = "none";
        addLoader.style.display = "block";

        postComment(trimmedText)
            .then(() => {
                return getAndRenderComments();
            })
            .then(() => {
                
                if (commentInput) commentInput.value = "";
            })
            .catch((error) => {
                addForm.style.display = "flex";
                addLoader.style.display = "none";
                alert(error.message);
            });
    });
};


getAndRenderComments();
