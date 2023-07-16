import { UserInterface } from 'interfaces/user';
import { RouteInterface } from 'interfaces/route';
import { GetQueryInterface } from 'interfaces';

export interface VehicleInterface {
  id?: string;
  capacity: number;
  vehicle_owner_id?: string;
  route_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  route?: RouteInterface;
  _count?: {};
}

export interface VehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
  vehicle_owner_id?: string;
  route_id?: string;
}
