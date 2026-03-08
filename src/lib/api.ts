import type { Plan } from "../types/plan";
import { api } from "./axios";

export const apiService = {
  /**
   * Obtiene la lista de planes activos desde el backend.
   */
  async getPlans(): Promise<Plan[]> {
    try {
      const response = await api.get('/vpn/plans');
      // Los datos vienen directamente en la propiedad 'data' de Axios
      const data = response.data;
      // Ordenar por sort_order
      return (data as Plan[]).sort((a, b) => a.sort_order - b.sort_order);
    } catch (error) {
      console.error("Error fetching plans:", error);
      throw error;
    }
  },

  /**
   * Obtiene un plan específico por su slug.
   */
  async getPlanBySlug(slug: string): Promise<Plan> {
    const response = await api.get(`/vpn/plans/slug/${slug}`);
    return response.data;
  },

  /**
   * Obtiene la política de privacidad desde el backend.
   */
  async getPrivacyPolicy(): Promise<any> {
    try {
      const response = await api.get('/vpn/privacy');
      return response.data;
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
      throw error;
    }
  },

  /**
   * Obtiene los términos de servicio desde el backend.
   */
  async getTermsOfService(): Promise<any> {
    try {
      const response = await api.get('/vpn/terms');
      return response.data;
    } catch (error) {
      console.error("Error fetching terms of service:", error);
      throw error;
    }
  },

  /**
   * Obtiene la información de contacto desde el backend.
   */
  async getContactInfo(): Promise<any> {
    try {
      const response = await api.get('/vpn/contact');
      return response.data;
    } catch (error) {
      console.error("Error fetching contact info:", error);
      throw error;
    }
  },

  /**
   * Envía el formulario de contacto al backend.
   */
  async submitContactForm(data: { name: string; email: string; subject: string; message: string }): Promise<any> {
    try {
      const response = await api.post('/vpn/contact/submit', data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message;
      console.error("Error submitting contact form:", errorMessage);
      throw new Error(errorMessage);
    }
  },

  /**
   * Registra un nuevo usuario en el sistema.
   */
  async register(data: { name: string; email: string; password: string }): Promise<any> {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error: any) {
      const result = error.response?.data || {};
      const errorMessage = result.error?.message || result.error || "Error al registrarse";
      console.error("Error during registration:", errorMessage);
      throw new Error(errorMessage);
    }
  }
};
