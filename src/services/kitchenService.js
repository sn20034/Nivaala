import { mockHandlers } from '@/api/mock/mockHandlers';
import { ENDPOINTS } from '@/api/endpoints';
import http from '@/api/axiosClient';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const kitchenService = {
  async getClips() {
    if (USE_MOCK) return mockHandlers.getClips();
    const { data } = await http.get(ENDPOINTS.KITCHEN.CLIPS);
    return data;
  },
  async getTrail() {
    if (USE_MOCK) return mockHandlers.getTrail();
    const { data } = await http.get(ENDPOINTS.KITCHEN.TRAIL);
    return data;
  },
  async getAunties() {
    if (USE_MOCK) return mockHandlers.getAunties();
    const { data } = await http.get(ENDPOINTS.KITCHEN.AUNTIES);
    return data;
  },
};
