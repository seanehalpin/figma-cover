figma.showUI(__html__,{width: 300, height: 340});

async function main() {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  await figma.loadFontAsync({ family: "Graphik", style: "Medium" });
}

main().then(() => {

  let oldTitleArray = []

  figma.ui.onmessage = msg => {

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
        page.name = "Old"
      }
      if(page.name === "---") {
        page.remove()
      }
    })

    if (msg.type === 'create-page') {
  
      const pageTitle = msg.titletext
      const bgColor = msg.colorValue
      const frame = figma.createFrame()
      const page = figma.createPage()
      const text = figma.createText()
      const label = figma.createText()
      const pageBreak = figma.createPage()
  
      frame.resize(620,320)
  
      page.name = "Cover"
      label.name = "Label"
      frame.name = "Thumb"
      text.name = "Title"
      pageBreak.name = "---"
        
      page.appendChild(frame)
      frame.appendChild(text)
      frame.appendChild(label)
  
      text.fontName = {
        family: "Graphik",
        style: "Medium",
      }

      label.fontName = {
        family: "Graphik",
        style: "Medium",
      }
      
      text.x = 0
      text.y = 20
      text.fontSize = 46
      text.textAlignVertical = "CENTER"
      text.textAutoResize = "NONE"
      text.resize(620,320)

      label.y = 0
      label.x = 0
      label.fontSize = 32
      label.textAlignHorizontal ="LEFT"
      label.textAutoResize = "WIDTH_AND_HEIGHT"
      label.textAlignVertical = "TOP"
  
      text.fills = [{type: 'SOLID', color: {r: 255 / 255, g: 255 / 255, b: 255 / 255}}]
      label.fills = [{type: 'SOLID', color: {r: 255 / 255, g: 255 / 255, b: 255 / 255}}]

      if (bgColor === "0" || bgColor === "1") {
        page.backgrounds = [{type: 'SOLID', color: {r: 86 / 255, g: 194 / 255, b: 136 / 255}}]
        frame.backgrounds = [{type: 'SOLID', color: {r: 86 / 255, g: 194 / 255, b: 136 / 255}}]

        if (pageTitle.length === 0) {

          if (oldTitleArray.length >= 1) {
            text.characters = oldTitleArray.toString()
          } else {
            text.characters = "Title"
          }  
        } else {
          text.characters = pageTitle
        }
        label.characters = "Brainstorm"
      }
  
      if (bgColor === "2") {
        page.backgrounds = [{type: 'SOLID', color: {r: 82 / 255, g: 124 / 255, b: 235 / 255}}]
        frame.backgrounds = [{type: 'SOLID', color: {r: 82 / 255, g: 124 / 255, b: 235 / 255}}]

       if (pageTitle.length === 0) {

          if (oldTitleArray.length >= 1) {
            text.characters = oldTitleArray.toString()
          } else {
            text.characters = "Title"
          }  
        } else {
          text.characters = pageTitle
        }

        label.characters = "Discovery"
      }
  
      if (bgColor === "3") {
        page.backgrounds = [{type: 'SOLID', color: {r: 85 / 255, g: 101 / 255, b: 117 / 255}}]
        frame.backgrounds = [{type: 'SOLID', color: {r: 85 / 255, g: 101 / 255, b: 117 / 255}}]

       if (pageTitle.length === 0) {

          if (oldTitleArray.length >= 1) {
            text.characters = oldTitleArray.toString()
          } else {
            text.characters = "Title"
          }  
        } else {
          text.characters = pageTitle
        }

        label.characters = "Experimental"
      }
  
      if (bgColor === "4") {
        page.backgrounds = [{type: 'SOLID', color: {r: 18 / 255, g: 146 / 255, b: 238 / 255}}]
        frame.backgrounds = [{type: 'SOLID', color: {r: 18 / 255, g: 146 / 255, b: 238 / 255}}]

        if (pageTitle.length === 0) {

          if (oldTitleArray.length >= 1) {
            text.characters = oldTitleArray.toString()
          } else {
            text.characters = "Title"
          }  
        } else {
          text.characters = pageTitle
        }

        label.characters = "Hand-Off"
      }
  
      if (bgColor === "5") {
        page.backgrounds = [{type: 'SOLID', color: {r: 250 / 255, g: 179 / 255, b: 71 / 255}}]
        frame.backgrounds = [{type: 'SOLID', color: {r: 250 / 255, g: 179 / 255, b: 71 / 255}}]

        if (pageTitle.length === 0) {

          if (oldTitleArray.length >= 1) {
            text.characters = oldTitleArray.toString()
          } else {
            text.characters = "Title"
          }  
        } else {
          text.characters = pageTitle
        }

        label.characters = "Research"
      }
  
      if (bgColor === "6") {
        page.backgrounds = [{type: 'SOLID', color: {r: 242 / 255, g: 52 / 255, b: 89 / 255}}]
        frame.backgrounds = [{type: 'SOLID', color: {r: 242 / 255, g: 52 / 255, b: 89 / 255}}]

        if (pageTitle.length === 0) {

          if (oldTitleArray.length >= 1) {
            text.characters = oldTitleArray.toString()
          } else {
            text.characters = "Title"
          }  
        } else {
          text.characters = pageTitle
        }

        label.characters = "Review"
      }

      if (bgColor === "7") {
        page.backgrounds = [{type: 'SOLID', color: {r: 197 / 255, g: 147 / 255, b: 219 / 255}}]
        frame.backgrounds = [{type: 'SOLID', color: {r: 197 / 255, g: 147 / 255, b: 219 / 255}}]

        if (pageTitle.length === 0) {

          if (oldTitleArray.length >= 1) {
            text.characters = oldTitleArray.toString()
          } else {
            text.characters = "Title"
          }  
        } else {
          text.characters = pageTitle
        }

        label.characters = "Work In Progress"
      }

      figma.currentPage = page
      figma.viewport.zoom = 1
      figma.root.insertChild(0, page);
      figma.root.insertChild(1, pageBreak);
  
    }

    figma.root.children.forEach(page => {

      if(page.name === "Old") {
        page.remove()
      }
    })
 
    figma.closePlugin();
  
  }
})




