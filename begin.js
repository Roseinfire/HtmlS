window.getouter =  function(name, from, onfail) { 
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
     ld.top = function() { ld.style.marginTop = (innerHeight-ld.offsetHeight)/2 + "px"}
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
   window.__host__ = getouter("host", document.body.parentElement, "https://roseinfire.github.io/HtmlScript")
     fetch(__host__ + "/document.json")
       .then(response => response.text())
       .then(text => estable(text))
        .catch((error) => {
         __loading__.innerHTML = "Host Error :("
         console.error('Error:', error);
         console.log("https://github.com/Roseinfire/HtmlScript for more information.")
        })
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
        if( type == "htmlscript" || type == "text/htmlscript") { res.push(scripts[i]) }
          }; return res
      })(); console.log(__scripts__)
  document.write(response)
}
