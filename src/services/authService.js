/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {"STUDENT"|"ADMIN"} role
 * @property {string} boxName
 * @property {string} [hostelName]
 * @property {string} [city]
 */

import { mockHandlers } from '@/api/mock/mockHandlers';
import { ENDPOINTS } from '@/api/endpoints';
import http from '@/api/axiosClient';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const authService = {
  /** @param {{fullName:string,phone:string,email:string,password:string,role:string,hostelName?:string,city?:string}} data
   *  @returns {Promise<{token:string, user:User}>} */
  async signup(data) {
    if (USE_MOCK) return mockHandlers.signup(data);
    const { data: res } = await http.post(ENDPOINTS.AUTH.SIGNUP, data);
    return res;
  },

  /** @param {{email:string,password:string}} data
   *  @returns {Promise<{token:string, user:User}>} */
  async login(data) {
    if (USE_MOCK) return mockHandlers.login(data);
    const { data: res } = await http.post(ENDPOINTS.AUTH.LOGIN, data);
    return res;
  },

  /** @param {string} token @returns {Promise<User>} */
  async me(token) {
    if (USE_MOCK) return mockHandlers.me(token);
    const { data: res } = await http.get(ENDPOINTS.AUTH.ME);
    return res;
  },
};
