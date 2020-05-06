'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
        yield figma.loadFontAsync({ family: "Roboto", style: "Bold" });
    });
}
main().then(() => {
    let entirePage = figma.currentPage;
    let pageFrames = figma.currentPage.children;
    let nodes = figma.currentPage.selection;
    let oldTitleArray = [];
    figma.showUI(__html__, { width: 400, height: 485 });
    let name = figma.root.name;
    figma.ui.postMessage({
        'name': name
    });
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
        if (msg.type === 'close') {
            figma.closePlugin();
        }
        if (msg.type === 'add-cover') {
            let pageTitle = msg.title;
            let bgColor = msg.status;
            let frame = figma.createFrame();
            let page = figma.createPage();
            let text = figma.createText();
            let label = figma.createText();
            let pageBreak = figma.createPage();
            page.appendChild(frame);
            frame.appendChild(text);
            frame.appendChild(label);
            frame.resize(620, 320);
            page.name = "Cover";
            label.name = "Label";
            frame.name = "Thumb";
            text.name = "Title";
            pageBreak.name = "---";
            text.x = 0;
            text.y = 20;
            text.fontSize = 46;
            text.textAlignVertical = "CENTER";
            text.textAutoResize = "NONE";
            text.resize(620, 320);
            text.fontName = { family: "Roboto", style: "Bold" };
            text.fills = [{ type: 'SOLID', color: { r: 255 / 255, g: 255 / 255, b: 255 / 255 } }];
            label.y = 0;
            label.x = 0;
            label.fontSize = 32;
            label.textAlignHorizontal = "LEFT";
            label.textAutoResize = "WIDTH_AND_HEIGHT";
            label.textAlignVertical = "TOP";
            label.fontName = { family: "Roboto", style: "Regular" };
            label.fills = [{ type: 'SOLID', color: { r: 255 / 255, g: 255 / 255, b: 255 / 255 } }];
            function picker(hex1, hex2, hex3, newLabel) {
                return __awaiter(this, void 0, void 0, function* () {
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
                });
            }
            if (bgColor === "brainstorming") {
                picker(86, 194, 136, "Brainstorm");
            }
            if (bgColor === "discovery") {
                picker(82, 124, 235, "Discovery");
            }
            if (bgColor === "wireframes") {
                picker(85, 101, 117, "Wireframes");
            }
            if (bgColor === "usage") {
                picker(18, 146, 238, "Usage");
            }
            if (bgColor === "research") {
                picker(250, 179, 71, "Research");
            }
            if (bgColor === "review") {
                picker(242, 52, 89, "Ready for review");
            }
            if (bgColor === "wip") {
                picker(197, 147, 219, "Work in progress");
            }
            if (bgColor === "archived") {
                picker(0, 38, 81, "Archived");
            }
            figma.currentPage = page;
            figma.viewport.zoom = 1;
            figma.root.insertChild(0, page);
            figma.root.insertChild(1, pageBreak);
            frame.setRelaunchData({ edit: "This page was created with Cover Status" });
        }
        figma.root.children.forEach(page => {
            if (page.name === "sdc9s098c0s98") {
                page.remove();
            }
        });
        figma.closePlugin();
    };
});
//# sourceMappingURL=code.js.map
