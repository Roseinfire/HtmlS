/* load */
var loads = 0
function awaitload(endkey) {
     if( window.onresize) { window.onresize() }
     if(!loads && endkey != "") { try { hand.innerHTML = ""; } catch{} }
     if(!endkey) { loads++ }
     else if(endkey) { loads-- }
     if(!loads) {
        try {
            var color = getouter("theme", __head__)
            var image = getouter("background", __head__)
            var style = getouter("style", __head__)
            var plan = searchplans( getouter("layout", __head__), "relative 0.8")
            console.log("layout: ", plan)
            background(color, image)
            hand.style = style
           document.getElementById("content").style.display = "block";
           document.getElementById("load").style.display = "none";
           if(!nods.length) {
                hand.innerHTML = `<p style="font-size: 35px; text-align: center; color: maroon">Document Empy</p>`
             }
           if(window.onresize) { window.onresize(); window.onresize(); }
      } catch { console.warn("iterations run was not standart") }
     console.log("Compilation finished. HtmlScript global names: ", "hand", "awaitload", "loads",
                  "keyword", "keywords", "read", "write", "onResize", "__load", "__head__", "__scripts__", "__htmlscript__")
     console.groupEnd("compilation")
     }
 };

/* core */
class keyword {
    constructor(start=[], end=[], recall=function() {}, name) {
       const that = this
       this.ends = end
       this.starts = start
       this.name = name
       this.start = function(compl) {
           for(var i = 0; i < start.length; i++) { if(start[i]==compl) { return this } }
                return false
           }
       this.end = function(compl, moves) {
           for(var i = 0; i < end.length; i++) {
               var includes = false
               for(var e = 0; e < start.length; e++) {
                   if(end.includes(start[e]) ) { includes = true }
               }
            if(moves == read.pos) { 
                console.warn("Something went wrong when reading keyword with the same quotes.")
             }
            if(end[i]==compl && (moves || !includes) ) { return this }
             }; return false
        }
      this.recall = function(event, response) { 
          if(response) { console.log(event) }
              recall(event)
            }
       }
 };

function read(data,response=false, encode=function(start, end, name) { return true }) {
    if(!read.pos) { read.pos = -1; awaitload() }
    read.data = data
    read.response = response
    read.iteration = null
    read.last_iteration = null
    read.res = ""
    while(read.data[read.pos+1]) {
        if(read.await) { console.log("reading paused"); break }
        read.pos++; read.change = null; 
        if(response) { console.log(read.data[read.pos], read.iteration) }
        for(var i = 0; i < keywords.length; i++) {
            if(read.iteration && keywords[i] == read.iteration && keywords[i].end( read.data[read.pos], read.pos-read.started ) == read.iteration) {
                var draw = encode(read.started, read.pos-read.started, read.iteration.name);
                 if(draw) {
                    read.iteration.recall(read.res, response);
                  }
                 read.res = ""; read.started = null;
                 read.last_iteration = read.iteration; read.iteration = null;
             }
             if(!read.iteration && keywords[i].start( read.data[read.pos] ) && keywords[i].start( read.data[read.pos] ) != read.last_iteration) { 
                  read.iteration = keywords[i]; read.change = true;read.started = read.pos; break;
              }
       }
      if(read.iteration && !read.change) { read.res += read.data[read.pos] }
      if(read.change) { read.change = null }
   }
   if(!read.await) {
        if(read.iteration) { read.iteration.recall(read.res, response) }
        awaitload(true)
      }
 };
read.awaitReading = function() {
    console.log("awaiting..")
    awaitload()
    read.await = true
  }
read.continueReading = function() {
   console.log("reading continued")
   awaitload(true)
   read.await = false; read.pos += 1
   read(read.data, read.response)
 };

/* syntax */
 var keywords = []
 keywords.tempovar = null
 keywords.tempotext = null
 keywords.tempotype = null 
 keywords.tempowrite = null
 keywords.word = null
 keywords.childhood = 0
 var nods = new Array()
 var styles = new Array()

keywords.cssmodify = function(style) {
    var adition = true;
    for(var i = style.length-1; i > 0; i--) {
        if(style[i] == ";") { adition = false;}
        if(style[i] != " ") { break }
     }
    if(adition) { return style+";" } else { return style }
 };

keywords.getvalue = function(name, err) {
    for(var i = 0; i < styles.length; i++) {
       if(styles[i].name == name) { return keywords.cssmodify(styles[i].data) }
    }; if(err) { console.error("Can't find link @" + res) }
};

keywords.setvalue = function(name, data) {
    if( !keywords.getvalue(name) ) {
        styles.push({ name: name, data: data })
     } else { console.error("variable didn't created: double name error") }
 };

