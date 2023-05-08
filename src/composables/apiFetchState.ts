import { ref, computed } from 'vue';

export function useLoading() {
  const loading = ref(false);

  const isLoading = computed(() => loading.value);

  const setLoadingOn = () => (loading.value = true);

  const setLoadingOff = () => (loading.value = false);

  return { isLoading, setLoadingOn, setLoadingOff };
}

export function useError() {
  const error = ref(false);

  const hasError = computed(() => error.value);

  const setErrorOn = () => (error.value = true);

  const setErrorOff = () => (error.value = false);

  return { hasError, setErrorOn, setErrorOff };
}
