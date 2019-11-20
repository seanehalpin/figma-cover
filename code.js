var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 300, height: 300 });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
        yield figma.loadFontAsync({ family: "Graphik", style: "Medium" });
    });
}
main().then(() => {
    figma.ui.onmessage = msg => {
        if (msg.type === 'create-page') {
            const pageTitle = msg.titletext;
            const bgColor = msg.colorValue;
            const frame = figma.createFrame();
            const page = figma.createPage();
            const text = figma.createText();
            const pageBreak = figma.createPage();
            frame.resize(620, 320);
            page.name = "Cover";
            frame.name = "Thumb";
            pageBreak.name = "---";
            page.appendChild(frame);
            frame.appendChild(text);
            text.fontName = {
                family: "Graphik",
                style: "Medium",
            };
            if (pageTitle.length === 0) {
                text.characters = "Title";
            }
            else {
                text.characters = pageTitle;
            }
            if (bgColor === "0" || bgColor === "1") {
                page.backgrounds = [{ type: 'SOLID', color: { r: 0.070588, g: 0.57254, b: 0.933 } }];
                frame.backgrounds = [{ type: 'SOLID', color: { r: 0.070588, g: 0.57254, b: 0.933 } }];
            }
            if (bgColor === "2") {
                page.backgrounds = [{ type: 'SOLID', color: { r: 0.333, g: 0.396, b: 0.458 } }];
                frame.backgrounds = [{ type: 'SOLID', color: { r: 0.333, g: 0.396, b: 0.458 } }];
            }
            if (bgColor === "3") {
                page.backgrounds = [{ type: 'SOLID', color: { r: 0.9803, g: 0.7019, b: 0.2784 } }];
                frame.backgrounds = [{ type: 'SOLID', color: { r: 0.9803, g: 0.7019, b: 0.2384 } }];
            }
            if (bgColor === "4") {
                page.backgrounds = [{ type: 'SOLID', color: { r: 0.3372, g: 0.7607, b: 0.5333 } }];
                frame.backgrounds = [{ type: 'SOLID', color: { r: 0.3372, g: 0.7607, b: 0.5333 } }];
            }
            if (bgColor === "5") {
                page.backgrounds = [{ type: 'SOLID', color: { r: 0.3215, g: 0.4862, b: 0.9215 } }];
                frame.backgrounds = [{ type: 'SOLID', color: { r: 0.3215, g: 0.4862, b: 0.9215 } }];
            }
            if (bgColor === "6") {
                page.backgrounds = [{ type: 'SOLID', color: { r: 0.9490, g: 0.2039, b: 0.3490 } }];
                frame.backgrounds = [{ type: 'SOLID', color: { r: 0.9490, g: 0.2039, b: 0.3490 } }];
            }
            text.x = 0;
            text.y = 0;
            text.fontSize = 46;
            text.textAlignVertical = "CENTER";
            text.textAutoResize = "NONE";
            text.resize(620, 320);
            text.fills = [{ type: 'SOLID', color: { r: 255 / 255, g: 255 / 255, b: 255 / 255 } }];
            figma.currentPage = page;
            figma.viewport.zoom = 1;
            figma.root.insertChild(0, page);
            figma.root.insertChild(1, pageBreak);
        }
        figma.closePlugin();
    };
});
