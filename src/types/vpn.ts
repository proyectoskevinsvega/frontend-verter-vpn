export interface Server {
  id: string;
  name: string;
  location: string;
  ip_address: string;
  status: 'active' | 'maintenance' | 'offline';
  current_load: number;
}

export interface VpnDevice {
  id: string;
  name: string;
  device_type: 'laptop' | 'desktop' | 'mobile' | 'tablet' | 'server' | 'router' | 'other';
  os_type: 'linux' | 'windows' | 'macos' | 'android' | 'ios' | 'other';
  description?: string;
  public_key: string;
  private_ip: string;
  is_active: boolean;
  connected_to?: string; // server_id if connected
  created_at: string;
  last_handshake_at?: string;
}

export interface DeviceCreateRequest {
  name: string;
  device_type: VpnDevice['device_type'];
  os_type: VpnDevice['os_type'];
  description?: string;
}

export interface QrResponseData {
  qr_url?: string;
  qr_code_base64?: string;
  content_type: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
