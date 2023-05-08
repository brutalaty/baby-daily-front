import { defineStore } from 'pinia';
import { readonly, computed, ref } from 'vue';
import { useLoading, useError } from 'src/composables/apiFetchState';
import { api } from 'src/boot/axios';
import Family from 'src/types/Family';

export const useFamiliesStore = defineStore('families', () => {
  const state = ref<Family[]>([]);

  const families = computed(() => readonly(state));

  async function downloadFamilies() {
    setLoadingOn();
    setErrorOff();

    try {
      const response = await api.get('families');
      state.value = response.data;
    } catch (e) {
      setErrorOn();
      console.error('Failed to request families from the server');
    } finally {
      setLoadingOff();
    }
  }

  const { hasError, setErrorOn, setErrorOff } = useError();

  const { isLoading, setLoadingOn, setLoadingOff } = useLoading();

  return {
    families,
    downloadFamilies,

    hasError,
    setErrorOn,
    setErrorOff,

    isLoading,
    setLoadingOn,
    setLoadingOff,
  };
});
