import React from 'react';
import { Formik, Form, setNestedObjectValues } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
} from '@chakra-ui/core';

import { Wrapper } from '../components/Wrapper';
import { InputFiled } from '../components/InputFiled';
import { useMutation } from 'urql';

interface registerProps {}

const REGISTER_MUTATION = `
  mutation Register($username: String!, $password: String!){
    register(options: {username: $username, password: $password}){
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          return register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputFiled
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputFiled
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              variantColor="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;