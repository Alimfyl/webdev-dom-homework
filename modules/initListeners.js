import { comments } from "./comments.js";

export const initLikeListeners = (renderComments) => {
         const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", () => {
            const index = likeButton.dataset.index;
            const comment = comments[index];

            if (comment.isLiked) {
                comment.likes--;
                comment.isLiked = false;
            } else {
                comment.likes++;
                comment.isLiked = true;
            }

            renderComments();
        });
    }

}
export const initReplyListeners = () => {
    const commentsList = document.querySelector(".comments");
    addButton.addEventListener("click", () => {
   const name = nameInput.value.trim();
   const text = commentInput.value.trim();

   if (name === "" || text === "") return;

   const now = new Date();
   const dateString = now.toLocaleString('ru-RU', {
       day: "2-digit", month: "2-digit", year: "2-digit",
       hour: "2-digit", minute: "2-digit"
   }).replace(',', '');

   comments.push({
       name: name,
       date: dateString,
       text: text,
       likes: 0,
       isLiked: false
    })
    
    renderComments();

    nameInput.value = "";
    commentInput.value = "";
});
}