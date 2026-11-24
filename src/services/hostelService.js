/**
 * @typedef {Object} HostelLead
 * @property {string} id
 * @property {string} hostelName
 * @property {string} ownerName
 * @property {string} phone
 * @property {number} students
 * @property {number} monthlyMessCost
 * @property {string} city
 * @property {"NEW"|"CONTACTED"|"PILOT"|"ONBOARDED"} status
 * @property {string} createdAt
 */
import { mockHandlers } from '@/api/mock/mockHandlers';
import { ENDPOINTS } from '@/api/endpoints';
import http from '@/api/axiosClient';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const hostelService = {
  async submitLead(data) {
    if (USE_MOCK) return mockHandlers.submitLead(data);
    const { data: res } = await http.post(ENDPOINTS.HOSTELS.LEADS, data);
    return res;
  },
  async getAdminLeads() {
    if (USE_MOCK) return mockHandlers.getAdminLeads();
    const { data } = await http.get(ENDPOINTS.HOSTELS.ADMIN_LEADS);
    return data;
  },
};
