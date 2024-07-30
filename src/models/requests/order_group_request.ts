export interface OrderGroupRequest {
  shipperId: string;
  location: string;
  longitude: number;
  latitude: number;
  asignBy: string;
}

export interface UpdateOrderRequest {
  id: string;
  shipperId: string;
  location: string;
  longitude: number;
  latitude: number;
}
