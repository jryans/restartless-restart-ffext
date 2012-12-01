/* ***** BEGIN LICENSE BLOCK *****
 * Version: MIT/X11 License
 * 
 * Copyright (c) 2011 Erik Vold
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Contributor(s):
 *   Erik Vold <erikvvold@gmail.com> (Original Author)
 *
 * ***** END LICENSE BLOCK ***** */
'use strict';

const NS_XUL = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
const keysetID = "restartless-restart-keyset";
const keyID = "RR:Restart";
const tbbID = "restartlessrestart-toolbarbutton";
const fileMenuitemID = "menu_FileRestartItem";

const { prefs } = require("simple-prefs");
const { XulKey } = require("xulkeys");
const self = require("self");
const { restart: restartApp } = require("restart");
const { get: _ } = require("l10n");
const { ToolbarButton } = require("toolbarbutton");
const { Menuitem } = require("menuitems");

function restart() {
  restartApp({
    disable_fastload: prefs['disable_fastload']
  });
}

// add hotkey
XulKey({
  id: keyID,
  modifiers: prefs["modifiers"],
  key: prefs["key"],
  onCommand: restart
});

// add menuitem
Menuitem({
  id: fileMenuitemID,
  menuid: "menu_FilePopup",
  insertbefore: "menu_FileQuitItem",
  "class": "menuitem-iconic",
  "label": _("restart"),
  "accesskey": _("restart.ak"),
  key: keyID,
  image: self.data.url("refresh_16.png"),
  onCommand: restart
});

// add toolbarbutton
ToolbarButton({
  id: tbbID,
  image: require("self").data.url("refresh_16.png"),
  label: _("restart"),
  onCommand: function () {
    restart();
  }
});
