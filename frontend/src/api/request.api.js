import http from "api/http.api";

export const getUsers = () => {
    return http.get("/user");
};

export const deleteUser = (id) => {
    return http.delete(`/user/${id}`);
};

export const register = (data) => {
    return http.post(`/register`, data);
};
export const user = (data) => {
    return http.post(`/user`, data);
};

export const login = (credential) => {
    return http.post(`/login`, credential);
};
export const getNotes = (params) => {
    return http.get(`/note?userId=${params}`);
};
export const postNotes = async(data) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return http.post(`/note`, data, config);
};
export const deleteNotes = (id, userId) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            userId: userId,
        },
    };
    return http.delete(`/note/${id}`, config);
};

// export const getNoteById = (id) => {
//     return http.get(`/note/${id}`);
// };
export const getNote = async(id) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await http.get(`/note/${id}`, config);
    return res.data;
};
export const updateNote = async(id, userId, data) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            userId: userId,
        },
    };
    return http.put(`/note/${id}`, data, config);
};

export const getPrediction = () => {
    return http.get("/prediction");
};

export const deletePrediction = (id) => {
    return http.delete(`/prediction/${id}`);
};