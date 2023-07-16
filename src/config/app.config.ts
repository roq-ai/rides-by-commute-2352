interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['System Administrator'],
  customerRoles: ['Ride Seeker'],
  tenantRoles: ['Route Manager', 'System Administrator', 'Vehicle Owner'],
  tenantName: 'Organization',
  applicationName: 'Rides by commuters',
  addOns: [],
};
