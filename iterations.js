     var loads = 0
        function awaitload(endkey) {
          if( window.onresize) { window.onresize() }
          var papers = document.getElementsByClassName("paper")
          if(!loads && papers.length) { papers[0].innerHTML = "" }
          if(!endkey) { loads++ }
          else { loads-- }
          if(!loads) {
              try {
                var color = getouter("theme")
                var image = getouter("background")
                var style = getouter("style")
                var width = getouter("screen")
                background(color,  image, width)
                document.getElementsByClassName("paper")[0].style = style
                document.getElementsByClassName("paper")[1].style = style
                document.getElementById("content").style.display = "block";
                document.getElementById("load").style.display = "none";
                if( window.onresize) { window.onresize() }  
            } catch { console.log("iterations run was not standart") }
        }
   }
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
       }
         var keywords = []
         function pushkeyword(start_symbol, end_symbol, result) {
           keywords.push( new keyword(start_symbol, end_symbol, result) )
            }
         function read(data, response) {
           awaitload()
           var iteration = null
           var res = ""
           var pos = -1; while(data[pos+1]) {
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
    
                   }; if(iteration) { iteration.recall(res, response) }
                    awaitload(true)
                } 
            var tempovar = null
            var tempotext = null
            var tempotype = null
            var tempowrite = null
            var childhood = 0
            var nods = new Array()
            var styles = new Array()
            function getvalue(name, err) {
              for(var i = 0; i < styles.length; i++) {
                if(styles[i].name == name) { return styles[i].data }
                };
              if(err) { console.error("Can't find link @" + res) }
             }
            function setvalue(name, data) {
              if( !getvalue(name) ) {
                styles.push({ name: name, data: data })
               } else { console.error("variable didn't created: double name error") }
             }
            pushkeyword(["&"], [":"], function(res) { tempovar = res; })
            pushkeyword(["("], [")"], function(res) { 
                   setvalue(tempovar, res)
                   tempovar = null
               }) 
            pushkeyword(["-"], ["#"], function(res) {
             var result = 1;
             for(var i = 0; i < res.length; i++) {
              if(res[i] == "-") { result++ }
              }
             childhood = result;
            })
            pushkeyword(["#"], ["*"], function(res) { tempotext = res; })
            pushkeyword(["*"], [" ", "@"], function(res) { tempotype = res;  })
            pushkeyword(["@"], [" ", "{", "["], function(res) {
                  tempowrite = write(tempotext, tempotype, getvalue(res))
                  nods.push({ node: tempowrite, childhood: childhood })
                  truewrite()
                  tempotext = null; tempotype = null; childhood = 0 
               })
            pushkeyword(["{"], ["}"], function(res) {
                 if(tempowrite) {
                  tempowrite.attribute(res)
                      }
               })
            pushkeyword(["["], ["]"], function(res) {
             if(tempowrite) { onResize(tempowrite, function(e) {
                try {
                    var padding = eval(res)
                    e.style.marginLeft = padding/2 + "px"
                    e.style.width = (hand.offsetWidth-padding) + "px"
                      } catch { console.error("Invalid number: ", res) }
                           }); 
                       }
               })
  
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
               })()
              return element
          }
         HTMLElement.prototype.attribute = function(data) {
              try {
                   eval("this." + data)
                 } catch { console.error("Can't declare attribute: ", data) }
          }
       function truewrite() {
              var i = nods.length-1
                 if(nods[i].childhood) {
                       try {
                         for(var e = 0;  e <= i; e++) { 
                        
                          if(nods[i-e].childhood == nods[i].childhood-1) {
                            nods[i-e].node.append(nods[i].node)
                              }
                           }  
                          
                       } catch { console.error("failed to create child", nods[i]) }
                  } else { try{ hand.append(nods[i].node) } catch { console.err(nods[i].node) }
              }
          }