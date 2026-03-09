export interface Session {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
  is_active: boolean;
  expires_at: string;
  created_at: string;
}

export interface BackendSubscription {
  id: string;
  status: string;
  start_date: string;
  end_date: string | null;
  next_billing_date: string | null;
  auto_renew: boolean;
}

export interface SubscriptionSummary {
  has_active_subscription: boolean;
  status: 'active' | 'cancelled' | 'expired' | 'paused' | 'trial' | 'pending';
  subscription?: BackendSubscription;
  current_plan?: Plan;
  days_remaining: number;
  is_expiring_soon: boolean;
  clients_used: number;
  clients_limit: number;
  bandwidth_used: number;
  bandwidth_limit: number;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  currency: string;
  max_devices: number;
  features: string[];
}
