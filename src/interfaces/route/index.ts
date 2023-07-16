import { VehicleInterface } from 'interfaces/vehicle';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RouteInterface {
  id?: string;
  start_location: string;
  end_location: string;
  route_manager_id?: string;
  created_at?: any;
  updated_at?: any;
  vehicle?: VehicleInterface[];
  user?: UserInterface;
  _count?: {
    vehicle?: number;
  };
}

export interface RouteGetQueryInterface extends GetQueryInterface {
  id?: string;
  start_location?: string;
  end_location?: string;
  route_manager_id?: string;
}
