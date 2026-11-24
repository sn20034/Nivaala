import { mockHandlers } from '@/api/mock/mockHandlers';
import { ENDPOINTS } from '@/api/endpoints';
import http from '@/api/axiosClient';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const adminService = {
  async getDashboardStats() {
    if (USE_MOCK) return mockHandlers.getDashboardStats();
    const { data } = await http.get(ENDPOINTS.ADMIN.DASHBOARD_STATS);
    return data;
  },
  async getKitchenSheet(date) {
    if (USE_MOCK) return mockHandlers.getKitchenSheet({ date });
    const { data } = await http.get(ENDPOINTS.ADMIN.KITCHEN_SHEET, { params: { date } });
    return data;
  },
  async getStudents() {
    if (USE_MOCK) return mockHandlers.getStudents();
    const { data } = await http.get(ENDPOINTS.ADMIN.STUDENTS);
    return data;
  },
  async updateStudentStatus(id, status) {
    if (USE_MOCK) return mockHandlers.updateStudentStatus(id, status);
    const { data } = await http.patch(ENDPOINTS.ADMIN.STUDENT_STATUS(id), { status });
    return data;
  },
  async getFeedback() {
    if (USE_MOCK) return mockHandlers.getAdminFeedback();
    const { data } = await http.get(ENDPOINTS.ADMIN.FEEDBACK);
    return data;
  },
  async resolveFeedback(id) {
    if (USE_MOCK) return mockHandlers.resolveFeedback(id);
    const { data } = await http.patch(`${ENDPOINTS.ADMIN.FEEDBACK}/${id}/resolve`);
    return data;
  },
};
