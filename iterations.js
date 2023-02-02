
/* iterations.js file created for documentation.
    It's expected to use iterations without Htmls main constructions.
    File contains language main construction and functions.
    Divided into four parts:  LOAD, CORE, SYNTAX, WRITING.
    Each part described in general and every function described in detail.
    Licensed under MIT, Roseinfire, 2023 */
    
    
 /* LOAD */
  /* This part contains a single function and provides a preview.
      The main idea is to call function every time when we want to load heavy source
      and call with enkey, when the source is loaded. 
       Function itself counts calls when called and discounts when called with endkey. 
      When the number of progress is zero, then stroke the content.
      It's expected that count new sources faster than loading them, 
      However, the function waits 10 ms before showing the result. */
    
  function awaitload(endkey) {
      if(!endkey) { awaitload.loads++ }
      else if(endkey) { awaitload.loads-- }
      if(!awaitload.loads) {
          try {
              setTimeout(function() {
                  searchplans.estable() // call the layout
                  background.image() // create background image
                  hand.style = getouter("style", __head__) // style the hand element
                  document.body.removeChild(__loading__) // finish loading
                  document.getElementById("content").style.display = "block" // show content
                  /* Function called once at the beginning and again when reading finished. 
                      Whether no elements appended, stroke that document is empty */
                  if(!nodes.length) {
                      hand.innerHTML = `<p id="docempty">Document is empty</p>`
                      }; __resize()
                  }, 10)
              } catch { console.warn("iterations run was not standart") }
          console.log("Compilation finished. Run `write.about()` to find out taken global names.") 
          console.groupEnd("compilation")
          }
      }; awaitload.loads = 0
  
  /* CORE */
    /* The most important and hard to understand part.
        Core algorithm reads the text value and compilates it into syntax functions.
        Divided in two parts: keyword {} and read(){}
        Language based on start/end symbols not complete keywords.
        It gives flexibility, but defines low syntax diversity.
        keyword - class of objects, each contains data about what symbols 
        start iteration, and iteration and what happens with text between those symbols.
        read - function which divides text into keywords and gives every keyword data between its keys. */
        
  class keyword {
      constructor(start=[], end=[], recall=function() {}, name) {
          const that = this // declare a link to object itself
          this.ends = end // arguments exists as properties, but further used the arguments because it's shorter
          this.starts = start
          this.name = name
          this.start = function(compl) { // compl - symbol which viewed by `read` function
              if(start.includes(compl)) { return this } // return keyword
              return false
              }
          this.end = function(compl, moves) { // moves - difference between positions when iteration started and ended
                  if(end.includes(compl) && moves ) { return this } // if iteration not empty return keyword
                  return false
              }
          this.recall = function(event, response) { // event - value between keys
              if(response) { console.log(event) } // important for debag
              recall(event) // run syntax
              }
          }
      };
  
  function read(data, response=false, encode=function(start, end, name) { return true }) {
      /* data - text which divides to iterations
          response - show iterations in console or not
          encode - perspective function for code editor */
      if(!read.pos) { read.pos = -1; awaitload() } // pos = -1, because will be called before it's value needed
      read.data = data // remember the data for case of stop reading
      read.response = response
      read.iteration = null // current iteration NULL
      read.last_iteration = null
      read.res = "" // let's build value to give for iteration
      while(read.data[read.pos+1]) { // go through the data until possible
          if(read.await) { console.log("reading paused"); break } // when needed break reading
          read.pos++; // remember changed position
          read.change = null; // need to catch the iteration changes
          read.last_iteration = null; // this string very important to avoid reading the same symbol multiple times
          if(response) { console.log(read.data[read.pos], read.iteration) } // if needed show symbol and iteration
          if(read.iteration && read.iteration.end( read.data[read.pos], read.pos-read.started ) ) {
              /* This happens when the iteration has started and met the termination symbol.
                   New iteration starts by the next step in order to access chain iteration */
              var draw = encode(read.started, read.pos-read.started, read.iteration.name); // if needed encode
              if(draw) { // sometimes it's needed only encode, but do not execute language
                  read.iteration.recall(read.res, response);
                  }
              read.res = ""; read.started = null; // update progression
              read.last_iteration = read.iteration; read.iteration = null // remember iteration and declare that no current iteration
              }
          for(var i = 0; i < keywords.length; i++) { // search over keywords
              let key = keywords[i].start( read.data[read.pos] ) // if returned iteration which not previos - begin new
              // this is important because of it's bad whether iteration which has same symbols for close and open just starts again 
              if(!read.iteration && key  && key != read.last_iteration) {
                  read.iteration = keywords[i];  // declare iteration
                  read.change = true; // remember that NEW iteration started
                  read.started = read.pos; // remember position it's started
                  break; // stop searching for iterations
                  }
              }
          if(read.iteration && !read.change) { read.res += read.data[read.pos] } // whether we have current iteration building a value for it
          if(read.change) { read.change = null } // clear parameter for the next move of while loop
          }
      // This happens when reading is completed
      if(!read.await) {
          if(read.iteration) { read.iteration.recall(read.res, response) } // recall the last iteration
          awaitload(true) // call endkey
          };
      };
    
  /* It's also possible to stop reading and continue later */
  read.awaitReading = function() { 
      awaitload() // declare that reading not completed
      read.await = true // stop reading
      };
  
  read.continueReading = function() {
      console.log("reading continued")
      awaitload(true) // call endkey after awaiting was declared when reading stopped
      read.await = false // unlock reading
      read.pos += 1 // go to the next symbol
      read(read.data, read.response) // continue reading
      };
  
  /* syntax */
  /* This part contains functions which take as argument value of iteration
      and do anything you can imagine. There are tree common constructions:
      1) # *tag
      2) name arg "value"
      3) @style .class
      3*) - #
      The first construction is required and gives an html node for the third construction.
      The second construction is not required, but works separately from the first.
      Child node construction is special, because not required, but incorporated into `writing part`
      However, it works almost as construction three. */
    
  var keywords = []
  keywords.tempotext = null // innerHTML
  keywords.tempowrite = null // html Node
  keywords.word = null // recognized complete keyword
  keywords.childhood = 1 // default childhood one, because all elements append to `hand` element
  var nodes = new Array() // list of the all Nodes
  var styles = new Array() // list of the all recognized styles
  
  keywords.cssmodify = function(style) {
      var addition = true;
      for(var i = style.length-1; i > 0; i--) {
          if(style[i] == ";") { addition = false }
          if(style[i] != " ") { break }
          }
      if(adition) { return eval('`' + style + ';`') } else { return eval('`' + style + '`') }
      };
  
  keywords.getvalue = function(name, err) {
      for(var i = 0; i < styles.length; i++) {
          if(styles[i].name == name) { return keywords.cssmodify(styles[i].data) }
          }; if(err) { console.error(`can't find style -->`, res) }
      };
  
  keywords.setvalue = function(name, data) {
      if( !keywords.getvalue(name) ) {
          styles.push({ name: name, data: data })
          } else { console.error(`repeating name error -->`, name) }
      };
  
  keywords.groupitem = function(nodemap, command) {
      var num = 1
      var prop = 1
      var margin = 0
      var classname = null
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
      for(var i = 0; i < num; i++) {
          var broth = element.clone(num != 1 && element.id)
          broth.num = i
          broth.style.marginLeft = margin + "px"
          broth.style.position = "absolute"
          if(classname) { broth.className = classname }
          brothers.push(broth)
          }
      onResize(brothers, function(e, i) {
          var parentWidth = parent.offsetWidth- ( onlyNumbers(parent.style.paddingLeft) + onlyNumbers(parent.style.paddingRight) )
          var ewidth = ( parentWidth-margin*(brothers.length+1) )/brothers.length
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
          });
      parent.removeChild(element);
      for(var i = 0; i < brothers.length; i++) {
          header.append(brothers[i])
          }
      nodes[nodemap.index].node = header;
      keywords.tempowrite.node = header
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
          catch { console.error(`failed to attribute -->`, element, res) }
          } 
      };
  
  keywords.importitem = function(command) {
      console.warn("importing --> ", command)
      var ext = ""
      for(var i = command.length-1; i > 0; i--) {
          if(command[i] == ".") { break } else { ext+=command[i] }
          }
      if(ext == "sj") {
          read.awaitReading()
          var script = document.createElement("script")
          script.src = command
          script.onload = function() { console.log(`imported script -->`, this); read.continueReading() }
          script.onerror = function() { console.error(`failed to import -->`, command); read.continueReading() }
          document.body.append(script)
          }
      else if(ext == "ssc") {
          var link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = command
          document.head.append(link)
          } 
      else { console.warn("unknown file extension -->", ext) }
      };
  
  keywords.draw = function(res) {
      keywords.tempowrite = write(keywords.tempotext,  res, keywords.childhood)
      keywords.tempotext = null; keywords.childhood = 1;
      write.truewrite();
      };
  
  keywords.readword = function(res, code) {
      var factcode = ""
      for(var i = 0; i < code.length; i++) {
          factcode += res[i]
          }
      if(factcode == code) {
          var arg = ""
          for(var i = code.length; i < res.length; i++) {
              if(res[i]!=" ") { arg += res[i] }
              };  keywords.word =  { code: code, argument: arg }
          }; return keywords.word
      };
  
  keywords.value = function(res) {
      if(keywords.word.code == "ocal ") {
          keywords.setvalue(keywords.word.argument, res); keywords.word = null;
          }
      else if(keywords.word.code =="mport ") {
          keywords.importitem(res, keywords.word.argument); keywords.word = null;
          };
      };
  
  keywords.child = function(res) {
      var result = 2;
      for(var i = 0; i < res.length; i++) {
          if(res[i] == "-") { result++ }
          }; keywords.childhood = result;
      };
  
  keywords.style = function(node, res) {
      if(node) {
          node.style = (function separate(variables) {
              var variable = ""
              var result = ""
              for(var i = 0; i < variables.length; i++) {
                  if(variables[i] == " ") { result += keywords.getvalue(variable); variable = "" }
                  else { variable += variables[i] }
                  }; if(variable) { result += keywords.getvalue(variable) }
              return result
              })(res)
          }
      };
  
  keywords.readcode = function(res) {
      if(keywords.word.argument == "css") { 
          var style = document.createElement("style")
          style.type = "text/css"; style.innerHTML = res
          document.head.append(style)
          }
      else if(keywords.word.argument == "js") {
          var script = document.createElement("script")
          script.type = "text/javascript"; script.innerHTML = res
          document.head.append(script)
          } else { console.warn(`unexpected parse --> `, keywords.word.argument) }
      keywords.word = null;
      };
  
  keywords.className = function(node, res) {
      if(res) {
          node.className = res
          console.log(res)
          }
      };
  
  keywords.br = function(text) {
      var res = ""
      for(var i = 0; i < text.length; i++) {
          if(text[i] == "\n") { res+="<br>" }
          else { res += text[i] }
          }; return res
      };
  
  keywords.push(new keyword(["~"], ["~"], function(res) { console.log(res) }, "comment"))
  keywords.push(new keyword(["l"], ['"'], function(res) { keywords.readword(res, "ocal ") }, "local"))
  keywords.push(new keyword(["i"], ['"'], function(res) { keywords.readword(res, "mport ") }, "import"))
  keywords.push(new keyword(["p"], ["`"], function(res) { keywords.readword(res, "arse ") }, "parse"))
  keywords.push(new keyword(["`"], ["`"], function(res) { keywords.readcode(res) }, "code"))
  keywords.push(new keyword(['"'], ['"'], function(res) { keywords.value(res) }, "value"))
  keywords.push(new keyword(["-"], ["#"], function(res) { keywords.child(res) }, "child"))
  keywords.push(new keyword(["#"], ["*"], function(res) { keywords.tempotext = keywords.br(res); }, "inner"))
  keywords.push(new keyword(["*"], [" ", "@", "\n"], function(res) { keywords.draw(res) }, "draw"))
  keywords.push(new keyword(["@"], [".", "\n"], function(res) { keywords.style(keywords.tempowrite.node, res) }, "style"))
  keywords.push(new keyword(["."], [" ", "\n", "{"], function(res) { keywords.className(keywords.tempowrite.node, res) }, "className"))
  keywords.push(new keyword(["{"], ["}"], function(res) { keywords.attribute(keywords.tempowrite.node, res) }, "attribute"))
  keywords.push(new keyword(["["], ["]"], function(res) { keywords.groupitem(keywords.tempowrite, res) }, "group"))
  
  /* writing */
  class DataNode {
      constructor(node, childhood, index) {
          const that = this
          this.node = node
          this.childhood = childhood
          this.index = index
          this.append = function(item) {
              that.node.append(item)
              }
          }
      };
  
  function write(text, type, childhood) {
      var element = (function () {
          try {
              var res = document.createElement(type).await()
              if(text) { res.innerHTML = text }
              return res
              } 
          catch {
              console.warn("Element creation failed --> ", type)
              var err = document.createElement("p"); err.innerHTML = "creation error"
              return err
              }
          })()
      var nodemap = new DataNode(element, childhood, nodes.length)
      nodes.push(nodemap)
      return nodemap
      };
  
  write.append = function(n1, n2) {
      if(nodes[n2].childhood) {
          nodes[n1].append(nodes[n2].node)
          }
      };
  
  write.truewrite = function(i, encode) {
      (i!=undefined) ? (i=i) : (i = nodes.length-1)
      try {
          for(var e = 1; e <= i; e++) {
              if(nodes[i-e].childhood == nodes[i].childhood-1) {
                  write.append(i-e, i); break
                  }
              }
          } catch { console.error(`failed to create child -->`, nodes[i]) }
      }; nodes.push(new DataNode(hand, 0, 0))
  
  write.about = function() {
      console.group("taken global names")
      console.log("hand", hand) 
      console.log("awaitload", awaitload)
      console.log("Keyword", Keyword)
      console.log("keywords", keywords)
      console.log("read", read)
      console.log("write", write)
      console.log("nodes", nodes)
      console.log("DataNode", DataNode)
      console.log("Layout", Layout)
      console.log("getouter", getouter)
      console.log("__load", __load)
      console.log("__resize", __resize)
      console.log("__host__", __host__)
      console.log("__head__", __head__)
      console.log("__body__", __body__)
      console.log("__scripts__", __scripts__)
      console.log("__loading__", __loading__)
      console.groupEnd("taken global names")
      };
    
