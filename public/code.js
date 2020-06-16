"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function e(e,t,a,i){return new(a||(a=Promise))((function(r,o){function n(e){try{l(i.next(e))}catch(e){o(e)}}function c(e){try{l(i.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(n,c)}l((i=i.apply(e,t||[])).next())}))}(function(){return e(this,void 0,void 0,(function*(){yield figma.loadFontAsync({family:"Roboto",style:"Regular"}),yield figma.loadFontAsync({family:"Roboto",style:"Bold"})}))})().then(()=>{figma.currentPage,figma.currentPage.children,figma.currentPage.selection;let t=[];figma.showUI(__html__,{width:400,height:485});let a=figma.root.name;figma.ui.postMessage({name:a}),figma.ui.onmessage=a=>{if("close"===a.type&&figma.closePlugin(),"add-cover"===a.type){figma.root.children.forEach(e=>{"Cover"===e.name&&e.children.forEach(e=>{"FRAME"===e.type&&e.children.forEach(e=>{if("TEXT"===e.type&&"Title"===e.name){let a=e.characters;t.push(a)}})})}),figma.root.children.forEach(e=>{"Cover"===e.name&&(e.children.forEach(e=>{e.remove()}),e.name="sdc9s098c0s98"),"---"===e.name&&e.remove()});let r=a.title,o=a.status,n=figma.createFrame(),c=figma.createPage(),l=figma.createText(),s=figma.createText(),f=figma.createPage(),g=figma.createRectangle();function i(a,i,o,f){return e(this,void 0,void 0,(function*(){c.backgrounds=[{type:"SOLID",color:{r:a/255,g:i/255,b:o/255}}],n.backgrounds=[{type:"SOLID",visible:!1,color:{r:a/255,g:i/255,b:o/255}}],g.fills=[{type:"SOLID",color:{r:a/255,g:i/255,b:o/255}}],0===r.length?t.length>=1?l.characters=t.toString():l.characters="Title":l.characters=r,s.characters=f}))}c.appendChild(n),n.appendChild(g),n.appendChild(l),n.appendChild(s),n.resize(620,320),c.name="Cover",s.name="Label",n.name="Thumb",l.name="Title",g.name="Background",f.name="---",l.x=0,l.y=20,l.fontSize=46,l.textAlignVertical="CENTER",l.textAutoResize="NONE",l.resize(620,320),l.fontName={family:"Roboto",style:"Bold"},l.fills=[{type:"SOLID",color:{r:1,g:1,b:1}}],g.y=0,g.x=0,g.resize(620,320),s.y=0,s.x=0,s.fontSize=32,s.textAlignHorizontal="LEFT",s.textAutoResize="WIDTH_AND_HEIGHT",s.textAlignVertical="TOP",s.fontName={family:"Roboto",style:"Regular"},s.fills=[{type:"SOLID",color:{r:1,g:1,b:1}}],"brainstorming"===o&&i(86,194,136,"Brainstorm"),"discovery"===o&&i(82,124,235,"Discovery"),"wireframes"===o&&i(85,101,117,"Wireframes"),"usage"===o&&i(18,146,238,"Usage"),"research"===o&&i(250,179,71,"Research"),"review"===o&&i(242,52,89,"Ready for review"),"wip"===o&&i(197,147,219,"Work in progress"),"archived"===o&&i(0,38,81,"Archived"),figma.currentPage=c,figma.viewport.zoom=1,figma.root.insertChild(0,c),figma.root.insertChild(1,f),n.setRelaunchData({edit:"This page was created with Cover Status"})}figma.root.children.forEach(e=>{"sdc9s098c0s98"===e.name&&e.remove()}),figma.closePlugin()}});
