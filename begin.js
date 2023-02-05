 
/* This working script. It loads form of the future document
  and creates basic functions and constants. 
  Do not use it without document.json and network connection.
  Licensed under MIT, Roseinfire, 2023. */
  
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
      __loading__ = document.createElement("div")
      }; loadtheme()
  
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
      }
  
  __host__ = getouter("host", document.body.parentElement, "https://roseinfire.github.io/HtmlS")

  fetches.push(new ExtendFetch(__host__ + "/document.json", estable, function(err) { 
      /* __loading__ = "Host Error :(" */ 
   }))

  fetches.push(new ExtendFetch(__host__ +  "/layouts/" + __layout__.name + ".js", setlayout,  function() {}))

  __data__ = ""
  for(var i = 0; i < __scrips__.length; i++) {
    var source = getouter("fetch", __scripts__[i], null)
      if(source) {
       fetches.push(new ExtendFetch(__host__ +  source, function(res, pointer) {
             __data__ += res; if(!pointer) { document.write(response) }
           }, function() {}))
         }
      }
   }; syncFetch(fetches)
  
  function estable() {
      console.group("compilation")
      window.__head__ = document.head
      window.__body__ = document.body
      window.__layout__ = searchlayouts("relative 0.6")
      var title = document.title
      if(title) { window.__title__ = title } 
      else {  window.__title__ = "Untitled" }
      window.__scripts__ = (function() {
          var res = []
          var scripts = document.getElementsByTagName("script")
          for(var i = 0; i < scripts.length; i++) {
              var type  = getouter("type", scripts[i])
              if( type == "htmlscript" || type == "text/htmls") { res.push(scripts[i]) }
              }; return res
          })() // console.log(__scripts__)
      };

  var resizebase = new Array()
  function onResize(e, f) { 
      resizebase.push({ func: f, elem: e }); return resizebase
      }
  
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
          var paperwidth = "";
          if(action) {
              var pre = true
              for(var i = action+1; i < val.length; i++) {
                  if(val[i] != " " && pre) { pre = false }
                  if(val[i] != " " && !pre) { paperwidth += value[i] }
                  else if(val[i] == " " && !pre) { return paperwidth }
                  }
              }; return { name: res, arg: paperwidth }
          })(layout)
      };
  
  function setlayout(response) {
        console.log(response)
    //  onResize([hand], function(e) { layout.content(e, searchplans.plan.argument) })
   };
