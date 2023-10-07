<script lang="ts">

  import { fly,fade } from "svelte/transition";
  import { afterUpdate, onDestroy, onMount } from 'svelte';
  
  export let picker = false
  export let currentColor
  export let pageName

  let focus = false

  $: coverType = "Discovery"

  $: if (currentColor == 1) {
    coverType = "Brainstorm"
  } else if (currentColor == 2) {
    coverType = "Wireframes"
  } else if (currentColor == 3) {
    coverType = "Discovery"
  } else if (currentColor == 4) {
    coverType = "Review"
  } else if (currentColor == 5) {
    coverType = "Spec"
  } else if (currentColor == 6) {
    coverType = "Archived"
  } else if (currentColor == 7) {
    coverType = "Custom"
  }

  const updatePageName = (event) => {
    focus = false
  }

  const showTextArea = () => {
    focus = true
  }

  let textarea
  function focusTextarea() {
    remainingChars = 40 - pageName.length
    setTimeout(() => {
      textarea.focus();
    }, 100);
  }

  let remainingChars = 40

  const updateRemainingChars = () => {
    remainingChars = 40 - pageName.length;
  };

  onMount(() => {
    setTimeout(() => {
      updateRemainingChars();
    }, 100);
  });

  function handleInput(event) {
    pageName = event.target.value.slice(0, 40); // Limit the input to 50 characters
    updateRemainingChars();
  }

</script>

<div class="card" in:fade|local={{duration:200}}>

  <div class="header theme-{currentColor}">

    {#if !picker}
      {#key coverType}
        <div class="type">{coverType}</div>
      {/key}

      {#if !focus}
      <div 
        class="name" 
        on:click={() => showTextArea()} 
      >{pageName} 
      </div>
      {:else}
      <textarea
        class="textarea" 
        maxlength="40"
        bind:this={textarea}
        bind:value={pageName}
        use:focusTextarea 
        on:blur={() => updatePageName()} 
        on:input={handleInput}
      ></textarea>

      <div class="counter" in:fade|local={{duration:200}}>
        {remainingChars}
      </div>
      {/if}

    {/if}

  </div>
  <div class="footer">

    {#if !picker}
      <div class="placeholder">
        <div class="placeholder__text">
          <div class="placeholder__line placeholder__line--first"></div>
          <div class="placeholder__line placeholder__line--second"></div>
        </div>
        <div class="placeholder__avatar"></div>
      </div>
    {/if}

  </div>

</div>

<style lang="scss">

  .placeholder {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 var(--space-s);
    gap: var(--space-s);

    &__text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }

    &__line {
      height: 9px;
      width: 100%;
      background: var(--color-placeholder);
      border-radius: var(--radius-base);

      &--first {
        width: 50%;
      }
      &--second {
        width: 20%;
      }
    }

    &__avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--color-placeholder);
      display: flex;
    }
  }

  :global(.figma-dark .placeholder__line) {
    background: var(--color-placeholder-inverse);
  }

  :global(.figma-dark .placeholder__avatar) {
    background: var(--color-placeholder-inverse);
  }

  .card {
    height: 232px;
    width: 100%;
    position: relative;
    border-radius: var(--radius-base);
    // box-shadow: inset 0 0 0 1px var(--color-border);
    display: flex;
    flex-direction: column;
  }

  .type {
    position: absolute;
    left: 28px;
    top: 16px;
    color: var(--color-white);
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-inter);
  }

  .name {
    cursor: text;
    position: absolute;
    left: 20px;
    top: calc(75px - 8px);
    color: var(--color-white);
    font-size: 21px;
    font-weight: 600;
    font-family: var(--font-inter);
    width: 250px;
    padding: 8px;
    transition: background 0.2s linear;
    border-radius: var(--radius-base);
    height: 66px;

    &:hover {
      background: rgba(0,0,0,0.1);
    }

    &:active, &:focus {
      outline: 0;
    }
  }

  .textarea {
    position: absolute;
    left: 20px;
    top: calc(75px - 8px);
    color: var(--color-white);
    font-size: 21px;
    font-weight: 600;
    font-family: var(--font-inter);
    width: 250px;
    padding: 8px;
    border-radius: var(--radius-base);
    border: 0;
    resize: none;
    background: rgba(0,0,0,0.2);

    &:active, &:focus {
      outline: 0;
    }
  }

  .focus {
    background: rgba(0,0,0,0.2) !important;
  }

  .header {
    flex: 1;
    background: var(--figma-color-bg-inverse);
    border-radius: var(--radius-base) var(--radius-base) 0 0;
    border: inset 1px var(--color-border);
    transition: background 0.2s linear;
    position: relative;
    overflow: hidden;

    &.theme-1 {
      background: var(--color-orange);
    }

    &.theme-2 {
      background: var(--color-purple);
    }

    &.theme-3 {
      background: var(--color-green);
    }

    &.theme-4 {
      background: var(--color-pink);
    }

    &.theme-5 {
      background: var(--color-blue);
    }

    &.theme-6 {
      background: var(--color-black);
    }

    &.theme-7 {
      --_background: var(--colorCustom,var(--color-custom));
      background: var(--_background);
    }
  }

  :global(.figma-dark .header) {
    border: inset 1px var(--color-border-inverse);
  }

  .footer {
    height: 56px;
    background: var(--figma-color-bg);
    border: inset 1px var(--color-border);
    border-top: 0;
    border-radius: 0 0 var(--radius-base) var(--radius-base);
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  :global(.figma-dark .footer) {
    border: inset 1px var(--color-border-inverse);
    border-top: 0;
  }

  .counter {
    position: absolute;
    right: 24px;
    top: 17px;
    color: var(--color-white);
    text-align: right;
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-normal);
    letter-spacing: var(--font-letter-spacing-neg-small);
  }

</style>