keywords.groupitem = function(nodemap, command) {
   var num = 1
   var prop = 1
   var margin = 0
   var cnt = 1
   var res = ""
   for(var i = 0; i < command.length; i++) {
      res += command[i]
      if(command[i] == " " && cnt == 1) { cnt++;
          try{ margin=eval(res); res = "" } catch {}
      }
      else if(command[i] == " " && cnt == 2) { cnt++;
          try{ prop=eval(res); res = "" } catch {}
      }
      else if(command[i] == " " && cnt == 3) { cnt++;
          try{ num=eval(res); res = "" } catch {}
      }
   if(cnt == 1) { try{ margin=eval(res) } catch {} }
   else if(cnt == 2) { try{ prop=eval(res) } catch {} }
   else if(cnt == 3) { try{ num=eval(res) } catch {} }
  }
   var element = nodemap.node
   var parent = element.parentElement
   var header = document.createElement("div");
   var brothers = new Array()
   if(!element.id || num == 1) {
       for(var i = 0; i < num; i++) {
           var broth = element.clone()
           broth.num = i
           broth.style.marginLeft = margin + "px"
           broth.style.position = "absolute"
           brothers.push(broth)
       }
  } 
  else { console.error("failed to clone element with id") }
   onResize(brothers, function(e, i) {
       var ewidth = ( parent.offsetWidth-margin*(brothers.length+1) )/brothers.length
        e.style.width = ewidth + "px"
        var ehight = ewidth/prop
        e.style.height = ehight + "px"
        e.style.marginLeft = (e.num + 1) * margin + ewidth*e.num + "px"
    })
   onResize([header], function(e) {
      if(e.children.length) {
        e.style.height = e.children[0].offsetHeight + "px"
        e.style.width = parent.offsetWidth + "px"
        }
    }) 
   parent.removeChild(element);
   for(var i = 0; i < brothers.length; i++) {
      header.append(brothers[i])
     }
   nods[nodemap.index] = header;
   parent.appendChild(header)
  };

keywords.attribute = function(element, res, oneprop) {
    if(!element.property) { element.property = [] }
    if(!oneprop) { 
        var atr = ""
        for(var i = 0; i < res.length; i++) {
            if(res[i] == ",") { make(atr); atr="" }
            else { atr += res[i] }
         }; if(atr) { make(atr) }
     } else { make(res) }
           function make(a) {
               element.property.push(a)
               try { eval("element." + a) } 
               catch { console.error("failed to attribute", element, res) }
           } 
 };
 
keywords.importitem = function(command) {
    var ext = ""
    for(var i = command.length-1; i > 0; i--) {
        if(command[i] == ".") { break } else { ext+=command[i] }
     }
   if(ext == "sj") {
        read.awaitReading()
        var script = document.createElement("script")
        script.src = command
        script.onload = function() { console.log("imported script", this); read.continueReading() }
        script.onerror = function() { console.error("failed to import", command); read.continueReading() }
        document.body.append(script)
   }
    else if(ext == "ssc") {
       var style = document.createElement("link")
       style.rel="stylesheet"
       style.src = command
       document.head.append(style)
     }
 };
  
keywords.draw = function(res) {
    function separate(variables) {
        var variable = ""
        var result = ""
        for(var i = 0; i < variables.length; i++) {
            if(variables[i] == " ") { result += keywords.getvalue(variable); variable = "" }
            else { variable += variables[i] }
         }; if(variable) { result += keywords.getvalue(variable) }
      return result
     }
   keywords.tempowrite = write(keywords.tempotext, keywords.tempotype, separate(res), keywords.childhood)
   write.truewrite()
   keywords.tempotext = null; keywords.tempotype = null; keywords.childhood = 0;
 };
  
keywords.local = function(res) {
    if(res[0]+res[1]+res[2]+res[3]+res[4] == "ocal ") {
        keywords.word = "local"
        var name = ""
        for(var i = 4; i < res.length; i++) {
            if(res[i]!=" ") { name += res[i] }
        }; keywords.tempovar = name
     }
  };
  
keywords.import = function(res) {
    if(res[0]+res[1]+res[2]+res[3]+res[4]+res[5] == "mport ") {
       keywords.word = "import"
     }
 };
  
keywords.value = function(res) {
  if(keywords.word == "local") {
      keywords.setvalue(keywords.tempovar, res)
      keywords.tempovar = null; keywords.word = null
   }
  else if(keywords.word=="import") {
      keywords.importitem(res); keywords.word = null; //keywords.tempovar = null
     }
  };
  
keywords.child = function(res) {
   var result = 1;
   for(var i = 0; i < res.length; i++) {
       if(res[i] == "-") { result++ }
     }; keywords.childhood = result;
  };
  
keywords.push(new keyword(["~"], ["~"], function(res) { console.log(res) }, "comment"))
keywords.push(new keyword(["l"], ['"'], function(res) { keywords.local(res) }, "local"))
keywords.push(new keyword(["i"], ['"'], function(res) { keywords.import(res) }, "import"))
keywords.push(new keyword(['"'], ['"'], function(res) { keywords.value(res) }, "value"))
keywords.push(new keyword(["-"], ["#"], function(res) { keywords.child(res) }, "child"))
keywords.push(new keyword(["#"], ["*"], function(res) { keywords.tempotext = res; }, "element"))
keywords.push(new keyword(["*"], [" ", "@"], function(res) { keywords.tempotype = res }, "type"))
keywords.push(new keyword(["@"], ["."], function(res) { keywords.draw(res) }, "draw"))
keywords.push(new keyword(["{"], ["}"], function(res) { keywords.attribute(keywords.tempowrite.node, res) }, "attribute"))
keywords.push(new keyword(["["], ["]"], function(res) { keywords.groupitem(keywords.tempowrite, res) }, "group"))

/* writing */
function write(text, type, style, childhood) { 
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
    })()
  var nodemap = { node: element, childhood: childhood, index: nods.length }
  nods.push(nodemap)
  return nodemap
};

write.truewrite = function(i, encode) {
    (i!=undefined) ? (i=i) : (i = nods.length-1)
     if(nods[i].childhood) {
        try {
           for(var e = 1; e <= i; e++) {
                if(nods[i-e].childhood == nods[i].childhood-1) {
                 nods[i-e].node.append(nods[i].node); break
                }
             }
          } catch { console.error("failed to create child", nods[i]) }
       } else if(!encode) { try{ hand.append(nods[i].node) } catch { console.err(nods[i].node) }
    }  else if(encode && typeof encode == 'function') { encode(nods[i].node) }
 };
