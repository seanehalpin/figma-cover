<script lang="ts">
  
  import {onMount,createEventDispatcher} from 'svelte';
  import { fly,fade, scale } from "svelte/transition";
  import Controls from './Controls.svelte';
  import Button from './Button.svelte';
  
  export let startColor ="#D423A0";
  export let  colorSquarePickerLeft
  export let colorSquarePickerTop
  export let huePosition
  export let pageName
  export let currentColor
  
  onMount(() => {
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("touchend", mouseUp);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchstart", killMouseEvents);
    document.addEventListener("mousedown", killTouchEvents);
    setStartColor()
  });

  const dispatchPick = createEventDispatcher();

  const hidePicker = () => {
    dispatchPick('message', {showPicker: false, left: colorSquarePickerLeft, top: colorSquarePickerTop})
  }

  const exit = () => {
    dispatchPick('message', {showPicker: false})
  }
  
  Number.prototype.mod = function(n) {
      return ((this%n)+n)%n;
  };
  const dispatch = createEventDispatcher();
  let tracked;
  export let h = 1;
  export let s = 1;
  export let v = 1;
  let a = 1;
  let r = 255;
  let g = 0;
  let b = 0;
  let hexValue = '#D423A0';  
  
  function setStartColor() {
    let hex = startColor.replace('#','');
    if (hex.length !== 6 && hex.length !== 3 && !hex.match(/([^A-F0-9])/gi)) {
      alert('Invalid property value (startColor)');
      return;
    }
    let hexFiltered='';
    if (hex.length === 3)
      hex.split('').forEach( c => {hexFiltered += c+c;});
    else
      hexFiltered=hex;
    hexValue = hexFiltered;
    r = parseInt(hexFiltered.substring(0,2), 16);
    g = parseInt(hexFiltered.substring(2,4), 16);
    b = parseInt(hexFiltered.substring(4,6), 16);
    rgbToHSV(r,g,b,true);
    updateCsPicker();
    updateHuePicker();
  }
  
  function removeEventListenerFromElement(elementId, eventName, listenerCallback) {
    let element = document.querySelector(elementId);
    if (element) element.removeEventListener(eventName, listenerCallback);
  }
  
  function killMouseEvents() {
    // removeEventListenerFromElement("#alpha-event", "mousedown", alphaDown);
    removeEventListenerFromElement("#colorsquare-event", "mousedown", csDown);
    removeEventListenerFromElement("#hue-event", "mousedown", hueDown);
    document.removeEventListener("mouseup",mouseUp);
    document.removeEventListener("mousemove",mouseMove);
    document.removeEventListener("touchstart",killMouseEvents);
    document.removeEventListener("mousedown",killTouchEvents);
  }
  
  function killTouchEvents() {
    // removeEventListenerFromElement("#alpha-event", "touchstart", alphaDownTouch);
    removeEventListenerFromElement("#colorsquare-event", "touchstart", csDownTouch);
    removeEventListenerFromElement("#hue-event", "touchstart", hueDownTouch);
    document.removeEventListener("touchend",mouseUp);
    document.removeEventListener("touchmove",touchMove);
    document.removeEventListener("touchstart",killMouseEvents);
    document.removeEventListener("mousedown",killTouchEvents);
  }
  
  function updateCsPicker() {
    let xPercentage = s * 100;
    let yPercentage = (1 - v) * 100;
    // colorSquarePickerLeft = xPercentage + "%";
    // colorSquarePickerTop = yPercentage + "%";
  }
  
  function updateHuePicker() {
    let huePicker = document.querySelector("#hue-picker");
    let xPercentage = 80
    huePicker.style.left = xPercentage + "%";
  }
  
  function colorChangeCallback() {
    dispatch('colorChange', {
      r: r,
      g: g,
      b: b,
      a: a
    });
  }
  
  function mouseMove(event) {
    if (tracked) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let trackedPos = tracked.getBoundingClientRect();
    let xPercentage, yPercentage, picker;
    switch (tracked.id) {
      case "colorsquare-event":
      xPercentage = (mouseX - trackedPos.x) / 291 * 100;
      yPercentage = (mouseY - trackedPos.y) / 232 * 100;
      (xPercentage > 100) ? xPercentage = 100: (xPercentage < 0) ? xPercentage = 0 : null;
      (yPercentage > 100) ? yPercentage = 100: (yPercentage < 0) ? yPercentage = 0 : null;
      yPercentage = yPercentage.toFixed(2);
      xPercentage = xPercentage.toFixed(2);
      colorSquarePickerLeft = xPercentage + "%";
      colorSquarePickerTop = yPercentage + "%";

      s = xPercentage / 100;
      v = 1 - yPercentage / 100;
      colorChange();
      break;
      case "hue-event":
      xPercentage = (mouseX  - trackedPos.x) / 241 * 100;
      (xPercentage > 100) ? xPercentage = 100: (xPercentage < 0) ? xPercentage = 0 : null;
      xPercentage = xPercentage.toFixed(2);
      picker = document.querySelector("#hue-picker");
      picker.style.left = xPercentage + "%";
      h = xPercentage / 100;
      hueChange();
      break;
      
    }
  
  }
  
  }
  
  function touchMove(event) {
    if (tracked) {
    let mouseX = event.touches[0].clientX;
    let mouseY = event.touches[0].clientY;
    let trackedPos = tracked.getBoundingClientRect();
    let xPercentage, yPercentage, picker;
    switch (tracked.id) {
      case "colorsquare-event":
      xPercentage = (mouseX - trackedPos.x) / 291 * 100;
      yPercentage = (mouseY - trackedPos.y) / 232 * 100;
      (xPercentage > 100) ? xPercentage = 100: (xPercentage < 0) ? xPercentage = 0 : null;
      (yPercentage > 100) ? yPercentage = 100: (yPercentage < 0) ? yPercentage = 0 : null;
      picker = document.querySelector("#colorsquare-picker");
      yPercentage = yPercentage.toFixed(2);
      xPercentage = xPercentage.toFixed(2);
      picker.style.top = yPercentage + "%";
      picker.style.left = xPercentage + "%";
      s = xPercentage / 100;
      v = 1 - yPercentage / 100;
      colorChange();
      break;
      case "hue-event":
      xPercentage = (mouseX - 10 - trackedPos.x) / 220 * 100;
      (xPercentage > 100) ? xPercentage = 100: (xPercentage < 0) ? xPercentage = 0 : null;
      xPercentage = xPercentage.toFixed(2);
      picker = document.querySelector("#hue-picker");
      picker.style.left = xPercentage + "%";
      h = xPercentage / 100;
      hueChange();
      break;
      case "alpha-event":
      xPercentage = (mouseX - 10 - trackedPos.x) / 220 * 100;
      (xPercentage > 100) ? xPercentage = 100: (xPercentage < 0) ? xPercentage = 0 : null;
      xPercentage = xPercentage.toFixed(2);
      picker = document.querySelector("#alpha-picker");
      picker.style.left = xPercentage + "%";
      a = xPercentage / 100;
      colorChange();
      break;
    }
  
  }
  
  }
  
  function csDown(event) {
    tracked = event.currentTarget;
    let xPercentage = ((event.offsetX + 1) / 291) * 100;
    let yPercentage = ((event.offsetY + 1) / 232) * 100;
    yPercentage = yPercentage.toFixed(2);
    xPercentage = xPercentage.toFixed(2)
    let picker = document.querySelector("#colorsquare-picker");
    picker.style.top = yPercentage + "%";
    picker.style.left = xPercentage + "%";
    s = xPercentage / 100;
    v = 1 - yPercentage / 100;
    colorChange();
  }
  
  function csDownTouch(event) {
    tracked = event.currentTarget;
    let rect = event.target.getBoundingClientRect();
    let offsetX = event.targetTouches[0].clientX - rect.left;
    let offsetY = event.targetTouches[0].clientY - rect.top;
    let xPercentage = ((offsetX + 1) / 291) * 100;
    let yPercentage = ((offsetY + 1) / 232) * 100;
    yPercentage = yPercentage.toFixed(2);
    xPercentage = xPercentage.toFixed(2)
    let picker = document.querySelector("#colorsquare-picker");
    picker.style.top = yPercentage + "%";
    picker.style.left = xPercentage + "%";
    s = xPercentage / 100;
    v = 1 - yPercentage / 100;
    colorChange();
  }
  
  function mouseUp(event) {
    tracked = null;
  }
  
  function hueDown(event) {
    tracked = event.currentTarget;
    let xPercentage = ((event.offsetX - 9) / 241) * 100;
    xPercentage = xPercentage.toFixed(2);
    let picker = document.querySelector("#hue-picker");
    picker.style.left = xPercentage + "%";
    h = xPercentage / 100;
    hueChange();
  }
  
  function hueDownTouch(event) {
    tracked = event.currentTarget;
    let rect = event.target.getBoundingClientRect();
    let offsetX = event.targetTouches[0].clientX - rect.left;
    let xPercentage = ((offsetX - 9) / 241) * 100;
    xPercentage = xPercentage.toFixed(2);
    let picker = document.querySelector("#hue-picker");
    picker.style.left = xPercentage + "%";
    h = xPercentage / 100;
    hueChange();
  }
  
  function hueChange() {
    let rgb = hsvToRgb(h, 1, 1)
    let colorsquare = document.querySelector(".colorsquare")
    colorsquare.style.background = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`;
    colorChange();
  }
  
  function colorChange() {
    let rgb = hsvToRgb(h, s, v);
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];
    hexValue = RGBAToHex();
    // let pickedColor = document.querySelector(".color-picked");
    // pickedColor.style.background = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
    colorChangeCallback();
  }
  
  // function alphaDown(event) {
  //   tracked = event.currentTarget;
  //   let xPercentage = ((event.offsetX - 9) / 220) * 100;
  //   xPercentage = xPercentage.toFixed(2);
  //   let picker = document.querySelector("#alpha-picker");
  //   picker.style.left = xPercentage + "%";
  //   a = xPercentage / 100;
  //   colorChange();
  // }
  
  // function alphaDownTouch(event) {
  //   tracked = event.currentTarget;
  //   let rect = event.target.getBoundingClientRect();
  //   let offsetX = event.targetTouches[0].clientX - rect.left;
  //   let xPercentage = ((offsetX - 9) / 220) * 100;
  //   xPercentage = xPercentage.toFixed(2);
  //   let picker = document.querySelector("#alpha-picker");
  //   picker.style.left = xPercentage + "%";
  //   a = xPercentage / 100;
  //   colorChange();
  // }
  
  //Math algorithms
  function hsvToRgb(h, s, v) {
  var r, g, b;
  
   var i = Math.floor(h * 6);
   var f = h * 6 - i;
   var p = v * (1 - s);
   var q = v * (1 - f * s);
   var t = v * (1 - (1 - f) * s);
  
  switch (i % 6) {
  case 0:
    r = v, g = t, b = p;
    break;
  case 1:
    r = q, g = v, b = p;
    break;
  case 2:
    r = p, g = v, b = t;
    break;
  case 3:
    r = p, g = q, b = v;
    break;
  case 4:
    r = t, g = p, b = v;
    break;
  case 5:
    r = v, g = p, b = q;
    break;
  }
  
   return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  
  function RGBAToHex() {
    let rHex = r.toString(16);
    let gHex = g.toString(16);
    let bHex = b.toString(16);

    if (rHex.length == 1)
    rHex = "0" + rHex;
    if (gHex.length == 1)
    gHex = "0" + gHex;
    if (bHex.length == 1)
    bHex = "0" + bHex;
  
  
    return ("#" + rHex + gHex + bHex).toUpperCase();
  }
  
  function rgbToHSV(r, g, b, update) {
      let rperc, gperc, bperc,max,min,diff,pr,hnew,snew,vnew;
      rperc = r / 255;
      gperc = g / 255;
      bperc = b / 255;
      max = Math.max(rperc, gperc, bperc);
      min = Math.min(rperc, gperc, bperc);
      diff = max - min;
  
      vnew = max;
      (vnew == 0) ? snew = 0 : snew = diff / max ;
  
      for (let i=0;i<3;i++) {
        if ([rperc,gperc,bperc][i] === max) {
          pr=i;
          break;
        }
      }
      if (diff==0) {
        hnew = 0;
        if (update) {
          h=hnew;
          s=snew;
          v=vnew;
          hueChange();
          return;
        }
        else {
          return {h:hnew,s:snew,v:vnew};
        }
      }
      else {
        switch (pr) {
          case 0:
            hnew=60*(((gperc-bperc)/diff)%6)/360
            break;
          case 1:
            hnew=60*(((bperc-rperc)/diff)+2)/360
            break;
          case 2:
            hnew=60*(((rperc-gperc)/diff)+4)/360
            break;
        }
        if (hnew < 0) hnew+=6;
      }
  
      if (update) {
        h=hnew;
        s=snew;
        v=vnew;
        hueChange();
      }
      else {
        return {h:hnew,s:snew,v:vnew};
      }
  }
</script>
<div class="flex-holder">
  <div class="main-container">
    <div class="type">Custom</div>
    <div class="name">
      {pageName}
    </div>
    <div class="colorsquare size" in:fade|local={{duration:200}}>
      <div class="saturation-gradient">
        <div class="value-gradient">
          <div id="colorsquare-picker" 
            in:scale|local={{duration:200, delay:200}}
            style="left:{colorSquarePickerLeft};top:{colorSquarePickerTop};"
          ></div>
          <div id="colorsquare-event" on:mousedown={csDown} on:touchstart={csDownTouch}></div>
        </div>
      </div>
    </div>
  </div>

  <div class="hue-holder">
    <div class="hue-selector" in:fly|local={{y:10, duration:200}}>
        <div id="hue-picker" style="left:{huePosition}"></div>
        <div id="hue-event" on:mousedown={hueDown} on:touchstart={hueDownTouch}></div>
    </div>
    <div class="hue-button">
      <div class="current-hue" style="background:{hexValue};"></div>
      <div class="rainbow"></div>
    </div>
  </div>

  <Controls>
    <Button class="secondary" on:click={() => exit()}>←</Button>
    <Button on:click={() => hidePicker()}>✓</Button>
  </Controls>
</div> 

<style lang="scss">

  .name {
    position: absolute;
    z-index: var(--zindex-top);
    left: 21px;
    top: 68px;
    color: var(--color-white);
    font-size: 21px;
    font-weight: 600;
    font-family: var(--font-inter);
    width: 250px;
    padding: 8px;
    transition: background 0.2s linear;
    border-radius: var(--radius-base);
    height: 66px;
    mix-blend-mode: overlay;
    opacity: 1;
    user-select: none;
    pointer-events: none;
    opacity: 0.7;
  }

  .type {
    position: absolute;
    z-index: var(--zindex-top);
    left: 29px;
    top: 17px;
    color: var(--color-white);
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-inter);
    mix-blend-mode: overlay;
    opacity: 1;
    user-select: none;
    pointer-events: none;
    opacity: 0.7;
  }

  .flex-holder {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    position: absolute;
    left: var(--space-s);
    top: var(--space-s);
    width: 291px;
  }

  $width: 100%;
  $height: 232px;

  .main-container {
    width: $width;
    // height: 265px;
    user-select: none;
  }
  
  .saturation-gradient {
    background: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0));
    width: $width;
    height: $height;
    border-radius: var(--radius-base);
  }
  
  .value-gradient {
    background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));
    // overflow: hidden;
    width: $width;
    height: $height;
    border-radius: var(--radius-base);
  }

  :global(.figma-dark .value-gradient) {
    background: linear-gradient(to top, rgb(44, 44, 44), rgba(44, 44, 44, 0)) !important;
  }

  .hue-holder {
    height: 40px;
    display: flex;
    align-items: center;
    background: var(--figma-color-bg);
    border: inset 1px var(--color-border);
    border-radius: var(--radius-base);
    padding: 0 0 0 10px;
    // margin-top: var(--space-s);
  }

  :global(.figma-dark .hue-holder) {
    border: inset 1px var(--color-border-inverse) !important;
  }
  
  .hue-selector {
    background: linear-gradient(90deg, #F21E6A 0%, #FFC062 13.35%, #0ACF83 27.36%, #1ABCFE 42.53%, #477EFF 57.71%, #A259FF 70.35%, #FF30F7 82.61%, #F21E6A 100%);
    border-radius: 6px;
    border: 1px solid var(--color-border-2);
    height: 16px;
    width: 241px;
    flex: 1;
    transition: all 0.2s linear;

    &:hover {
      filter: saturate(1.5);

      #hue-picker {
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.35);
      }
    }
  }

  :global(.figma-dark .hue-selector) {
    border: 1px solid var(--color-border-inverse-2) !important;
  }
  
  #hue-picker {
    background: var(--color-white);
    width: 6px;
    height: 16px;
    border-radius: 2px;
    left: 0%;
    position: relative;
    cursor: default;
    transform: translate(-1px, -1px);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s linear;
  }
  
  #hue-event {
    width: 241px;
    height: 15px;
    transform: translate(-1px, -16px);
    cursor: default;
    touch-action: none;
  }
  
  .alpha-selector {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 10px 10px;
    background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
    margin: 10px 10px;
    border-radius: 10px;
    height: 10px;
    position: relative;
  }
  
  #alpha-picker {
    background: #FFF;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    left: 100%;
    position: relative;
    cursor: default;
    transform: translate(-5px, -11px);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.67);
  }
  
  #alpha-event {
    width: 236px;
    height: 14px;
    transform: translate(-8px, -24px);
    cursor: default;
    touch-action: none;
  }
  
  .alpha-value {
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  
  .colorsquare {
    position: relative;
    background: rgb(255, 0, 0);
    border-radius: var(--radius-base);
    // border: inset 1px var(--color-border);
    box-shadow: 0 0 0 1px var(--color-border);
  }

  :global(.figma-dark .colorsquare) {
    // box-shadow: inset 0 0 0 1px var(--color-border-inverse) !important;
    box-shadow: none !important;
    // border: inset 1px solid var(--color-border-inverse);
  }

  :global(.figma-dark .colorsquare:before) {
    pointer-events: none;
    content: "";
    left: 0;
    top: 0;
    width: 289px;
    height: 230px;
    position: absolute;
    border: 1px solid var(--color-border-inverse);
    border-radius: var(--radius-base);
  }
  
  #colorsquare-picker {
    margin: 0;
    padding: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 4px solid var(--color-white);
    position: relative;
    transform: translate(-9px, -9px);
    left: 100%;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
  }
  
  #colorsquare-event {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translate(0, -16px);
    touch-action: none;
    border-radius: var(--radius-base);
  }
  
  .color-info-box {
    margin: 10px;
    width: 100%;
    height: 22px;
    vertical-align: middle;
    position: relative;
  }
  
  .color-picked {
    width: 18px;
    height: 18px;
    border-radius: 2px;
    background: rgba(255, 0, 0, 1);
    display: inline-block;
  }
  
  .color-picked-bg {
    background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
    background-size: 10px 10px;
    background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
    border: 2px solid #FFF;
    border-radius: 4px;
    width: 18px;
    height: 18px;
    color: #fff;
    display: inline-block;
  }
  
  .hex-text-block {
    display: inline-block;
    background: white;
    border-radius: 2px;
    padding: 2px;
    border: 1px solid #e3e3e3;
    height: 16px;
    width: 54px;
    vertical-align: top;
    text-align: center;
  }
  
  .rgb-text-block {
    display: inline-block;
    background: white;
    border-radius: 2px;
    padding: 2px;
    margin: 0 1px;
    border: 1px solid #dcdcdc;
    height: 16px;
    width: 23px;
    vertical-align: top;
    text-align: center;
  }
  
  .rgb-text-div {
    right: 10%;
    display: inline-block;
    vertical-align: top;
    position: absolute;
  }
  
  .text-label {
    position: relative;
    top: -12px;
    font-family: sans-serif;
    font-size: small;
    color:#888;
  }
  
  .text {
    display: inline;
    font-family: sans-serif;
    margin: 0;
    display: inline-block;
    font-size: 12px;
    font-size-adjust: 0.50;
    position: relative;
    top: -1px;
    vertical-align: middle;
    -webkit-touch-callout: all;
    -webkit-user-select: all;
    -khtml-user-select: all;
    -moz-user-select: all;
    -ms-user-select: all;
    user-select: all;
  }

  .hue-button {
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    position: relative;

    .current-hue {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 2px var(--figma-color-bg), inset 0 0 0 3px var(--color-border);
      position: relative;
      z-index: var(--zindex-2);
    }

    .rainbow {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 20px;
      height: 20px;
      transform: translate3d(-50%, -50%, 0);
      border-radius: 50%;
      z-index: var(--zindex-1);
      background: var(--color-rainbow);
    }
  }

  :global(.figma-dark .hue-button .current-hue) {
    box-shadow: inset 0 0 0 2px var(--figma-color-bg), inset 0 0 0 3px var(--color-border-inverse);
  }

  </style>