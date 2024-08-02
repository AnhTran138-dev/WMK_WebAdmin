export interface OrderGroupList {
  id: string;
  shipperId: string;
  shipperUserName: string;
  location: string;
  asignAt: Date;
  asignBy: string;
  orders: Order[];
}

export interface Order {
  id: string;
  orderCode: number;
  userId: string;
  orderGroupId: string;
  receiveName: string;
  receivePhone: string;
  note: string;
  address: string;
  longitude: number;
  latitude: number;
  img: string;
  shipDate: Date;
  orderDate: Date;
  totalPrice: number;
  status: string;
  weeklyPlan: null;
  transactions: [];
  orderDetails: [];
}
