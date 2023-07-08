export interface CreateChargeRequest {
  amount: number;
  currency: string;
  customerId: string;
  source?: string;
}
