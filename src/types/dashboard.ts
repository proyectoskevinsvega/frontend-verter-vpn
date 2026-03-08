export interface Session {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
  is_active: boolean;
  expires_at: string;
  created_at: string;
}

export interface SubscriptionSummary {
  plan_name: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete';
  current_period_end: string;
  cancel_at_period_end: boolean;
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
