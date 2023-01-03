    function join() {
       var form = `
<html>
   <head>` + `
       <meta charset="UTF-8">` + `
       <scr` + `ipt src="https://roseinfire.github.io/HtmlScript/begin.js">
    
       </scr`+"ipt>" +`
    </head>` + `
</ht`+"ml>"
          navigator.clipboard.writeText(form);
          document.getElementById("copy").innerHTML = "successfull"
       }
     