<script>

  import { GlobalCSS } from 'figma-plugin-ds-svelte';
  import styles from './styles.css';
  import { fade, fly } from 'svelte/transition';
  import { Button, Input, Label, SelectMenu, Icon, IconButton, Radio, IconSmiley, IconSettings } from 'figma-plugin-ds-svelte';

  let menuItemArray = [
  { 'value': 'brainstorming', 'label': 'Brainstorming', 'group': null, 'selected': false },
  { 'value': 'wireframes', 'label': 'Wireframes', 'group': null, 'selected': false },
  { 'value': 'discovery', 'label': 'Discovery', 'group': null, 'selected': false },
  { 'value': 'wip', 'label': 'Work In Progress', 'group': null, 'selected': false },
  { 'value': 'usage', 'label': 'Usage', 'group': null, 'selected': false },
  { 'value': 'review', 'label': 'Ready for review', 'group': null, 'selected': false },
  { 'value': 'research', 'label': 'Research', 'group': null, 'selected': false },
  { 'value': 'archived', 'label': 'Archived', 'group': null, 'selected': false }

  ];

  let selected;
  let selectedColor;
  let inputValue;
  let categoryPlaceholder = 'Category...';
  let primary = 'primary';
  let pageName = 'Title...'
  let inputName = null;
  let emojiValue;
  
  let emojis = { emojisOn: false };

  function emojiToggle() {
    emojis.emojisOn = !emojis.emojisOn;
  }

  function emojiChange() {
    emojis = { emojisOn: false};

    if (message === null) {
      message = emojiValue;
    } else {
      message = message + emojiValue;
    }
    emojiValue = ""; 
  }

  function colorToggle() {
    colors.colorsOn = !colors.colorsOn;
  }

  window.onmessage = async (event) => {
    if (event.data.pluginMessage.name) {
      pageName = event.data.pluginMessage.name
    }
  }


  function addCover() {
    parent.postMessage({ pluginMessage: { 
      'type': 'add-cover', 
      'status': selected ? selected.value : 'discovery',
      'title': inputValue ? inputValue : pageName
    } }, '*');
  }

  function closePlugin() {
    parent.postMessage({ pluginMessage: { 
      'type': 'close'
    } }, '*');
  }

</script>


<div class="wrapper p-xsmall">

  <div class="preview">
    <div class="large {selected ? selected.value : 'default'}">

      <span class="category">
        {selected ? selected.label : 'Discovery'}
      </span>

      <span class="title">
        {inputValue ? inputValue : pageName}
      </span>

      {#if inputName <=1 }
      <span></span>
      {:else}
      <span class="name {selectedColor ? selectedColor.value : 'pink'}">{inputName}</span>
      {/if}
      

      <div class="footer">
        <div class="skeleton">
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <div class="avatar"></div>
      </div>
      
    </div>
  </div>

  <div class="options">
    <SelectMenu bind:placeholder={categoryPlaceholder} bind:menuItems={menuItemArray} bind:value={selected} />
    <Input bind:value={inputValue} placeholder="Title..." />
    <Input bind:value={inputName} placeholder="Name..."  />
    {#if inputName <=1 }
    <div class="avatar-buttons"></div>
    {:else}
    {#if emojis.emojisOn}
    <div class="emoji" transition:fly="{{ y: 10, duration: 200 }}">
      <Radio bind:group={emojiValue} on:change={emojiChange} value="🦄"></Radio>
      <Radio bind:group={emojiValue} on:change={emojiChange} value="🦊"></Radio>
      <Radio bind:group={emojiValue} on:change={emojiChange} value="🐯"></Radio>
      <Radio bind:group={emojiValue} on:change={emojiChange} value="🐶"></Radio>
      <Radio bind:group={emojiValue} on:change={emojiChange} value="🐷"></Radio>
      <Radio bind:group={emojiValue} on:change={emojiChange} value="🐨"></Radio>
      <Radio bind:group={emojiValue} on:change={emojiChange} value="🐰"></Radio>
      <Radio bind:group={emojiValue} on:change={emojiChange} value="🐸"></Radio>
    </div>
     {/if}
    <div class="avatar-buttons">
    <div transition:fly="{{ y: 5, duration: 200 }}">
      <IconButton on:click={emojiToggle} iconName={IconSmiley}/>
    </div>
    <div transition:fly="{{ y: 5, duration: 200, delay: 100 }}">
      <IconButton on:click={emojiToggle} iconName={IconSettings}/>
    </div>

    </div>
    {/if}
  </div>
  
  <div class="button-holder">
    <Button on:click={closePlugin} variant="secondary">Cancel</Button>
    <Button on:click={addCover}>Create</Button>
  </div>
  

</div>