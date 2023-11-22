import React from 'react';
import { View } from 'react-native';
import { Button, H2, Input, Text } from 'tamagui';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithValidate, atomWithFormControls } from 'jotai-form';
import axios from 'axios';
import * as Yup from 'yup';

export const nameSchema = Yup.string()
  .required('Please enter your name.');

export const emailSchema = Yup.string()
  .email('Please enter a valid email address.')
  .required('Please enter your email address.');

export const passwordSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters long.')
  .required('Please enter your password.');

export const repeatPasswordSchema = Yup.string()
  .required().oneOf([Yup.ref('values.password'), null], 'Passwords must match');

const nameAtom = atomWithValidate('', {
  validate: async (v) => {
    await nameSchema.validate(v);
    return v;
  },
});

const emailAtom = atomWithValidate('', {
  validate: async (v) => {
    await emailSchema.validate(v);
    return v;
  },
});

const passwordAtom = atomWithValidate('', {
  validate: async (v) => {
    await passwordSchema.validate(v);
    return v;
  },
});

const repeatPasswordAtom = atomWithValidate('', {
  validate: async (v) => {
    await repeatPasswordSchema.validate(v);
    return v;
  },
});

const formControlAtom = atomWithFormControls(
  {
    name: nameAtom,
    email: emailAtom,
    password: passwordAtom,
    repeatPassword: repeatPasswordAtom,
  },
);

const repeatPasswordErrorAtom = atom(false);

export default function Register({ navigation }) {

  const {
    // Values per field
    values,
    // is the form valid
    isValid,
    // focused state per field
    focused,
    // touched state per field
    touched,
    // errors per field
    fieldErrors,
    // form error
    error,
    // handle change of value per field
    handleOnChange,
    // handle blur event per field
    handleOnBlur,
    // handle focus event per field
    handleOnFocus,
  } = useAtomValue(formControlAtom);

  const [repeatPasswordError, setRepeatPasswordError] = useAtom(repeatPasswordErrorAtom);

  const handleRegister = async () => {

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };


    if (isValid) {
      try {
        const response = await axios.post(
          'http://10.0.2.2:3000/register',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
        alert('Error during registration. Please try again.');
      }
    }

  };

  return (
    <View>
      <H2>Create an account</H2>

      <Input
        value={values.name}
        onChangeText={(e) => {
          handleOnChange('name')(e);
        }}
        //onFocus={handleOnFocus('name')}
        onBlur={handleOnBlur('name')}
        placeholder={'Name'}
      />
      <Text>
        {fieldErrors.name && touched.name
          ? `${fieldErrors.name}`
          : ''}
      </Text>

      <Input
        value={values.email}
        onChangeText={(e) => {
          handleOnChange('email')(e);
        }}
        //onFocus={handleOnFocus('email')}
        onBlur={handleOnBlur('email')}
        placeholder={'Email'}
      />
      <Text>
        {fieldErrors.email && touched.email
          ? `${fieldErrors.email}`
          : ''}
      </Text>

      <Input
        value={values.password}
        onChangeText={(e) => {
          handleOnChange('password')(e);
        }}
        //onFocus={handleOnFocus('password')}
        onBlur={handleOnBlur('password')}
        secureTextEntry={true}
        placeholder='Password'
      />
      <Text>
        {fieldErrors.password && touched.password
          ? `${fieldErrors.password}`
          : ''}
      </Text>

      <Input
        value={values.repeatPassword}
        onChangeText={(e) => {
          handleOnChange('repeatPassword')(e);
        }}
        //onFocus={handleOnFocus('repeatPassword')}
        onBlur={() => {
          if (values.password !== values.repeatPassword) {
            setRepeatPasswordError(true);
          } else {
            setRepeatPasswordError(false);
          }
        }
        }
        secureTextEntry={true}
        placeholder='Repeat Password'
      />
      {repeatPasswordError
        ? <Text> Passwords do not match. </Text>
        : null
      }
      {fieldErrors.repeatPassword && touched.repeatPassword
        ? <Text> `${fieldErrors.repeatPassword}` </Text>
        : null}


      <Text>{error?.toString()}</Text>

      <Button
        disabled={!isValid}
        onPress={() => {
          handleRegister();
        }}>
        Register
      </Button>
    </View>
  );
};
