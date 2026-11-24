/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} studentId
 * @property {string} planId
 * @property {("LUNCH"|"DINNER")[]} mealTypes
 * @property {string} startDate
 * @property {string} address
 * @property {string} hostelName
 * @property {string} room
 * @property {string} boxName
 * @property {string} note
 * @property {string} paymentMethod
 * @property {"Preparing"|"Packed"|"Out for delivery"|"Delivered"} status
 * @property {number} total
 * @property {string} createdAt
 */
import { mockHandlers } from '@/api/mock/mockHandlers';
import { ENDPOINTS } from '@/api/endpoints';
import http from '@/api/axiosClient';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const orderService = {
  async createOrder(data) {
    if (USE_MOCK) return mockHandlers.createOrder(data);
    const { data: res } = await http.post(ENDPOINTS.ORDERS.CREATE, data);
    return res;
  },
  async getStudentOrders() {
    if (USE_MOCK) return mockHandlers.getStudentOrders();
    const { data } = await http.get(ENDPOINTS.ORDERS.STUDENT_LIST);
    return data;
  },
  async getAdminOrders() {
    if (USE_MOCK) return mockHandlers.getAdminOrders();
    const { data } = await http.get(ENDPOINTS.ORDERS.ADMIN_LIST);
    return data;
  },
  async updateOrderStatus(id, status) {
    if (USE_MOCK) return mockHandlers.updateOrderStatus(id, status);
    const { data } = await http.patch(ENDPOINTS.ORDERS.ADMIN_STATUS(id), { status });
    return data;
  },
};
