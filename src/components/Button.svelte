<script>
  import { onMount } from 'svelte';
  export let variant = 'primary';
  export let disabled = false;
  export let destructive = false;
  export { className as class };

  let className = '';

</script>

<button
  on:click
  on:submit|preventDefault
  onclick="this.blur();"
  {variant}
  {disabled}
  class:destructive={destructive}
  class="{variant} {className}">
  <slot />
</button>

<style lang="scss">

  button {
    display: flex;
    align-items: center;
    border-radius: var(--border-radius-large);
    color: var(--color-white);
    flex-shrink: 0;
    font-family: var(--font-inter);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--font-letter-spacing-neg-small);
    line-height: var(--font-line-height);
    height: var(--size-medium);
    padding: 0 var(--size-xsmall) 0 var(--size-xsmall);
    text-decoration: none;
    outline: none;
    border: 1px solid transparent;
    user-select: none;
  }

  /* Primary styles */
  .primary {
    background: var(--figma-color-bg-inverse);
    color: var(--figma-color-text-oninverse);

    &:hover {
      opacity: 0.9;
    }
  }
  .primary:enabled:active, .primary:enabled:focus {
    border: 1px solid var(--figma-color-border-selected);
    box-shadow: inset 0 0 0 1px var(--figma-color-border-selected);
  }

  .primary:disabled {
    opacity: 0.5;
  }

  .secondary {
    background: none;
    border: 1px solid var(--color-border-button);
    color: var(--figma-color-text);

    &:hover {
      background: var(--figma-color-bg-tertiary);
    }
  }

  :global(.figma-dark .secondary) {
    border: 1px solid var(--color-border-button-inverse) !important;
  }

  .secondary:enabled:active, .secondary:enabled:focus {
    border: 1px solid var(--figma-color-border-selected);
    box-shadow: inset 0 0 0 1px var(--figma-color-border-selected);
  }
  .secondary:disabled {
    opacity: 0.5;
  }
  
  .space-top {
    margin-top: var(--size-xsmall);
  }

  .space-left {
    margin-left: var(--size-xxsmall);
  }

  .space-right {
    margin-right: var(--size-xxsmall);
  }

</style>
