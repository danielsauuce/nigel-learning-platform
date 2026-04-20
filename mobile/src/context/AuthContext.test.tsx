import React from 'react';
import { Text } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';
import { AuthProvider, useAuth } from './AuthContext';

type AuthSnapshot = ReturnType<typeof useAuth>;

function AuthConsumer({ onRender }: { onRender: (value: AuthSnapshot) => void }) {
  const value = useAuth();
  onRender(value);
  return <Text>{value.role ?? 'no-role'}</Text>;
}

describe('AuthContext', () => {
  it('throws when useAuth is used outside AuthProvider', () => {
    const renderWithoutProvider = () => {
      act(() => {
        TestRenderer.create(<AuthConsumer onRender={() => undefined} />);
      });
    };

    expect(renderWithoutProvider).toThrow('useAuth must be used within AuthProvider');
  });

  it('exposes the default auth state', () => {
    let latestValue: AuthSnapshot | undefined;

    act(() => {
      TestRenderer.create(
        <AuthProvider>
          <AuthConsumer onRender={(value) => void (latestValue = value)} />
        </AuthProvider>,
      );
    });

    expect(latestValue).toMatchObject({
      role: null,
      hasCompletedOnboarding: false,
      hasAcceptedPrivacy: false,
    });
  });

  it('updates role, onboarding, and privacy state', () => {
    let latestValue: AuthSnapshot | undefined;

    act(() => {
      TestRenderer.create(
        <AuthProvider>
          <AuthConsumer onRender={(value) => void (latestValue = value)} />
        </AuthProvider>,
      );
    });

    act(() => {
      latestValue?.setRole('student');
      latestValue?.completeOnboarding();
      latestValue?.acceptPrivacy();
    });

    expect(latestValue).toMatchObject({
      role: 'student',
      hasCompletedOnboarding: true,
      hasAcceptedPrivacy: true,
    });
  });

  it('resets the auth state back to its defaults', () => {
    let latestValue: AuthSnapshot | undefined;

    act(() => {
      TestRenderer.create(
        <AuthProvider>
          <AuthConsumer onRender={(value) => void (latestValue = value)} />
        </AuthProvider>,
      );
    });

    act(() => {
      latestValue?.setRole('teacher');
      latestValue?.completeOnboarding();
      latestValue?.acceptPrivacy();
    });

    act(() => {
      latestValue?.reset();
    });

    expect(latestValue).toMatchObject({
      role: null,
      hasCompletedOnboarding: false,
      hasAcceptedPrivacy: false,
    });
  });
});
