async function main() {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}

main().then(() => {

  let entirePage = figma.currentPage
  let pageFrames = figma.currentPage.children
  let nodes = figma.currentPage.selection
  let selectedLayers = nodes

  let oldTitleArray = []

  figma.showUI(__html__, {width: 400, height: 485 })

  let name = figma.root.name

  figma.ui.postMessage({
    'name': name
  })

  figma.ui.onmessage = msg => {

    if (msg.type === 'close') {
      figma.closePlugin()
    }

    if (msg.type === 'add-cover') {

      figma.root.children.forEach(page => {

        if(page.name === "Cover") {
          
          page.children.forEach(child => {
  
            if (child.type === "FRAME") {
              child.children.forEach(newChild => {
                if (newChild.type === "TEXT" && newChild.name === "Title") {
                  let oldTitle = newChild.characters
                  oldTitleArray.push(oldTitle)
                }
              })
            }
          })
        }
      })
  
      figma.root.children.forEach(page => {
        if(page.name === "Cover") {
          
          page.children.forEach(child => {
            child.remove()
          })
          page.name = "sdc9s098c0s98"
        }
        if(page.name === "---") {
          page.remove()
        }
      })
      
      let pageTitle = msg.title
      let bgColor = msg.status
      let frame = figma.createFrame()
      let page = figma.createPage()
      let text = figma.createText()
      let label = figma.createText()
      let pageBreak = figma.createPage()
      let bgRect = figma.createRectangle()


      
      page.appendChild(frame)
      frame.appendChild(bgRect)
      frame.appendChild(text)
      frame.appendChild(label)
      frame.resize(620,320)

      page.name = "Cover"
      label.name = "Label"
      frame.name = "Thumb"
      text.name = "Title"
      bgRect.name = "Background"
      pageBreak.name = "---"
        

      text.x = 0
      text.y = 20
      text.fontName = { family: "Inter", style: "Bold" }
      text.fontSize = 46
      text.textAlignVertical = "CENTER"
      text.textAutoResize = "NONE"
      text.resize(620,320)
      text.fills = [{type: 'SOLID', color: {r: 255 / 255, g: 255 / 255, b: 255 / 255}}]

      bgRect.y = 0
      bgRect.x = 0
      bgRect.resize(620,320)

      label.y = 0
      label.x = 0
      label.fontName = { family: "Inter", style: "Regular" }
      label.fontSize = 32
      label.textAlignHorizontal ="LEFT"
      label.textAutoResize = "WIDTH_AND_HEIGHT"
      label.textAlignVertical = "TOP"
      label.fills = [{type: 'SOLID', color: {r: 255 / 255, g: 255 / 255, b: 255 / 255}}]

      async function picker(hex1,hex2,hex3,newLabel) {
        page.backgrounds = [{type: 'SOLID', color: {r: hex1 / 255, g: hex2 / 255, b: hex3 / 255}}]
        frame.backgrounds = [{type: 'SOLID', visible: false, color: {r: hex1 / 255, g: hex2 / 255, b: hex3 / 255}}]
        bgRect.fills = [{type: 'SOLID', color: {r: hex1 / 255, g: hex2 / 255, b: hex3 / 255}}]

        if (pageTitle.length === 0) {

          if (oldTitleArray.length >= 1) {
            text.characters = oldTitleArray.toString()
          } else {
            text.characters = "Title"
          }  
        } else {
          text.characters = pageTitle
        }
        label.characters = newLabel
      }

      if (bgColor === "brainstorming") {
        picker(86,194,136,"Brainstorm")
      }
  
      if (bgColor === "discovery") {
        picker(82,124,235,"Discovery")
      }
  
      if (bgColor === "wireframes") {
        picker(85,101,117,"Wireframes")
      }
  
      if (bgColor === "usage") {
        picker(18,146,238,"Usage")
      }
  
      if (bgColor === "research") {
        picker(250,179,71,"Research")
      }
  
      if (bgColor === "review") {
        picker(242,52,89,"Ready for review")
      }

      if (bgColor === "wip") {
        picker(197,147,219,"Work in progress")
      }

      if (bgColor === "archived") {
        picker(0,38,81,"Archived")
      }

      figma.currentPage = page
      figma.viewport.zoom = 1
      figma.root.insertChild(0, page);
      figma.root.insertChild(1, pageBreak);

      frame.setRelaunchData({edit: "This page was created with Cover Status"})

    }

    figma.root.children.forEach(page => {

      if (page.name === "sdc9s098c0s98") {
        page.remove()
      }
    })

    figma.closePlugin();
    
  }

})