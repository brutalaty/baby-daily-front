import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useIsLoading } from 'src/composables/isloading';
import { useHasError } from 'src/composables/haserror';
import { api } from 'src/boot/axios';
import Family from 'src/types/Family';

export const useFamiliesStore = defineStore('families', () => {
  const state = ref<Family[]>([]);

  const families = computed(() => state.value);

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

  const { hasError, setErrorOn, setErrorOff } = useHasError();

  const { isLoading, setLoadingOn, setLoadingOff } = useIsLoading();

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
