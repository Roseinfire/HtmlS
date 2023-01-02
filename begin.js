fetch("https://roseinfire.github.io/HtmlScript/document.json")
  .then(response => response.text())
  .then(text => estableHtmlScript(text))
  
  function estabeHtmlScript(text) {
    window.__manual__ = (function() {
       var scripts = document.getElementsByTagName("script")
       for(var i = 0; i < scripts.length; i++) {
        if(scripts[i].src == "https://roseinfire.github.io/HtmlScript/begin.js") { return scripts[i] }
         }
       var scr = document.createElement("script")
       return scr
      })()
    document.write(text)
    }