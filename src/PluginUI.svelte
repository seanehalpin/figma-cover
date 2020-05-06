<script>

  import { GlobalCSS } from 'figma-plugin-ds-svelte';
  import styles from './styles.css';
  import { Button, Input, Label, SelectMenu, Icon, IconButton, IconListTile, IconLayoutGridUniform } from 'figma-plugin-ds-svelte';

  let menuItemArray = [
  { 'value': 'brainstorming', 'label': 'Brainstorming', 'group': null, 'selected': false },
  { 'value': 'wireframes', 'label': 'Wireframes', 'group': null, 'selected': false },
  { 'value': 'discovery', 'label': 'Discovery', 'group': null, 'selected': false },
  { 'value': 'wip', 'label': 'Work In Progress', 'group': null, 'selected': false },
  { 'value': 'usage', 'label': 'Usage', 'group': null, 'selected': false },
  { 'value': 'review', 'label': 'Review', 'group': null, 'selected': false },
  { 'value': 'research', 'label': 'Research', 'group': null, 'selected': false },
  { 'value': 'archived', 'label': 'Archived', 'group': null, 'selected': false }

  ];

  let selected;
  let inputValue;
  let categoryPlaceholder = 'Category...';
  let primary = 'primary';
  let large = true;
  let small = false;
  let pageName = 'Title...'

  function showLarge() {
    large = true;
    small = false;
  }

  function showSmall() {
    large = false;
    small = true;
  }

  window.onmessage = async (event) => {
    if (event.data.pluginMessage.name) {
      pageName = event.data.pluginMessage.name
    }
  }


  function addCover() {
    parent.postMessage({ pluginMessage: { 
      'type': 'add-cover', 
      'status': selected ? selected.value : 'default',
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

  <div class="controls">
    <div class="heading">
      <h5>Preview</h5>
    </div>
    <div class="toggles">
      {#if large}
      <IconButton iconName={IconListTile} on:click={showLarge} selected />
      <IconButton iconName={IconLayoutGridUniform} on:click={showSmall} />
      {:else}
      <IconButton iconName={IconListTile} on:click={showLarge} />
      <IconButton iconName={IconLayoutGridUniform} on:click={showSmall} selected />
      {/if}
    </div>
  </div>

  <div class="preview">
    {#if large}
    <div class="large {selected ? selected.value : 'default'}">

      <span class="category">
        {selected ? selected.label : 'Discovery'}
      </span>

      <span class="title">
        {inputValue ? inputValue : pageName}
      </span>

      <div class="footer">
        <div class="skeleton">
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <div class="avatar"></div>
      </div>
      
    </div>
    {:else}
    <div class="small">
      <div class="mini {selected ? selected.value : 'default'}">
        <span class="category">
        {selected ? selected.label : 'Discovery'}
        </span>
        <span class="title">
          {inputValue ? inputValue : pageName}
        </span>
      </div>
      <div class="right"></div>
      <div class="skeleton">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        </div>
    </div>
    {/if}
  </div>

  <div class="options">
    <SelectMenu bind:placeholder={categoryPlaceholder} bind:menuItems={menuItemArray} bind:value={selected} />
    <Input bind:value={inputValue} placeholder="Title..." />
  </div>
  
  <div class="button-holder">
    <Button on:click={closePlugin} variant="secondary">Cancel</Button>
    <Button on:click={addCover}>Create</Button>
  </div>
  

</div>