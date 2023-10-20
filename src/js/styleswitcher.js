function setActiveStyleSheet(title) {
  localStorage.setItem("hotdoc.style", title);

  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (!a.hasAttribute('rel')) {
      continue;
    }

    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }

  const frame = document.getElementById('sitenav-frame');

  if (frame) {
    let msg = {"hotdoc/sitenav-action": "update-style"}
    frame.contentWindow.postMessage(msg, '*');
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (!a.hasAttribute('rel')) {
      continue;
    }

    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (!a.hasAttribute('rel')) {
      continue;
    }

    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function setCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/;SameSite=Strict";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function setPreferredStyleSheet() {
  const stored = localStorage.getItem("hotdoc.style");
  const title = stored ? stored : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}

window.onload = function(e) {
  setPreferredStyleSheet();
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  setCookie("style", title, 365);
}

setPreferredStyleSheet();

$(document).ready(function() {
  $('#lightmode-icon').click(function() {
    if (getActiveStyleSheet() == 'dark') {
      setActiveStyleSheet('light');
    } else {
      setActiveStyleSheet('dark');
    }
  });
});
