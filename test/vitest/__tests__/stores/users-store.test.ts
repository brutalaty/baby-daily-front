import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia, StoreGeneric } from 'pinia';
import { useUsersStore } from 'src/stores/users-store';
import { api } from 'src/boot/axios';

import { mockUserGetResponse } from 'src/data/Users';

describe('Users Store', () => {
  let store: StoreGeneric;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useUsersStore();
  });

  afterEach(() => {
    flushPromises();
  });

  describe('default state', () => {
    describe('user', () => {
      it('has is empty User', () => {
        expect(store.user).toEqual({
          id: -1,
          name: '',
          email: '',
          avatar: '',
          created_at: '',
          updated_at: '',
        });
      });
    });
    describe('isLoading', () => {
      it('is false', () => {
        expect(store.isLoading).toBe(false);
      });
    });
    describe('isError', () => {
      it('is false', () => {
        expect(store.isLoading).toBe(false);
      });
    });
  });

  describe('downloadUser action', () => {
    beforeEach(() => {
      vi.spyOn(api, 'get').mockResolvedValueOnce(mockUserGetResponse);
    });

    describe('when called', () => {
      it('sets loading to true', () => {
        expect(store.isLoading).toBe(false);

        store.downloadUser();

        expect(store.isLoading).toBe(true);
      });

      it('sets hasError to false', () => {
        store.setErrorOn();
        expect(store.hasError).toBe(true);

        store.downloadUser();

        expect(store.hasError).toBe(false);
      });

      it('calls the api to get the user', () => {
        expect(api.get).not.toHaveBeenCalled();

        store.downloadUser();

        expect(api.get).toHaveBeenCalledOnce();
        expect(api.get).toHaveBeenCalledWith('user');
      });
    });

    describe('when completed successfully', () => {
      it('sets isLoading is false', async () => {
        await store.downloadUser();

        expect(store.isLoading).toBe(false);
      });

      it('sets hasError to false', async () => {
        await store.downloadUser();

        expect(store.hasError).toBe(false);
      });

      it('sets the user to the responses data', async () => {
        await store.downloadUser();

        expect(store.user).toEqual(mockUserGetResponse.data);
      });
    });

    describe('when the request fails', () => {
      beforeEach(() => {
        vi.spyOn(api, 'get').mockRejectedValueOnce(
          new Error('Failed get user request (intentionally)')
        );
      });

      it('sets hasError to true', async () => {
        expect(store.hasError).toBe(false);

        await store.downloadUser();

        expect(store.hasError).toBe(true);
      });

      it('sets isLoading to false', async () => {
        await store.downloadUser();

        expect(store.isLoading).toBe(false);
      });
    });
  });
});
