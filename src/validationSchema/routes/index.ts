import * as yup from 'yup';

export const routeValidationSchema = yup.object().shape({
  start_location: yup.string().required(),
  end_location: yup.string().required(),
  route_manager_id: yup.string().nullable(),
});
