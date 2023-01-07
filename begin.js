function getmain(source1, source2) {
  var scripts = document.getElementsByTagName("script")
    for(var i = 0; i < scripts.length; i++) {
      if(scripts[i].src == source1 || scripts[i].src == source2) { return scripts[i] }
    }
  var scr = document.createElement("script")
  return scr
 };
window.getouter =  function(name, from) { 
   var list = from.attributes
   for(var i = 0; i < list.length; i++) { if(list[i].name == name) { return list[i].value } } 
   return undefined
 };
 window.addEventListener("load", function() {
   var host = getouter("localhost", document.body.parentElement)
   if(host == undefined) {
     __htmlscript__ = getmain("https://roseinfire.github.io/HtmlScript/begin.js")
     fetch("https://roseinfire.github.io/HtmlScript/document.json")
       .then(response => response.text())
       .then(text => estable(text))
   } else {
    __htmlscript__ = getmain("http://localhost:" + host + "/begin.js","https://roseinfire.github.io/HtmlScript/begin.js")
    fetch("document.json")
      .then(response => response.text())
      .then(text => estable(text))
     }
 });
function estable(response) {
   console.group("compilation")
   window.__head__ = document.head
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
