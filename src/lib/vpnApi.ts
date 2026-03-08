import { api } from "./axios";
import type { Server, VpnDevice, DeviceCreateRequest, QrResponseData, ApiResponse, DeviceSecurity, DeviceStats, BandwidthStats } from "../types/vpn";

export const vpnService = {
  // --- SERVERS --- //
  /**
   * Obtiene la lista de servidores VPN disponibles.
   */
  async getServers(): Promise<Server[]> {
    try {
      const response = await api.get('/me/servers');
      return response.data || [];
    } catch (error) {
      console.error("Error fetching servers:", error);
      throw error;
    }
  },

  /**
   * Obtiene detalles de un servidor específico.
   */
  async getServerById(serverId: string): Promise<Server> {
    try {
      const response = await api.get(`/servers/${serverId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching server details:", error);
      throw error;
    }
  },

  // --- DEVICES --- //
  /**
   * Obtiene la lista de todos los dispositivos VPN del usuario.
   */
  async getDevices(): Promise<VpnDevice[]> {
    try {
      const response = await api.get('/me/devices');
      return response.data || [];
    } catch (error) {
      console.error("Error fetching devices:", error);
      throw error;
    }
  },

  /**
   * Registra un nuevo dispositivo en la red VPN.
   */
  async createDevice(data: DeviceCreateRequest): Promise<VpnDevice> {
    try {
      const response = await api.post('/me/devices', data);
      return response.data;
    } catch (error) {
      console.error("Error creating device:", error);
      throw error;
    }
  },

  /**
   * Elimina destructivamente un dispositivo.
   */
  async deleteDevice(deviceId: string): Promise<void> {
    try {
      await api.delete(`/me/devices/${deviceId}`);
    } catch (error) {
      console.error("Error deleting device:", error);
      throw error;
    }
  },

  /**
   * Solicita conexión de un dispositivo a un servidor específico.
   */
  async connectDevice(deviceId: string, serverId: string): Promise<void> {
    try {
      await api.post(`/me/devices/${deviceId}/connect`, { server_id: serverId });
    } catch (error) {
      console.error("Error connecting device to server:", error);
      throw error;
    }
  },

  /**
   * Detiene la conexión VPN de un dispositivo.
   */
  async disconnectDevice(deviceId: string): Promise<void> {
    try {
      await api.delete(`/me/devices/${deviceId}/disconnect`);
    } catch (error) {
      console.error("Error disconnecting device:", error);
      throw error;
    }
  },

  /**
   * Obtiene un string Base64 o URL temporal del MinIO para el código QR de un dispositivo conectado.
   */
  async getDeviceQrCode(deviceId: string): Promise<QrResponseData> {
    try {
      const response = await api.get<ApiResponse<QrResponseData>>(`/me/devices/${deviceId}/qr`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching QR code:", error);
      throw error;
    }
  },

  /**
   * Descarga directamente el archivo `.conf` generado para WireGuard.
   */
  async downloadDeviceConfig(deviceId: string, suggestedName: string): Promise<void> {
    try {
      const response = await api.get(`/me/devices/${deviceId}/download`, {
        responseType: 'blob', // Importantísimo para archivos binarios
      });
      
      const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileUrl;
      fileLink.setAttribute('download', `${suggestedName}.conf`);
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
      window.URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Error downloading .conf file:", error);
      throw error;
    }
  },

  // --- SECURITY --- //
  /**
   * Obtiene la configuración de seguridad del dispositivo.
   */
  async getDeviceSecurity(deviceId: string): Promise<DeviceSecurity> {
    try {
      const response = await api.get<ApiResponse<DeviceSecurity>>(`/me/devices/${deviceId}/security`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching device security:", error);
      throw error;
    }
  },

  /**
   * Actualiza la configuración de seguridad (Kill Switch, DNS Protection).
   */
  async updateDeviceSecurity(deviceId: string, data: DeviceSecurity): Promise<void> {
    try {
      await api.put(`/me/devices/${deviceId}/security`, data);
    } catch (error) {
      console.error("Error updating device security:", error);
      throw error;
    }
  },

  // --- STATS --- //
  /**
   * Obtiene estadísticas de tráfico y estado del dispositivo.
   */
  async getDeviceStats(deviceId: string): Promise<DeviceStats> {
    try {
      const response = await api.get<ApiResponse<DeviceStats>>(`/me/devices/${deviceId}/stats`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching device stats:", error);
      throw error;
    }
  },

  /**
   * Obtiene estadísticas en tiempo real (ancho de banda).
   */
  async getDeviceRealtimeStats(deviceId: string): Promise<BandwidthStats> {
    try {
      const response = await api.get<ApiResponse<BandwidthStats>>(`/me/devices/${deviceId}/stats/realtime`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching realtime stats:", error);
      throw error;
    }
  },

  /**
   * Obtiene historial de ancho de banda.
   */
  async getDeviceBandwidth(deviceId: string): Promise<BandwidthStats[]> {
    try {
      const response = await api.get<ApiResponse<BandwidthStats[]>>(`/me/devices/${deviceId}/bandwidth`);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching bandwidth history:", error);
      throw error;
    }
  },

  /**
   * Descarga el script de Kill Switch para una plataforma específica.
   */
  async downloadKillSwitchScript(deviceId: string, platform: string): Promise<void> {
    try {
      const response = await api.get(`/me/devices/${deviceId}/killswitch/${platform}`, {
        responseType: 'blob',
      });
      
      const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileUrl;
      const extension = platform.includes('windows') ? 'ps1' : 'sh';
      fileLink.setAttribute('download', `killswitch-${platform}.${extension}`);
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
      window.URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Error downloading killswitch script:", error);
      throw error;
    }
  }
};
