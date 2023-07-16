const mapping: Record<string, string> = {
  organizations: 'organization',
  routes: 'route',
  users: 'user',
  vehicles: 'vehicle',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
