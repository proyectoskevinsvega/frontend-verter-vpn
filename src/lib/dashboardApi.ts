import { api } from "./axios";
import type { Session, SubscriptionSummary, Plan } from "../types/dashboard";

export const userService = {
  /**
   * Obtiene la lista de sesiones activas del usuario.
   */
  async getSessions(): Promise<Session[]> {
    try {
      const response = await api.get('/vpn/auth/sessions');
      return response.data || [];
    } catch (error) {
      console.error("Error fetching sessions:", error);
      throw error;
    }
  },

  /**
   * Revoca una sesión específica.
   */
  async revokeSession(sessionId: string): Promise<void> {
    try {
      await api.delete(`/vpn/auth/sessions/${sessionId}`);
    } catch (error) {
      console.error("Error revoking session:", error);
      throw error;
    }
  }
};

export const subscriptionService = {
  /**
   * Obtiene el resumen de la suscripción activa.
   */
  async getSummary(): Promise<SubscriptionSummary | null> {
    try {
      const response = await api.get('/vpn/subscriptions/me/summary');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null; // El usuario no tiene suscripción activa
      }
      console.error("Error fetching subscription summary:", error);
      throw error;
    }
  },

  /**
   * Obtiene los detalles del plan activo.
   */
  async getMyPlan(): Promise<Plan | null> {
    try {
      const response = await api.get('/vpn/subscriptions/me/plan');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error("Error fetching my plan:", error);
      throw error;
    }
  }
};
