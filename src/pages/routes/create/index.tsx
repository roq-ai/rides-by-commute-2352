import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRoute } from 'apiSdk/routes';
import { Error } from 'components/error';
import { routeValidationSchema } from 'validationSchema/routes';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { RouteInterface } from 'interfaces/route';

function RouteCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RouteInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRoute(values);
      resetForm();
      router.push('/routes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RouteInterface>({
    initialValues: {
      start_location: '',
      end_location: '',
      route_manager_id: (router.query.route_manager_id as string) ?? null,
    },
    validationSchema: routeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Route
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="start_location" mb="4" isInvalid={!!formik.errors?.start_location}>
            <FormLabel>Start Location</FormLabel>
            <Input
              type="text"
              name="start_location"
              value={formik.values?.start_location}
              onChange={formik.handleChange}
            />
            {formik.errors.start_location && <FormErrorMessage>{formik.errors?.start_location}</FormErrorMessage>}
          </FormControl>
          <FormControl id="end_location" mb="4" isInvalid={!!formik.errors?.end_location}>
            <FormLabel>End Location</FormLabel>
            <Input type="text" name="end_location" value={formik.values?.end_location} onChange={formik.handleChange} />
            {formik.errors.end_location && <FormErrorMessage>{formik.errors?.end_location}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'route_manager_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'route',
    operation: AccessOperationEnum.CREATE,
  }),
)(RouteCreatePage);
