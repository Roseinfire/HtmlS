
   /* 
      This working script. It loads form of the future document
      and creates basic functions and constants. 
      Do not use it without "iterations.js" and network connection.
      Licensed under MIT, Roseinfire, 2023
      */
   
   /* FETCHES */
   /* This part is preparing special functions, which help to optimize loading of the project main functionality */
   
   let fetches = new Array() // Let's create an array of needed  fetches
   class ExtendFetch {
       constructor(src, chain=function() {}, onerror=function() {}) {
           const that = this // remember object
           this.source = src // remember given src
           this.chain = chain // function which will be called when fetch is loaded
           this.load = function(chainHandler=function(ch, t) { return ch(t) }) {
               fetch(that.source) // fetch source
               .then(response => response.text()) // convert response
               .then(text => chainHandler(chain, text)) // handle load
               .catch(error => onerror(error)) // handle error
               }
           }
       };

   function syncFetch(extendFetchList=[]) { // load fetches parallel
       var list = extendFetchList // cut the name
       var chains = new Array() // array of sorted chains
       var status = list.length // how many fetches loaded
       function loadstatus(i) {
           status-- // handle status
           if(!status) { return true } // return that no more fetches are loading
           }
       for(var i = 0; i < list.length; i++) {   // init load parallel
           (function (index) { // create memory instead of cycle variable to let fetch to know its index
               list[i].load(function(ch, t) { // load with handler
                   chains.push({ item: ch, index: index, text: t }) // remember result
                   if( loadstatus(index) ) {  exeChains() } // update status and init execution whether no more fetches
                   })
               })(i)
           }
       function exeChains() { // let's execute all the loaded fetches
           var order = chains.sort(function(a, b) { if(a.index > b.index) { return 1 } else { return -1 } })
           /* sort array in order to execute functions in sequence that they had in extendFetchList */
           for(var i = 0; i < order.length; i++) {  // go through the functions and call
               var pointer = (order[i+1]) ? (order[i+1].item) : ( null ) // give pointer to the next function
               order[i].item(order[i].text, pointer) // call with value and pointer
               }
           }
       };

   /* CODESPACE */
   /* List of notable functions, which help here and there */
   
   let hand = document.createElement("div")
   let content = document.createElement("div")
   
   var resizebase = new Array() // resize events for future elements
   function onResize(e, f) {
       resizebase.push({ func: f, elem: e }); return resizebase
       };

   function __resize(times=1, dispatchEvt) { // here is what's happening when window resized
       while(times > 0) {
           times--
           for(var i = 0; i < resizebase.length; i++) {
               for(var e = 0; e < resizebase[i].elem.length; e++) {
                   resizebase[i].func(resizebase[i].elem[e]) // call item with its object
                   }
               }; if(dispatchEvt) { dispatchEvent(new Event('resize')) }
           }
       };

   window.addEventListener("resize", function() { __resize() }) // add resize listener
   
   onResize([hand], function(e) {
       __layout__.js.content(e, __layout__.argument) // give a layout his argument
       });
   
   function onlyNumbers(text="") {  // get number from text
       var res = ""
       if(typeof text == "string") {
           for(var i = 0; i < text.length; i++) {
               for(var e = 0; e <= 9; e++) {
                   if(text[i] == "." || text[i] == e.toString()) { res += text[i]; break }
                   } 
               } 
           if(res) { return eval(res) } else { return 0 }  // always return a number
           } 
       else if(typeof text == "number") { return text }
       };

   function widthOf(element) {
       var stl = getComputedStyle(element)
       var padleft = onlyNumbers(stl.getPropertyValue("padding-left"))
       var padright = onlyNumbers(stl.getPropertyValue("padding-right"))
       return (element.offsetWidth-padleft-padright)
       };

   function styleOf(element, name, number) {
       var stl = getComputedStyle(element)
       var val = stl.getPropertyValue(name)
       if(!number) { return val }
       else { return onlyNumbers(val) }
       };

   HTMLElement.prototype.setAttr = function(name, value, clear) {
       var attr = this.getAttribute(name)
       
           let attribute = document.createAttribute(name)
           attribute.value = attr && !clear ? attr + value : value
           this.removeAttribute(name)
           this.setAttributeNode(attribute)

       };

   HTMLElement.prototype.insertStyle = function(name, value) {
       if(this.parentElement) {
           var style = getComputedStyle(this) // get real stylesheet
           var test = document.createElement(this.tagName) // create an empty example to understand the default stylesheet
           this.parentElement.append(test) // append to let read the real stylesheet of `test`
           var defstyle = getComputedStyle(test) // read the default style
           var defcolor = defstyle.getPropertyValue(name) // get deafult
           var color =  style.getPropertyValue(name) // get real color
           var result = (color!=defcolor) ? color : value // replace defaults
           this.setAttr("style", `${name}: ${result};`, true)
           this.parentElement.removeChild(test)
           return result
           } else { return null }
       };

   HTMLElement.prototype.takeCenter = function(horizontal = true, vertical = true) {
       if(horizontal) { this.style.marginLeft = (innerWidth - this.offsetWidth)/2 + "px" }
       if(vertical) { this.style.marginTop = (innerHeight - this.offsetHeight)/2 + "px" }
       };

   function getouter(name, from=document.body, onfail="") { // get attribute value from element
       var list = from.attributes
       for(var i = 0; i < list.length; i++) { 
           if(list[i].name == name) { return list[i].value }
           }
       if(onfail) { return onfail } // return given variant
       return null // if nothing found return null
       };

   function loadtheme() {
       let styletag = document.createElement("style"); styletag.type="text/css"
       styletag.innerHTML = `.Loading { position: fixed; width: 100%; text-align: center; top: 0; left: 0; }`
       document.head.append(styletag)
       let doc = document.body.children
       for(var i = 0; i < doc.length; i++) {
           if(doc[i].tagName != "SCRIPT") { 
               document.body.removeChild(doc[i]) 
               }
           }
       window.__loading__ = document.createElement("div")
       if(document.body) { document.body.append(__loading__) } // not standart run 
       __loading__ .innerHTML = getouter("theme", document.head, "Loading..")
       __loading__.setAttr("class", "loading Loading")
       __loading__.insertStyle("color", "rgba(217, 210, 210, 0.6)")
       __loading__.insertStyle("font-size", "35px")
       __loading__.takeCenter(false)
       console.group("compilation")
       };

   class Layout { // a class of future layout
       constructor(reaction=function() {}, name) {
           this.content = reaction
           this.name = name
           }
       };

   function searchlayouts(onfail) { // read layout attribute or return given value
       var layout = getouter("layout", document.head, onfail) // get value
       return (function layout(val) {
           var action = false // just a place were argument begin
           var pre = true // skip spaces before layout name and value
           var res = "" // build layout value
           for(var i = 0; i < val.length; i++) {
               if(val[i] != " " && pre) { pre = false }
               if(val[i] != " " && !pre) { res += val[i] }
               if(val[i] == " " && !pre) { action = i; break }
               }
           var argument = "" // build argument
           if(action) { // only if layout name ended
               var pre = true // all the same as layout name
               for(var i = action+1; i < val.length; i++) {
                   if(val[i] != " " && pre) { pre = false }
                   if(val[i] != " " && !pre) { argument += val[i] }
                   else if(val[i] == " " && !pre) { return argument }
                   }
               }; return { name: res, argument: argument } // all properties are strings
           })(layout) // read value
       };

   function estable(__iterations__) {
       let script = document.createElement("script")
       script.type = "text/javascript"
       script.innerHTML = __iterations__
       document.head.append(script)
       createDocument(__metadata__)
       };

   function setlayout(response) { // create layout 
       __layout__.js = new Layout(null, "default") // estable default value
       try { __layout__.js = eval(response) } catch { console.warn(`unexpected layout -->`, response) } // try to estable loaded layout
       };

   /* LOADING */
   /* List of commands which initialize loading Htmls */
   
   window.addEventListener("DOMContentLoaded", function() { // all the html data is available
       document.body.style.margin = 0; // excude some bad default styles
       window.__data__ = "" // create list of needed global variables
       window.__metadata__ = new Array()
       window.__head__ = document.head
       window.__body__ = document.body
       window.__host__ = getouter("host", document.body.parentElement, "https://roseinfire.github.io/HtmlS")
       window.__layout__ = searchlayouts("relative 0.6")
       window.__scripts__  = (function() { // get all  specified htmls scripts
           var res = []
           var scripts = document.getElementsByTagName("script")
           for(var i = 0; i < scripts.length; i++) {
               var type  = getouter("type", scripts[i])
               if( type == "htmls" || type == "text/htmls") { res.push(scripts[i]) }
               }; return res
           })()
       loadtheme() // when scripts are defined, provide a preview
       document.title = (document.title) ? (document.title) : ("Untitled") // give name
       fetches.push(new ExtendFetch(__host__ + "/iterations.js", estable, function(err) {
           __loading__.innerHTML = "Host Error :/" // Compiler available, but something went wrong
           }))  
       fetches.push(new ExtendFetch(__host__ +  "/layouts/" + __layout__.name + ".js", setlayout,  function() {})) // set a layout
       for(var i = 0; i < __scripts__.length; i++) { // merge htmls codes. Important to save the sequence between local and external
           var source = getouter("fetch", __scripts__[i], null) // get to know whether file is external
           if(source) { // whether true, remember that there is at least one external script
               __metadata__.remote = true // it's needed because remote scripts are loading much slower
               fetches.push(new ExtendFetch(source, function(res, pointer) { // push to the chain
                   __metadata__.push(res); if(!pointer) { createDocument(__metadata__) } 
                   /* whether no more scripts in the chain, init document creation */
                   }, function() {}))
               } else { __metadata__.push(__scripts__[i].innerHTML) } // whether no "fetch" attribute, just get the script value
           }
       if(!__metadata__.remote) { createDocument(__metadata__) } // whether no external scripts therefore all the values collected
       console.time("building"); syncFetch(fetches) // begin timer and init loading
       });
   
   function createDocument(hsList) { // takes list of the htmls codes
       if(createDocument.establed) { // function called two times just for safety
           hand.className = "paper"
           content.style.display = "none"
           content.append(hand); document.body.append(content)
           for(var i = 0; i < hsList.length; i++) { __data__ += hsList[i] } // create complete htmls code
           read(__data__) // if all loaded successfully then start compilation
           } else { createDocument.establed = true }
       };    
   
    