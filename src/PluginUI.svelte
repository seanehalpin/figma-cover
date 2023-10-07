<script>
  
  import styles from './styles.scss'
  import { onMount } from 'svelte'
  import Card from './components/Card.svelte'
  import Colors from './components/Colors.svelte'
  import Container from './components/Container.svelte'
  import Controls from './components/Controls.svelte'
    import Picker from './components/Picker.svelte';
    import Button from './components/Button.svelte';
  
  let ready
  let pageName
  let showPicker = true
  $: currentColor = 3
  $: customColor = "#D423A0"
  $: options = [
    {option: 'Brainstorm', value: 1, active: false},
    {option: 'Wireframes', value: 2, active: false},
    {option: 'Discovery', value: 3, active: true},
    {option: 'Review', value: 4, active: false},
    {option: 'Spec', value: 5, active: false},
    {option: 'Archived', value: 6, active: false},
    {option: 'Custom', value: 7, active: false},
  ]

  const addCover = () => {
    parent.postMessage({ pluginMessage: { 
      'type': 'add-cover', 
      'status': selected ? selected.value : 'discovery',
      'title': inputValue ? inputValue : pageName
    } }, '*');
  }

  const closePlugin = () => {
    parent.postMessage({ pluginMessage: { 
      'type': 'close'
    } }, '*');
  }

  const handleColor = (event) => {
    let color = event.detail.color
    let preview = event.detail.preview
    let previewExit = event.detail.previewExit
    let picker = event.detail.showPicker
    if (preview) {
      currentColor = preview
    }
    if (previewExit) {
      currentColor = previewExit
    }
    if (color){
      currentColor = color
    }
    if(picker) {
      showPicker = picker
    }
  }

  window.onmessage = async (event) => {
    if (event.data.pluginMessage.name) {
      pageName = event.data.pluginMessage.name
    }
  }

  onMount(() => {
    ready = true
  })

  const handlePicker = (event) => {
    let picked = event.detail.showPicker
    let left = event.detail.left
    let top = event.detail.top

    showPicker = picked
    colorSquarePickerLeft = left
    colorSquarePickerTop = top
    
  }

  let h = 1, s = 1, v = 1
  let colorSquarePickerLeft = "82%", colorSquarePickerTop = "15%"
  let huePosition = "80%"

  $: console.log("checking color: ", colorSquarePickerLeft, colorSquarePickerTop)

</script>

{#if ready}
<Container>
  {#if showPicker}
  <Picker 
  on:message={handlePicker} 
  bind:h
  bind:s
  bind:v
  bind:colorSquarePickerLeft
  bind:colorSquarePickerTop
  bind:currentColor 
  bind:pageName
  />
  {:else}
  <Card 
    bind:currentColor 
    bind:pageName
    --colorCustom={customColor} 
  />
  <Colors 
    on:message={handleColor} 
    bind:currentColor 
    bind:options 
    --colorCustom={customColor}
  />
  <Controls>
  <Button on:click={() => showPicker = true}>Create</Button>
  </Controls>
  {/if}
</Container>
{/if}