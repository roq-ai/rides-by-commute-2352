import * as yup from 'yup';

export const vehicleValidationSchema = yup.object().shape({
  capacity: yup.number().integer().required(),
  vehicle_owner_id: yup.string().nullable(),
  route_id: yup.string().nullable(),
});
