const host = "https://wedev-api.sky.pro/api/v2/almer-ishkmyhametov-new";
const authHost = "https://wedev-api.sky.pro/api/user"

export let userName = null;
export const setUserName = (newName) => {
    userName = newName;
}

export let token = null;
export const setToken = (newToken) => {
    token = newToken
}
export const fetchComments = () => {
    return fetch(host + "/comments", {
        method: "GET",
    }).then((res) => {
        if (res.status === 500) throw new Error("Сервер сломался");
        return res.json();
    });
};

export const postComment = (text) => {
    return fetch(host + "/comments", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
            text: text,
           
        }),
    }).then((res) => {
        if (res.status === 401) throw new Error("Нет авторизации");
        if (res.status === 400) throw new Error("Текст должен быть не короче 3 символов");
        if (res.status === 500) throw new Error("Сервер сломался");
        return res.json();
    });
};

export const loginUser = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ login, password })
    }).then((res) => {
        if (res.status === 400) throw new Error("Неверный логин или пароль");
        if (!res.ok) throw new Error("Ошибка сервера");
        return res.json();
    });
};

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ login, name, password })
    }).then((res) => {
        if (res.status === 400) throw new Error("Пользователь уже существует");
        if (!res.ok) throw new Error("Ошибка сервера");
        return res.json();
    });
};

