<script lang="ts">

</script>

<div class="container">
  <slot />
</div>

<style lang="scss">

  .container {
    background: var(--color-bg);
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--space-s);
    // justify-content: space-between;
    gap: var(--space-s);
  }

  :global(.figma-dark .container) {
    background: var(--figma-color-bg);
  }

</style>