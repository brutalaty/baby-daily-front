import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia, StoreGeneric } from 'pinia';
import { useFamiliesStore } from 'src/stores/families-store';
import { mockFamiliesGetResponse } from 'src/data/Families';
import { api } from 'src/boot/axios';

describe('Families Store', () => {
  let store: StoreGeneric;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useFamiliesStore();
  });

  afterEach(() => {
    flushPromises();
  });

  describe('default state', () => {
    it('loading is false', () => {
      expect(store.isLoading).toBe(false);
    });

    it('error is false', () => {
      expect(store.hasError).toBe(false);
    });

    it('families is an empty array', () => {
      expect(store.families).toHaveLength(0);
    });
  });

  describe('downloadFamilies action', () => {
    beforeEach(() => {
      vi.spyOn(api, 'get').mockResolvedValueOnce(mockFamiliesGetResponse);
    });

    describe('when called', () => {
      it('sets loading to true', () => {
        expect(store.isLoading).toBe(false);

        store.downloadFamilies();

        expect(store.isLoading).toBe(true);
      });

      it('sets error to false', () => {
        store.setErrorOn();
        expect(store.hasError).toBe(true);

        store.downloadFamilies();

        expect(store.hasError).toBe(false);
      });

      it('calls the api to fetch the families', () => {
        expect(api.get).not.toHaveBeenCalled();

        store.downloadFamilies();

        expect(api.get).toHaveBeenCalledOnce();
        expect(api.get).toHaveBeenCalledWith('families');
      });
    });

    describe('when the action is completed', () => {
      it('sets loading to false', async () => {
        expect(store.isLoading).toBe(false);

        await store.downloadFamilies();

        expect(store.isLoading).toBe(false);
      });

      it('sets families to the api request data', async () => {
        expect(store.families).toHaveLength(0);

        await store.downloadFamilies();

        expect(store.families).toHaveLength(2);
        expect(store.families[0]).toEqual(mockFamiliesGetResponse.data[0]);
      });
    });

    describe('on fail', () => {
      beforeEach(() => {
        vi.spyOn(api, 'get').mockRejectedValueOnce(new Error('forced error'));
      });

      it('sets hasError to true', async () => {
        expect(store.hasError).toBe(false);
        await store.downloadFamilies();

        expect(store.hasError).toBe(true);
      });

      it('sets isLoading to false', async () => {
        store.downloadFamilies();
        expect(store.isLoading).toBe(true);
        await flushPromises();

        expect(store.isLoading).toBe(false);
      });
    });
  });
});
