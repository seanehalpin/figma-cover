<script lang="ts">
  import Button from "./Button.svelte";
  import Help from "./icon/Help.svelte";
</script>

<footer>
  <button class="guide">
    <span>
      <Help />
    </span>
    <span>
      Guide
    </span>
  </button>

  <div class="buttons">
    <slot/>
  </div>

</footer>

<style lang="scss">

  footer {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .guide {
    display: flex;
    border: 0;
    background: none;
    color: var(--figma-color-text);
    font-size: var(--font-size-small);
    padding: 0;
    align-items: center;
    gap: 6px;
    padding: 4px;
    // cursor: pointer;
    border-radius: var(--radius-base);

    &:hover {
      background: var(--figma-color-bg-tertiary);
    }
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

</style>