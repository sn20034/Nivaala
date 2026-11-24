/**
 * @typedef {Object} StudentProfile
 * @property {string} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {string} boxName
 * @property {string} [hostelName]
 * @property {string} [room]
 * @property {string} [address]
 * @property {string} [parentContact]
 * @property {Object} [notifications]
 */
import { mockHandlers } from '@/api/mock/mockHandlers';
import { ENDPOINTS } from '@/api/endpoints';
import http from '@/api/axiosClient';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const studentService = {
  async getProfile() {
    if (USE_MOCK) return mockHandlers.getProfile();
    const { data } = await http.get(ENDPOINTS.STUDENT.PROFILE);
    return data;
  },
  async updateProfile(updates) {
    if (USE_MOCK) return mockHandlers.updateProfile(updates);
    const { data } = await http.put(ENDPOINTS.STUDENT.PROFILE, updates);
    return data;
  },
  async getPlan() {
    if (USE_MOCK) return mockHandlers.getStudentPlan();
    const { data } = await http.get(ENDPOINTS.STUDENT.PLAN);
    return data;
  },
  async getCredits() {
    if (USE_MOCK) return mockHandlers.getCredits();
    const { data } = await http.get(ENDPOINTS.STUDENT.CREDITS);
    return data;
  },
  async submitFeedback(payload) {
    if (USE_MOCK) return mockHandlers.submitFeedback(payload);
    const { data } = await http.post(ENDPOINTS.STUDENT.FEEDBACK, payload);
    return data;
  },
};
