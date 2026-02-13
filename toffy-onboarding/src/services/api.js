/**
 * Mock API Service
 *
 * This simulates backend API calls for the demo.
 * In production, these would be real fetch/axios calls.
 */

import { QUESTIONS_BY_PROBLEM, PROBLEMS, getPlanDays, SUBSCRIPTION_CONFIG } from '../data/config';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user session
let mockSession = {
  user: null,
  pet: null,
  assessment: null,
};

/**
 * Auth API
 */
export const authAPI = {
  async register({ email, password, name }) {
    await delay(800);
    mockSession.user = { id: 'user_1', email, name };
    return { success: true, user: mockSession.user };
  },

  async loginWithGoogle() {
    await delay(600);
    mockSession.user = { id: 'user_1', email: 'user@gmail.com', name: 'Demo User' };
    return { success: true, user: mockSession.user };
  },

  async loginWithApple() {
    await delay(600);
    mockSession.user = { id: 'user_1', email: 'user@icloud.com', name: 'Demo User' };
    return { success: true, user: mockSession.user };
  },
};

/**
 * Pet API
 */
export const petAPI = {
  async create(petData) {
    await delay(500);
    mockSession.pet = { id: 'pet_1', ...petData };
    return { success: true, pet: mockSession.pet };
  },

  async update(petId, data) {
    await delay(300);
    mockSession.pet = { ...mockSession.pet, ...data };
    return { success: true, pet: mockSession.pet };
  },
};

/**
 * Onboarding API
 */
export const onboardingAPI = {
  async setProblem(petId, problemId) {
    await delay(300);
    mockSession.pet = { ...mockSession.pet, primaryProblem: problemId };
    return { success: true };
  },

  async getQuestions(problemId) {
    await delay(400);
    const questions = QUESTIONS_BY_PROBLEM[problemId] || QUESTIONS_BY_PROBLEM.obedience;
    return { success: true, questions };
  },

  async submitAssessment(petId, answers) {
    await delay(1000);
    mockSession.assessment = { petId, answers, completedAt: new Date().toISOString() };
    return { success: true, assessmentId: 'assessment_1' };
  },
};

/**
 * Plan API
 */
export const planAPI = {
  async getDiagnosis(petId) {
    await delay(800);
    const pet = mockSession.pet;
    const problem = PROBLEMS.find(p => p.id === pet?.primaryProblem);

    return {
      success: true,
      diagnosis: {
        problem: problem?.label || 'Training',
        insight: problem?.insight?.replace('{dogName}', pet?.name || 'your dog') || 'Your personalized plan is ready!',
        strengths: ['Eager to learn', 'Good with treats'],
        improvements: ['Consistency needed', 'More outdoor time'],
        estimatedDays: 7,
      },
    };
  },

  async getPlan(petId) {
    await delay(600);
    const pet = mockSession.pet;
    const problemId = pet?.primaryProblem || 'obedience';
    const planDays = getPlanDays(problemId, pet?.name || 'your dog');
    const days = planDays[problemId] || planDays.default;

    return {
      success: true,
      plan: {
        id: 'plan_1',
        petId,
        problemId,
        days,
        createdAt: new Date().toISOString(),
        trialEndsAt: new Date(Date.now() + SUBSCRIPTION_CONFIG.trialLength * 24 * 60 * 60 * 1000).toISOString(),
      },
    };
  },
};

/**
 * Combined API export
 */
export const api = {
  auth: authAPI,
  pet: petAPI,
  onboarding: onboardingAPI,
  plan: planAPI,
};

export default api;
