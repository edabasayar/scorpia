/**
 * Smoke tests: her ekran mock navigation ile hatasız render olmalı.
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import { UserProvider } from '../src/context/UserContext';
import SplashScreen from '../src/screens/SplashScreen';
import WelcomeScreen from '../src/screens/WelcomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import ForgotPasswordScreen from '../src/screens/ForgotPasswordScreen';
import OTPScreen from '../src/screens/OTPScreen';
import NewPasswordScreen from '../src/screens/NewPasswordScreen';
import PasswordChangedScreen from '../src/screens/PasswordChangedScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import AccountCreatedScreen from '../src/screens/AccountCreatedScreen';
import ProfileScreen from '../src/screens/ProfileScreen';

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
};

const screens: Array<[string, React.ComponentType<any>, object]> = [
  ['SplashScreen', SplashScreen, {}],
  ['WelcomeScreen', WelcomeScreen, {}],
  ['LoginScreen', LoginScreen, {}],
  ['ForgotPasswordScreen', ForgotPasswordScreen, {}],
  ['OTPScreen', OTPScreen, { route: { params: { email: 'test@ornek.com' } } }],
  ['NewPasswordScreen', NewPasswordScreen, {}],
  ['PasswordChangedScreen', PasswordChangedScreen, {}],
  ['RegisterScreen', RegisterScreen, {}],
  ['AccountCreatedScreen', AccountCreatedScreen, {}],
  ['ProfileScreen', ProfileScreen, {}],
];

describe('Ekran render testleri', () => {
  test.each(screens)('%s hatasız render olur', async (_name, Screen, extraProps) => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(
        <UserProvider>
          <Screen navigation={navigation} {...extraProps} />
        </UserProvider>,
      );
    });
  });
});
