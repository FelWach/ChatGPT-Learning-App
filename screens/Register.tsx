import React from 'react';
import { Button, H2, Input, Text } from 'tamagui';
import { SaveAreaView } from '../components/SafeAreaView';
import { UserProps } from '../api/type';
import { register } from '../api/api';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithValidate, atomWithFormControls } from 'jotai-form';
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
  .required('Please repeat your password.');

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
const errorAtom = atom('');

export default function Register({ navigation }) {

  const {
    // Values per field
    values,
    // is the form valid
    isValid,
    // focused state per field
    touched,
    // errors per field
    fieldErrors,
    // form error
    handleOnChange,
    // handle blur event per field
    handleOnBlur,
  } = useAtomValue(formControlAtom);

  const [repeatPasswordError, setRepeatPasswordError] = useAtom(repeatPasswordErrorAtom);
  const [errorState, setErrorState] = useAtom(errorAtom);

  const checkPasswordMatch = (repeatPassword: string, password: string) => {
    if (repeatPassword !== password) {
      setRepeatPasswordError(true);
    } else {
      setRepeatPasswordError(false);
    }
  }

  const resetForm = () => {
    handleOnChange('name')('');
    handleOnChange('email')('');
    handleOnChange('password')('');
    handleOnChange('repeatPassword')('');
    setRepeatPasswordError(false);
    setErrorState('');
  }

  const handleRegister = async () => {

    const data: UserProps = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    if (isValid) {
      try {
        const response = await register(data);
        resetForm();
        navigation.navigate('Login');
      } catch (error: any) {
        console.error('Error:', error);
        if (error.message) {
          setErrorState(error.message);
        } else {
          setErrorState('An error occurred during registration.');
        }
      }
    }
  };

  return (
    <SaveAreaView>
      <H2>Create an account</H2>

      <Input
        value={values.name}
        onChangeText={(e) => {
          handleOnChange('name')(e);
        }}
        onBlur={handleOnBlur('name')}
        placeholder={'Name'}
      />
      <Text>
        {fieldErrors.name && touched.name
          ? `${fieldErrors.name.message}`
          : ''}
      </Text>

      <Input
        value={values.email}
        onChangeText={(e) => {
          handleOnChange('email')(e);
        }}
        onBlur={handleOnBlur('email')}
        placeholder={'Email'}
      />
      <Text>
        {fieldErrors.email && touched.email
          ? `${fieldErrors.email.message}`
          : ''}
      </Text>

      <Input
        value={values.password}
        onChangeText={(e) => {
          handleOnChange('password')(e);
        }}
        onBlur={handleOnBlur('password')}
        secureTextEntry={true}
        placeholder='Password'
      />
      <Text>
        {fieldErrors.password && touched.password
          ? `${fieldErrors.password.message}`
          : ''}
      </Text>

      <Input
        value={values.repeatPassword}
        onChangeText={(e) => {
          handleOnChange('repeatPassword')(e);
        }}
        onBlur={() => {
          handleOnBlur('repeatPassword');
          checkPasswordMatch(values.repeatPassword, values.password);
        }
        }
        secureTextEntry={true}
        placeholder='Repeat Password'
      />
      {repeatPasswordError ?
        <Text>
          {repeatPasswordError
            ? 'Passwords must match'
            : ''
          }
        </Text>
        :
        <Text>
          {fieldErrors.repeatPassword && touched.repeatPassword
            ? `${fieldErrors.repeatPassword.message}`
            : ''
          }
        </Text>
      }

      <Text>
        {errorState ? errorState : ''}
      </Text>

      <Button
        disabled={!isValid}
        onPress={() => {
          handleRegister();
        }}>
        Register
      </Button>
    </SaveAreaView>
  );
};
