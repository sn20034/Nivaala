/**
 * @typedef {Object} SkipRequest
 * @property {string} id
 * @property {string} fromDate
 * @property {string} toDate
 * @property {("LUNCH"|"DINNER")[]} meals
 * @property {string} reason
 * @property {string} note
 * @property {"CONFIRMED"|"TOO_LATE"|"CANCELLED"} status
 * @property {number} creditMeals
 * @property {string} createdAt
 */
import { mockHandlers } from '@/api/mock/mockHandlers';
import { ENDPOINTS } from '@/api/endpoints';
import http from '@/api/axiosClient';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const skipPauseService = {
  /** @returns {Promise<SkipRequest[]>} */
  async getMySkips() {
    if (USE_MOCK) return mockHandlers.getStudentSkips();
    const { data } = await http.get(ENDPOINTS.SKIPS.STUDENT_LIST);
    return data;
  },
  /** @param {{fromDate:string,toDate:string,meals:string[],reason:string,note?:string}} payload
   *  @returns {Promise<SkipRequest>} */
  async createSkip(payload) {
    if (USE_MOCK) return mockHandlers.createSkip(payload);
    const { data } = await http.post(ENDPOINTS.SKIPS.CREATE, payload);
    return data;
  },
  async cancelSkip(id) {
    if (USE_MOCK) return mockHandlers.cancelSkip(id);
    const { data } = await http.delete(ENDPOINTS.SKIPS.DELETE(id));
    return data;
  },
  async getAdminSkips(date) {
    if (USE_MOCK) return mockHandlers.getAdminSkips({ date });
    const { data } = await http.get(ENDPOINTS.SKIPS.ADMIN_LIST, { params: { date } });
    return data;
  },
};
