import API from './axiosConfig';

export const getSkills = (params) => API.get('/skills', { params });
export const getSkillById = (id) => API.get(`/skills/${id}`);
export const createSkill = (skillData) => API.post('/skills', skillData);
export const updateSkill = (id, skillData) => API.put(`/skills/${id}`, skillData);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);