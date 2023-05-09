import { ref, computed } from 'vue';

export function useIsLoading() {
  const loading = ref(false);

  const isLoading = computed(() => loading.value);

  const setLoadingOn = () => (loading.value = true);

  const setLoadingOff = () => (loading.value = false);

  return { isLoading, setLoadingOn, setLoadingOff };
}
