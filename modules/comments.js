export const commentsList = document.querySelector(".comments");
export const comments = [];
export const setComments = (newComments) => {
    comments.splice(0, comments.length);
    comments.push(...newComments);
};
