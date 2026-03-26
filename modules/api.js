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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password })
    }).then((res) => {
        if (res.status === 400) throw new Error("Неверный логин или пароль");
        return res.json();
    }).then((data) => {
        // Сохраняем данные сразу после получения
        setToken(data.user.token);
        setUserName(data.user.name);
        return data;
    });
};


export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, login, password })
    }).then((res) => {
        if (res.status === 400) throw new Error("Такой пользователь уже существует или данные введены некорректно");
        return res.json();
    }).then((data) => {
        
        setToken(data.user.token);
        setUserName(data.user.name);
        return data;
    });
};
