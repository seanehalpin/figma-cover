'use strict';

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
        yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
    });
}
main().then(() => {
    let entirePage = figma.currentPage;
    let pageFrames = figma.currentPage.children;
    let nodes = figma.currentPage.selection;
    let resizeWidth = 1600;
    let resizeHeight = 960;
    let oldTitleArray = [];
    figma.showUI(__html__, { width: 400, height: 485 });
    let name = figma.root.name;
    figma.ui.postMessage({
        'name': name
    });
    figma.ui.onmessage = msg => {
        if (msg.type === 'close') {
            figma.closePlugin();
        }
        if (msg.type === 'add-cover') {
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
            let pageTitle = msg.title;
            let bgColor = msg.status;
            let frame = figma.createFrame();
            let page = figma.createPage();
            let text = figma.createText();
            let label = figma.createText();
            let pageBreak = figma.createPage();
            let bgRect = figma.createRectangle();
            page.appendChild(frame);
            frame.appendChild(bgRect);
            frame.appendChild(text);
            frame.appendChild(label);
            frame.resize(resizeWidth, resizeHeight);
            page.name = "Cover";
            label.name = "Label";
            frame.name = "Thumb";
            text.name = "Title";
            bgRect.name = "Background";
            pageBreak.name = "---";
            figma.setFileThumbnailNodeAsync(frame);
            text.x = 180;
            text.y = 57;
            text.fontSize = 110;
            text.textAlignVertical = "CENTER";
            text.textAutoResize = "NONE";
            text.resize(1240, resizeHeight);
            text.fontName = { family: "Roboto", style: "Bold" };
            text.fills = [{ type: 'SOLID', color: { r: 255 / 255, g: 255 / 255, b: 255 / 255 } }];
            bgRect.y = 0;
            bgRect.x = 0;
            bgRect.resize(resizeWidth, resizeHeight);
            label.y = 60;
            label.x = 180;
            label.fontSize = 75;
            label.textAlignHorizontal = "LEFT";
            label.textAutoResize = "WIDTH_AND_HEIGHT";
            label.textAlignVertical = "TOP";
            label.fontName = { family: "Roboto", style: "Regular" };
            label.fills = [{ type: 'SOLID', color: { r: 255 / 255, g: 255 / 255, b: 255 / 255 } }];
            function picker(hex1, hex2, hex3, newLabel) {
                return __awaiter(this, void 0, void 0, function* () {
                    page.backgrounds = [{ type: 'SOLID', color: { r: 234 / 255, g: 234 / 255, b: 234 / 255 } }];
                    frame.backgrounds = [{ type: 'SOLID', visible: false, color: { r: hex1 / 255, g: hex2 / 255, b: hex3 / 255 } }];
                    bgRect.fills = [{ type: 'SOLID', color: { r: hex1 / 255, g: hex2 / 255, b: hex3 / 255 } }];
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
