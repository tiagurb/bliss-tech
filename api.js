import axios from "axios";

const BASE_URL = "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/";

export const getAllQuestions = () => {
    return axios.get(`${BASE_URL}/questions`);
};

export const getQuestion = (id) => {
    return axios.get(`${BASE_URL}/questions/${id}`);
};

