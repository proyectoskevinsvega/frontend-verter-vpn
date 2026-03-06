export type PlanType = "free" | "basic" | "pro" | "enterprise" | "custom";
export type BillingCycle = "monthly" | "yearly" | "lifetime";

export interface PlanFeatures {
  kill_switch: boolean;
  dns_leak_protection: boolean;
  split_tunneling: boolean;
  double_vpn: boolean;
  stealth_mode: boolean;
  port_forwarding: boolean;
  dedicated_ip: boolean;
  static_ip: boolean;
  custom_dns: boolean;
  ipv6_support: boolean;
  all_servers: boolean;
  p2p_servers: boolean;
  streaming_servers: boolean;
  dedicated_servers: boolean;
  ad_blocker: boolean;
  malware_protection: boolean;
  tracker_blocking: boolean;
  priority_support: boolean;
  live_chat_support: boolean;
  phone_support: boolean;
  multi_login: boolean;
  api_access: boolean;
  custom_branding: boolean;
  team_management: boolean;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  type: PlanType;
  description: string;
  is_active: boolean;
  is_default: boolean;
  sort_order: number;
  price_monthly: number;
  price_yearly: number;
  billing_cycle: BillingCycle;
  max_clients: number;
  max_ports_per_client: number;
  max_devices: number;
  max_subdomains: number;
  max_servers: number;
  bandwidth_limit: number;
  speed_limit: number;
  features: PlanFeatures;
  created_at: string;
  updated_at: string;
}
