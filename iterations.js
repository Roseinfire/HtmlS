/* load */
var loads = 0
function awaitload(endkey) {
  if( window.onresize) { window.onresize() }
  if(!loads && endkey != "") { try { hand.innerHTML = ""; } catch{} }
  if(!endkey) { loads++ }
  else if(endkey) { loads-- }
  if(!loads) {
    try {
      var color = getouter("theme")
      var image = getouter("background")
      var style = getouter("style")
      var width = getouter("layout")
      background(color, image, width)
      hand.style = style
      document.getElementById("content").style.display = "block";
      document.getElementById("load").style.display = "none";
      if(!nods.length) { 
        hand.innerHTML = `<p style="font-size: 35px; text-align: center; color: maroon">Document Empy</p>`
       }
      if( window.onresize) { window.onresize() }  
    } catch { console.warn("iterations run was not standart") }
   console.groupEnd("compilation")
  }
};

/* core */
class keyword {
  constructor(start=[], end=[], recall=function() {}) {
    this.start = function(compl) {
      for(var i = 0; i < start.length; i++) { if(start[i]==compl) { return true } }
        return false
       }
    this.end = function(compl) {
      for(var i = 0; i < end.length; i++) { if(end[i]==compl) { return true } }
        return false
      }
    this.recall = function(event, response) { 
      if(response) { console.log(event) }   
        recall(event)
       }
     }
 };

var keywords = []
function pushkeyword(start_symbol, end_symbol, result) {
  keywords.push( new keyword(start_symbol, end_symbol, result) )
 };

function read(data, response) {
  awaitload()
  var iteration = null
  var res = ""
  var pos = -1
  while(data[pos+1]) {
    pos++; var change = null
    for(var i = 0; i < keywords.length; i++) {
      if(iteration && keywords[i] == iteration && keywords[i].end( data[pos] )) {
        iteration.recall(res, response); res = ""; iteration = null;
       }
      if(!iteration && keywords[i].start( data[pos] )) { 
        iteration = keywords[i]; change = true;
       }
    }         
    if(iteration && !change) { res += data[pos] }
    if(change) { change = null }
  }
  if(iteration) { iteration.recall(res, response) }
  awaitload(true)
 };

/* syntax */
var tempovar = null
var tempotext = null
var tempotype = null
var tempowrite = null
var keycode = null
var childhood = 0
var nods = new Array()
var styles = new Array()

function cssmodify(style) {
  var adition = true;
  for(var i = style.length-1; i > 0; i--) {
    if(style[i] == ";") { adition = false;}
    if(style[i] != " ") { break }
   }
  if(adition) { return style+";" } else { return style }
};

function getvalue(name, err) {
   for(var i = 0; i < styles.length; i++) {
      if(styles[i].name == name) { return cssmodify(styles[i].data) }
    }
   if(err) { console.error("Can't find link @" + res) }
};

 function setvalue(name, data) {
    if( !getvalue(name) ) {
      styles.push({ name: name, data: data })
    } else { console.error("variable didn't created: double name error") }
 };

