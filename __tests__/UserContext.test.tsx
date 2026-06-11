/**
 * UserContext: kullanıcı adı güncellenince context değeri değişmeli.
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { UserProvider, useUser } from '../src/context/UserContext';

function Harness({ onReady }: { onReady: (api: any) => void }) {
  const api = useUser();
  onReady(api);
  return null;
}

test('varsayılan kullanıcı adı sefa123', async () => {
  let api: any | undefined;
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(
      <UserProvider>
        <Harness onReady={a => (api = a)} />
      </UserProvider>,
    );
  });

  expect(api!.username).toBe('sefa123');
});

test('setUsername context değerini günceller', async () => {
  let api: any | undefined;
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <UserProvider>
        <Harness onReady={a => (api = a)} />
      </UserProvider>,
    );
  });

  await ReactTestRenderer.act(async () => {
    api!.setUsername('yeniKullanici');
  });

  expect(api!.username).toBe('yeniKullanici');
  expect(renderer).toBeDefined();
});
