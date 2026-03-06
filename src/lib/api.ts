import type { Plan } from "../types/plan";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const apiService = {
  /**
   * Obtiene la lista de planes activos desde el backend.
   */
  async getPlans(): Promise<Plan[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/plans`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
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
    const response = await fetch(`${API_BASE_URL}/plans/slug/${slug}`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  },

  /**
   * Obtiene la política de privacidad desde el backend.
   */
  async getPrivacyPolicy(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/privacy`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
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
      const response = await fetch(`${API_BASE_URL}/terms`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
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
      const response = await fetch(`${API_BASE_URL}/contact`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
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
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error HTTP: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  },

  /**
   * Registra un nuevo usuario en el sistema.
   */
  async register(data: { name: string; email: string; password: string }): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error?.message || result.error || "Error al registrarse");
      }

      return result;
    } catch (error: any) {
      console.error("Error during registration:", error);
      throw error;
    }
  }
};
