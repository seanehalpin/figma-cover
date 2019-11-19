figma.showUI(__html__,{width: 300, height: 230});
figma.loadFontAsync({ family: "Roboto", style: "Regular" })
figma.loadFontAsync({ family: "Graphik", style: "Medium" })


figma.ui.onmessage = msg => {

  if (msg.type === 'create-page') {

    const pageTitle = msg.titletext
    const frame = figma.createFrame()
    const page = figma.createPage()
    const text = figma.createText()

    frame.resize(620,320)

    page.name = "Cover"
    frame.name = "Thumb"
      
    page.appendChild(frame)
    frame.appendChild(text)

    text.fontName = {
      family: "Graphik",
      style: "Medium",
    }

    if (pageTitle.length === 0) {
      text.characters = "Title"
    } else {
      text.characters = pageTitle
    }
    
    text.x = 0
    text.y = 105
    text.fontSize = 46
    text.textAlignVertical = "TOP"
    text.textAutoResize = "WIDTH_AND_HEIGHT"

    

    
    text.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
    page.backgrounds = [{type: 'SOLID', color: {r: 0.070588, g: 0.57254, b: 0.933}}]
    frame.backgrounds = [{type: 'SOLID', color: {r: 0.07, g: 0.57254, b: 0.933}}]

    figma.currentPage = page
    figma.viewport.zoom = 1

    figma.root.insertChild(0, page);

  }
  
  figma.closePlugin();

};
