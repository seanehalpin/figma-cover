var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 300, height: 340 });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
        yield figma.loadFontAsync({ family: "Graphik", style: "Medium" });
        yield figma.loadFontAsync({ family: "Graphik", style: "Regular" });
    });
}
main().then(() => {
    let oldTitleArray = [];
    figma.ui.onmessage = msg => {
        figma.root.children.forEach(page => {
            if (page.name === "Cover") {
                page.children.forEach(child => {
                    if (child.type === "FRAME") {
                        child.children.forEach(newChild => {
                            if (newChild.type === "TEXT" && newChild.name === "Title") {
                                let oldTitle = newChild.characters;
                                oldTitleArray.push(oldTitle);
                            }
                        });
                    }
                });
            }
        });
        figma.root.children.forEach(page => {
            if (page.name === "Cover") {
                page.children.forEach(child => {
                    child.remove();
                });
                page.name = "sdc9s098c0s98";
            }
            if (page.name === "---") {
                page.remove();
            }
        });
        if (msg.type === 'create-page') {
            const pageTitle = msg.titletext;
            const bgColor = msg.colorValue;
            const frame = figma.createFrame();
            const page = figma.createPage();
            const text = figma.createText();
            const label = figma.createText();
            const pageBreak = figma.createPage();
            frame.resize(620, 320);
            page.name = "Cover";
            label.name = "Label";
            frame.name = "Thumb";
            text.name = "Title";
            pageBreak.name = "---";
            page.appendChild(frame);
            frame.appendChild(text);
            frame.appendChild(label);
            text.fontName = {
                family: "Graphik",
                style: "Medium",
            };
            label.fontName = {
                family: "Graphik",
                style: "Regular",
            };
            text.x = 0;
            text.y = 20;
            text.fontSize = 46;
            text.textAlignVertical = "CENTER";
            text.textAutoResize = "NONE";
            text.resize(620, 320);
            label.y = 0;
            label.x = 0;
            label.fontSize = 32;
            label.textAlignHorizontal = "LEFT";
            label.textAutoResize = "WIDTH_AND_HEIGHT";
            label.textAlignVertical = "TOP";
            text.fills = [{ type: 'SOLID', color: { r: 255 / 255, g: 255 / 255, b: 255 / 255 } }];
            label.fills = [{ type: 'SOLID', color: { r: 255 / 255, g: 255 / 255, b: 255 / 255 } }];
            function picker(hex1, hex2, hex3, newLabel) {
                page.backgrounds = [{ type: 'SOLID', color: { r: hex1 / 255, g: hex2 / 255, b: hex3 / 255 } }];
                frame.backgrounds = [{ type: 'SOLID', visible: false, color: { r: hex1 / 255, g: hex2 / 255, b: hex3 / 255 } }];
                if (pageTitle.length === 0) {
                    if (oldTitleArray.length >= 1) {
                        text.characters = oldTitleArray.toString();
                    }
                    else {
                        text.characters = "Title";
                    }
                }
                else {
                    text.characters = pageTitle;
                }
                label.characters = newLabel;
            }
            if (bgColor === "0" || bgColor === "1") {
                picker(86, 194, 136, "Brainstorm");
            }
            if (bgColor === "2") {
                picker(82, 124, 235, "Discovery");
            }
            if (bgColor === "3") {
                picker(85, 101, 117, "Wireframes");
            }
            if (bgColor === "4") {
                picker(18, 146, 238, "Usage");
            }
            if (bgColor === "5") {
                picker(250, 179, 71, "Research");
            }
            if (bgColor === "6") {
                picker(242, 52, 89, "Review");
            }
            if (bgColor === "7") {
                picker(197, 147, 219, "Work In Progress");
            }
            figma.currentPage = page;
            figma.viewport.zoom = 1;
            figma.root.insertChild(0, page);
            figma.root.insertChild(1, pageBreak);
        }
        figma.root.children.forEach(page => {
            if (page.name === "sdc9s098c0s98") {
                page.remove();
            }
        });
        figma.closePlugin();
    };
});
