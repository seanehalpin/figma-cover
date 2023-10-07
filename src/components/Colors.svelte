<script lang="ts">

  import { tick, onMount, createEventDispatcher } from "svelte"
  import { fly,fade, scale } from "svelte/transition"
  export let options
  export let currentColor = 3
  export let previewColor = 3

  let selectedColor = 3

  const dispatch = createEventDispatcher();

  const colorPicker = (event) => {
    currentColor = event
    selectedColor = event
    dispatch('message', {color: event})

    options.forEach((option) => {
      if (option.value === event) {
        option.active = true
      } else {
        option.active = false
      }
    })
    options = options
  }

  const colorPreview = (event) => {
    previewColor = event
    dispatch('message', {preview: event})
  }

  const colorPreviewExit = () => {
    dispatch('message', {previewExit: selectedColor})
  }

  const showPicker = (event) => {
    currentColor = event
    selectedColor = event
    options.forEach((option) => {
      if (option.value === event) {
        option.active = true
      } else {
        option.active = false
      }
    })
    options = options
    dispatch('message', {showPicker: true})
  }

</script>

<div class="colors">

  {#each options as option, i}

    {#if option.option == 'Custom'}
      <button 
      class="color {option.option.toLocaleLowerCase()}" 
      class:active={option.active} 
      on:click={() => showPicker(option.value)}
      on:mouseenter={() => colorPreview(option.value)} 
      on:mouseleave={() => colorPreviewExit()} 
    >
      <span class="desc">{option.option}</span>
        <span class="rainbow"></span>
    </button>
    {:else}
    <button 
      class="color {option.option.toLocaleLowerCase()}" 
      class:active={option.active} 
      on:click={() => colorPicker(option.value)}
      on:mouseenter={() => colorPreview(option.value)} 
      on:mouseleave={() => colorPreviewExit()} 
      in:fade={{duration: 200, delay: i * 50}}
    >
      <span class="desc">{option.option}</span>
    </button>
    {/if}

  {/each}

</div>

<style lang="scss">

  @import "../mixins";

  .colors {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
  }

  .color {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 0;
    position: relative;
    background: transparent;
    // cursor: pointer;

    &:hover {
      // opacity: 0.8;
      background: var(--figma-color-bg-tertiary);
    }

    &:before {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      pointer-events: none;
      z-index: var(--zindex-2);
      transition: all 0.2s ease-in-out;
      opacity: 0;
      transform: scale3d(0.4, 0.4, 1);
    }

    &:after {
      content: '';
      width: 16px;
      height: 16px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%,0);
      pointer-events: none;
      border-radius: 50%;
      box-shadow: 0 0 0 2px var(--figma-color-bg);
      z-index: var(--zindex-3);
    }

    &.brainstorm {
      &:after {
        background: var(--color-orange);
      }
      &.active {
        &:before {
          background: var(--color-orange);
          @include show-after;
        }
      }
    }

    &.wireframes {
      &:after {
        background: var(--color-purple);
      }
      &.active {
        &:before {
          background: var(--color-purple);
          @include show-after;
        }
      }
    }

    &.discovery {
      &:after {
        background: var(--color-green);
      }
      &.active {
        &:before {
          background: var(--color-green);
          @include show-after;
        }
      }
    }

    &.review {
      &:after {
        background: var(--color-pink);
      }
      &.active {
        &:before {
          background: var(--color-pink);
          @include show-after;
        }
      }
    }

    &.spec {
      &:after {
        background: var(--color-blue);
      }
      &.active {
        &:before {
          background: var(--color-blue);
          @include show-after;
        }
      }
    }

    &.archived {
      &:after {
        background: var(--color-black);
      }
      &.active {
        &:before {
          background: var(--color-black);
          @include show-after;
        }
      }
    }

    &.custom {
      &:after {
        width: 16px;
        height: 16px;
        --_background: var(--colorCustom, var(--color-custom));
        background: var(--_background);
        box-shadow: inset 0 0 0 2px var(--figma-color-bg), inset 0 0 0 3px var(--color-border);
      }
      &.active {
        &:before {
          background: var(--color-rainbow);
          @include show-after;
        }
      }
    }

    .desc {
      display: none;
    }
  }

  .rainbow {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    transform: translate3d(-50%, -50%,0);
    border-radius: 50%;
    z-index: var(--zindex-1);
    background: var(--color-rainbow);
  }

  :global(.figma-dark .brainstorm::after) {
    background: var(--color-orange-light) !important;
  }
  :global(.figma-dark .wireframes::after) {
    background: var(--color-purple-light) !important;
  }
  :global(.figma-dark .discovery::after) {
    background: var(--color-green-light) !important;
  }
  :global(.figma-dark .review::after) {
    background: var(--color-pink-light) !important;
  }
  :global(.figma-dark .spec::after) {
    background: var(--color-blue-light) !important;
  }
  :global(.figma-dark .archived::after) {
    background: var(--color-black-light) !important;
  }

</style>