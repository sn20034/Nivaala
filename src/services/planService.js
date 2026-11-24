/**
 * @typedef {Object} Plan
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} mealsCount
 * @property {"ONE_TIME"|"MONTHLY"|"WEEKLY"} billingCycle
 * @property {string[]} features
 * @property {boolean} isPopular
 */
import { mockHandlers } from '@/api/mock/mockHandlers';
import { ENDPOINTS } from '@/api/endpoints';
import http from '@/api/axiosClient';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const planService = {
  /** @returns {Promise<Plan[]>} */
  async getPlans() {
    if (USE_MOCK) return mockHandlers.getPlans();
    const { data } = await http.get(ENDPOINTS.PLANS.LIST);
    return data;
  },
  async adminCreatePlan(plan) {
    if (USE_MOCK) return mockHandlers.adminCreatePlan(plan);
    const { data } = await http.post(ENDPOINTS.PLANS.ADMIN_CREATE, plan);
    return data;
  },
  async adminUpdatePlan(id, updates) {
    if (USE_MOCK) return mockHandlers.adminUpdatePlan(id, updates);
    const { data } = await http.put(ENDPOINTS.PLANS.ADMIN_UPDATE(id), updates);
    return data;
  },
  async adminDeletePlan(id) {
    if (USE_MOCK) return mockHandlers.adminDeletePlan(id);
    const { data } = await http.delete(ENDPOINTS.PLANS.ADMIN_DELETE(id));
    return data;
  },
};
