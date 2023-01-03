
function getscript(source1, source2) {
  var scripts = document.getElementsByTagName("script")
      for(var i = 0; i < scripts.length; i++) {
        if(scripts[i].src == source1 || scripts[i].src == source2) { return scripts[i] }
      }
     var scr = document.createElement("script")
     return scr
 }
window.getouter =  function(name) { 
      var list = __manual__.attributes
      for(var i = 0; i < list.length; i++) { if(list[i].name == name) { return list[i].value } } 
         return undefined
     }
 window.addEventListener("load", function() {
   window.__manual__ = document.body.parentElement
   var host = getouter("localhost")
   if(host == undefined) {
     __manual__ = getscript("https://roseinfire.github.io/HtmlScript/begin.js")
     fetch("https://roseinfire.github.io/HtmlScript/document.json")
        .then(response => response.text())
        .then(text => estable(text))
    }
   else {
    __manual__ = getscript("http://localhost:" + host + "/begin.js", "https://roseinfire.github.io/HtmlScript/begin.js")

    fetch("document.json")
      .then(response => response.text())
      .then(text => estable(text))
      }
 })
function estable(response) {
   console.group("compilation")
   console.log("SOURCE: ", __manual__); document.write(response)
}
