
  /* This working script. It loads form of the future document
  and creates basic functions and constants. 
  Do not use it without document.json and network connection.
  Licensed under MIT, Roseinfire, 2023. */
  
  /* FETCHES */
  let fetches = new Array()
  class ExtendFetch {
      constructor(src, chain=function() {}, onerror=function() {}) {
          const that = this
          this.source = src
          this.chain = chain
          this.load = function(chainHandler=function(ch, t) { return ch(t) }) {
              fetch(that.source)
              .then(response => response.text())
              .then(text => chainHandler(chain, text))
              .catch(error => onerror(error))
              }
          }
      };
  
  function syncFetch(extendFetchList=[]) {
      var list = extendFetchList
      var chains = new Array()
      var status = list.length
      function loadstatus(i) {
          status--
          if(!status) { return true }
          }
      for(var i = 0; i < list.length; i++) {  
          (function (index) {
              list[i].load(function(ch, t) {
                  chains.push({ item: ch, index: index, text: t });
                  if( loadstatus(index) ) {  exeChains() }
                  })
              })(i)
          }
      function exeChains() {
          var order = chains.sort(function(a, b) { if(a.index > b.index) { return 1 } else { return -1 } })
          for(var i = 0; i < order.length; i++) { 
              var pointer = (order[i+1]) ? (order[i+1].item) : ( null )
              order[i].item(order[i].text, pointer)
              }
          }
      };
  
  /* CODESPACE */
  function onlyNumbers(text="") { 
      var res = ""
      for(var i = 0; i < text.length; i++) {
          for(var e = 0; e <= 9; e++) {
              if(text[i] == e.toString()) { res += text[i]; break }
              } 
          } 
      if(res) { return eval(res) } else { return 0 } 
      };
  
  function getouter(name, from=document.body, onfail="") {
      var list = from.attributes
      for(var i = 0; i < list.length; i++) { 
          if(list[i].name == name) { return list[i].value }
          }
      if(onfail) { return onfail }
      return null
      };
  
  function loadtheme() {
      window.__loading__ = document.createElement("div")
      if(document.body) { document.body.style.margin = 0; document.body.append(__loading__) }
      __loading__ .innerHTML = "Loading.."
      __loading__.style = "position: fixed; width: 100%; font-size: 35px; text-align: center; top: 0; left: 0"
      __loading__.style.color = getouter("theme", document.body, "rgba(217, 210, 210, 0.6)")
      __loading__.top = function() { this.style.marginTop = (innerHeight-this.offsetHeight)/2 + "px"}
      __loading__.top()
      };
  
  class Layout {
      constructor(reaction=function() {}, name) {
          this.content = reaction
          this.name = name
          }
      };
  
  function searchlayouts(onfail) {
      var layout = getouter("layout", document.head, onfail)
      return (function layout(val) {
          var action = false
          var pre = true
          var res = ""
          for(var i = 0; i < val.length; i++) {
              if(val[i] != " " && pre) { pre = false }
              if(val[i] != " " && !pre) { res += val[i] }
              if(val[i] == " " && !pre) { action = i; break }
              }
          var argument = ""
          if(action) {
              var pre = true
              for(var i = action+1; i < val.length; i++) {
                  if(val[i] != " " && pre) { pre = false }
                  if(val[i] != " " && !pre) { argument += val[i] }
                  else if(val[i] == " " && !pre) { return argument }
                  }
              }; return { name: res, argument: argument }
          })(layout)
      };
  
  function estable(json="") {
      __json__ = json
      console.group("compilation")
      };
  
  function implement(res="") {
      __json__ = (__json__ + res) + `</script><script>read(__data__)</scr` + `ipt></body></html>`
      createDocument(__metadata__)
      };
  
  function setlayout(response) {
      __layout__.js = new Layout(null, "default")
      try { __layout__.js = eval(response) } catch { console.warn(`unexpected layout -->`, response) }
      };
  
  /* LOADING */
  window.addEventListener("DOMContentLoaded", function() {
      loadtheme()
      window.__data__ = ""
      window.__json__ = null
      window.__Iterations__ = null
      window.__metadata__ = new Array()
      window.__head__ = document.head
      window.__body__ = document.body
      window.__host__ = getouter("host", document.body.parentElement, "https://roseinfire.github.io/HtmlS")
      window.__title__ = (document.title) ? (document.title) : ("Untitled")
      window.__layout__ = searchlayouts("relative 0.6")
      window.__scripts__  = (function() {
          var res = []
          var scripts = document.getElementsByTagName("script")
          for(var i = 0; i < scripts.length; i++) {
              var type  = getouter("type", scripts[i])
              if( type == "htmls" || type == "text/htmls") { res.push(scripts[i]) }
              }; return res
          })()
      fetches.push(new ExtendFetch(__host__ + "/document.json", estable, function(err) {
          __loading__.innerHTML = "Host Error :(" 
          }))
      fetches.push(new ExtendFetch(__host__ + "/iterations.js", implement, function(err) {
          __loading__.innerHTML = "Load Failed :/" 
          }))  
      fetches.push(new ExtendFetch(__host__ +  "/layouts/" + __layout__.name + ".js", setlayout,  function() {}))
      for(var i = 0; i < __scripts__.length; i++) {
          var source = getouter("fetch", __scripts__[i], null)
          if(source) {
              __metadata__.remote = true
              fetches.push(new ExtendFetch(__host__ +"/"+ source, function(res, pointer) {
                  __metadata__.push(res); if(!pointer) { createDocument(__metadata__) }
                  }, function() {}))
              } else { __metadata__.push(__scripts__[i].innerHTML) }
          }
      if(!__metadata__.remote) { createDocument(__metadata__) }
      syncFetch(fetches)
      });
  
  function createDocument(hsList) {
      if(createDocument.establed) {
          for(var i = 0; i < hsList.length; i++) { __data__ += hsList[i] }
          if(__json__) { document.write(__json__) }
          if(__data__) { read(__data__) } 
          else { __loading__.innerHTML = "Empty :y"; console.groupEnd("compilation") }
          } else { createDocument.establed = true }
      }; 