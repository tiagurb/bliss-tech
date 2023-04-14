import axios from "axios";

const BASE_URL = "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com";

export const getAllQuestions = () => {
    return axios.get(`${BASE_URL}/questions`);
};

export const getQuestion = (id) => {
    return axios.get(`${BASE_URL}/questions/${id}`);
};

export const getHealth = () => {
    return axios.get(`${BASE_URL}/health`);
};

export const getSearch = (filter) => {
    return axios.get(`${BASE_URL}/questions?limit=10&offset=0&filter=${filter}`);
};

export const updateVotes = (id, question) => {
    return axios.put(`${BASE_URL}/questions/question_${id}`, question)
};