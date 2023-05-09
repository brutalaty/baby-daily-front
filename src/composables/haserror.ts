import { ref, computed } from 'vue';

export function useHasError() {
  const error = ref(false);

  const hasError = computed(() => error.value);

  const setErrorOn = () => (error.value = true);

  const setErrorOff = () => (error.value = false);

  return { hasError, setErrorOn, setErrorOff };
}
