const host = "https://wedev-api.sky.pro/api/v2/almer-ishkmyhametov-new";
const authHost = "https://wedev-api.sky.pro/api/user"

let token = ""
export const setToken = (newToken) => {
    token = newToken
}
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
        headers: {
            Authorization: `Bearer ${token}`
        },
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

export const login = (login, password) => {
    return fetch(authHost + '/login'), {
        method: 'POST',
        body: JSOW.stringify({ login: login, password: password})
    }
}
export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name: name,login: login, password: password})
    })
}