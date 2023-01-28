 function getouter(name, from, onfail) { 
     var list = from.attributes
     for(var i = 0; i < list.length; i++) { if(list[i].name == name) { return list[i].value } } 
     if(onfail) { return onfail }
     return undefined
     };
 
 function loadtheme() {
     window.__loading__ = document.createElement("div")
     var ld = __loading__
     ld.style.width = innerWidth + "px"
     ld.style.position = "fixed"
     ld.style.fontSize = "35px"
     ld.style.left = 0; ld.style.top = 0;
     ld.style.textAlign = "center"
     ld.innerHTML = "Loading.."
     ld.style.color = getouter("theme", document.body, "rgba(217, 210, 210, 0.6)")
     if(document.body) {
         document.body.style.margin = 0;
         document.body.append(ld)
         }
     ld.top = function() { this.style.marginTop = (innerHeight-this.offsetHeight)/2 + "px"}
     ld.top()
     };
 
 function getmain(source1, source2) {
     var scripts = document.getElementsByTagName("script")
     for(var i = 0; i < scripts.length; i++) {
         if(scripts[i].src == source1 || scripts[i].src == source2) { return scripts[i] }
         }
     var scr = document.createElement("script")
     return scr
     };
 
 window.addEventListener("load", function begin() {
     loadtheme()
     window.__host__ = getouter("host", document.body.parentElement, "https://roseinfire.github.io/HtmlS")
     fetch(__host__ + "/document.json")
     .then(response => response.text())
     .then(text => estable(text))
     .catch((error) => {
         __loading__.innerHTML = "Host Error :("
         console.error(error);
         console.log("visit `https://github.com/Roseinfire/HtmlS` for more information.")
         }); searchplans(getouter("layout", document.head, "relative 0.5"), function() {  })
     });
 
 function estable(response) {
     console.group("compilation")
     window.__head__ = document.head
     window.__body__ = document.body
     var title = document.getElementsByTagName("title")[0]
     if(title) { window.__title__ = title } else {  window.__title__ = "Untitled" }
     window.__scripts__ = (function() {
         var res = []
         var scripts = document.getElementsByTagName("script")
         for(var i = 0; i < scripts.length; i++) {
             var type  = getouter("type", scripts[i])
             if( type == "htmlscript" || type == "text/htmls") { res.push(scripts[i]) }
             }; return res
         })(); console.log(__scripts__)
     document.write(response);
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
 
 function searchplans(value) {
     function layout(val) {
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
         }
     var plan = layout(value)
     var source = __host__ +  "/layouts/" + plan.name + ".js"
     fetch(source)
     .then(response => response.text())
     .then(text => setlayout(text))
     .catch((error) => {
         console.error("can't find specified layout --> ",  source)
         stelayout(`new Layout(function() {}, "emty")`)
         })
     function setlayout(res) {
         searchplans.plan = { layout: eval(res), argument: plan.arg }
         if(searchplans.late) { searchplans.estable() }
         }
     };

 searchplans.estable = function() {
     if(searchplans.plan) {
         onResize([hand], function(e) { searchplans.plan.layout.content(e, searchplans.plan.argument) })
         } else { searchplans.late = true }
     };
    