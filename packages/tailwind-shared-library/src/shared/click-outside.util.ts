import { onDestroy } from 'svelte';

export function clickOutside(node) {

  onDestroy(() => {
    document.removeEventListener('click', handleClick, true);
  });

  const handleClick = event => {
    const outside = !node || (node && node != event.target && !node.contains(event.target));
    if (outside) {
      node.dispatchEvent(
        new CustomEvent('clickOutside', node)
      );
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}
