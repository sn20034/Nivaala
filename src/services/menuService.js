/**
 * @typedef {Object} MenuItem
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} imageUrl
 * @property {"LUNCH"|"DINNER"} mealType
 * @property {"MILD"|"MEDIUM"|"SPICY"|"SWEET"} spiceLevel
 * @property {string[]} tags
 * @property {boolean} isSpecial
 */
import { mockHandlers } from '@/api/mock/mockHandlers';
import { ENDPOINTS } from '@/api/endpoints';
import http from '@/api/axiosClient';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const menuService = {
  /** @param {{day?:string,mealType?:string}} params @returns {Promise<MenuItem[]|Object>} */
  async getMenu(params) {
    if (USE_MOCK) return mockHandlers.getMenu(params);
    const { data } = await http.get(ENDPOINTS.MENU.LIST, { params });
    return data;
  },
  async adminCreateMenuItem(item) {
    if (USE_MOCK) return mockHandlers.adminCreateMenuItem(item);
    const { data } = await http.post(ENDPOINTS.MENU.ADMIN_CREATE, item);
    return data;
  },
  async adminUpdateMenuItem(id, updates) {
    if (USE_MOCK) return mockHandlers.adminUpdateMenuItem(id, updates);
    const { data } = await http.put(ENDPOINTS.MENU.ADMIN_UPDATE(id), updates);
    return data;
  },
  async adminDeleteMenuItem(id) {
    if (USE_MOCK) return mockHandlers.adminDeleteMenuItem(id);
    const { data } = await http.delete(ENDPOINTS.MENU.ADMIN_DELETE(id));
    return data;
  },
};
