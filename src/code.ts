async function main() {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
}

main().then(() => {

  let entirePage = figma.currentPage
  let pageFrames = figma.currentPage.children
  let nodes = figma.currentPage.selection
  let selectedLayers = nodes

  function errorMsg() {
    figma.closePlugin('⚠️ Please select a frame to comment on ⚠️')
  }


  figma.showUI(__html__, {width: 400, height: 485 })

  console.log(figma.root.name)

  let name = figma.root.name

  figma.ui.postMessage({
    'name': name
  })

  figma.ui.onmessage = msg => {

    if (msg.type === 'close') {
      figma.closePlugin()
    }

    if (msg.type === 'add-cover') {
      console.log(msg.status)
      console.log(msg.title)
    }
  }

})