function groupitem(element, command) {
  var num = 1
  var prop = 1
  var mar = 0
  var cnt = 1
  var res = ""
  for(var i = 0; i < command.length; i++) {
    es += command[i]
    if(command[i] == " " && cnt == 1) { cnt++;
      try{ mar=eval(res); res = "" } catch {}
     }
    if(command[i] == " " && cnt == 2) { cnt++;
      try{ prop=eval(res); res = "" } catch {}
     }
    if(command[i] == " " && cnt == 3) { cnt++;
      try{ num=eval(res); res = "" } catch {}
    }
   onResize(element, function(e) {
       var margin = mar
       e.style.marginLeft = margin + "px"
       var padding = onlyNumbers(e.style.paddingRight) + onlyNumbers(e.style.paddingLeft)
       e.style.width = (hand.offsetWidth-2*margin-padding) + "px"
    })
  };
           /* Need tests
             var parent = element.parentElement
             for(var i = 1; i < num; i++) {
              var brother = element.cloneNode(20)
              onResize(brother, function(e) {
               var width = ( (parent.offsetWidth-2*mar)/num )
                e.style.width = width +"px"
                e.style.height = (1/prop) * width + "px"
                e.style.marginLeft = mar + width*i + "px"
                   })
                 }
               }
              */
function attribute(element, res) {
   try {
    eval("element." + res)
     } 
   catch { console.error("failed to attribute", element, res) }
 };
 
function importitem(command) {
  var ext = ""
  for(var i = command.length; i > 0; i++) {
    if(command[i] == ".") { break } else { ext+=command[i] }
   }
  if(ext == ".js") {
    var script = document.createElement("script")
    script.src = command
    document.body.append(script)
   }
  else if(ext == "css") {
    var style = document.createElement("link")
    style.rel="stylesheet"
    style.src = command
    document.head.append(style)
   }
 };
 
pushkeyword(["l"], ['"'], function(res) {
   if(res[0]+res[1]+res[2]+res[3]+res[4] == "ocal ") {
     keycode = "local"
     var name = ""
     for(var i = 4; i < res.length; i++) {
       if(res[i]!=" ") { name += res[i] }
      }; tempovar = name
    }
 });
pushkeyword(["i"], ['"'], function(res) {
   if(res[0]+res[1]+res[2]+res[3]+res[4]+res[5] == "mport ") {
     keycode = "import"
    }
 });
pushkeyword(['"'], ['"'], function(res) {
  if(keycode == "local") {
    setvalue(tempovar, res)
    tempovar = null; keycode = null
   }
  else if(keycode=="import") {
    importitem(res); keycode = null; tempovar = null
    }
 });
pushkeyword(["-"], ["#"], function(res) {
  var result = 1;
  for(var i = 0; i < res.length; i++) {
    if(res[i] == "-") { result++ }
   }; childhood = result;
 });
pushkeyword(["#"], ["*"], function(res) { tempotext = res; })
pushkeyword(["*"], [" ", "@"], function(res) { tempotype = res;  })
pushkeyword(["@"], ["."], function(res) {
    function separate(variables) {
      var variable = ""
      var result = ""
      for(var i = 0; i < variables.length; i++) {
        if(variables[i] == " ") { result += getvalue(variable); variable = "" }
        else { variable += variables[i] }
       }; if(variable) { result += getvalue(variable) }
      return result
     }
  tempowrite = write(tempotext, tempotype, separate(res))
  nods.push({ node: tempowrite, childhood: childhood })
  truewrite()
  tempotext = null; tempotype = null; childhood = 0 
});
pushkeyword(["{"], ["}"], function(res) { if(tempowrite) { atribute(tempowrite, res) }})
pushkeyword(["["], ["]"], function(res) { if(tempowrite) { groupitem(tempowrite, res) }})
  
function write(text, type, style) { 
  var element = (function () {
  try { 
    var res = document.createElement(type)
    if(res.tagName == "IMG" || res.tagName == "frame" || res.tagName == "irame") {
       awaitload()
       res.onload = function() { awaitload(true) }
     }
    if(text) { res.innerHTML = text }
    if(style) { res.style = style }
    return res
   } catch { 
     console.warn("Element creation failed *" + type)
     var err = document.createElement("p"); err.innerHTML = "creation error"
     return err
    }
  })(); return element
};
            
function truewrite(i) {
   (i!=undefined) ? (i=i) : (i = nods.length-1)
    if(nods[i].childhood) {
       try {
         for(var e = 1;  e <= i; e++) {
              if(nods[i-e].childhood == nods[i].childhood-1) {
                 nods[i-e].node.append(nods[i].node); break
              }
           }   
        } catch { console.error("failed to create child", nods[i]) }
     } else { try{ hand.append(nods[i].node) } catch { console.err(nods[i].node) }
   }
};
