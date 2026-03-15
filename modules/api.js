const host = "https://wedev-api.sky.pro/api/v1/almer-ishkmyhametov-new";

export const fetchComments = () => {
    return fetch(host + "/comments", {
        method: "GET",
    }).then((res) => {
        if (res.status === 500) {
            throw new Error("Сервер сломался");
        }
        return res.json();
    });
};

export const postComment = (text, name) => {
    return fetch(host + "/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            forceError: true, 
        }),
    }).then((res) => {
        if (res.status === 400) {
            throw new Error("Имя и комментарий должны быть не короче 3 символов");
        }
        if (res.status === 500) {
            throw new Error("Сервер сломался");
        }
        return res.json();
    });
};
