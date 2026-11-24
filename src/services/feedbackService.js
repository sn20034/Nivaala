/**
 * @typedef {Object} Feedback
 * @property {string} id
 * @property {string} orderId
 * @property {string} studentName
 * @property {number} rating
 * @property {string} comment
 * @property {"RATING"|"COMPLAINT"} type
 * @property {"OPEN"|"RESOLVED"} status
 * @property {string} createdAt
 */
import { studentService } from './studentService';
import { adminService } from './adminService';

export const feedbackService = {
  submit: (payload) => studentService.submitFeedback(payload),
  listAdmin: () => adminService.getFeedback(),
  resolve: (id) => adminService.resolveFeedback(id),
};
