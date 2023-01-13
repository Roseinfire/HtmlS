 
function join() {
       var form = `
<html>
   <head>` + `
       <meta charset="UTF-8">` + `
       <script type="htmlscript"></scr` + `ipt>` + `
       <script src="https://roseinfire.github.io/HtmlScript/begin.js"></scr`+"ipt>" +`
    </head>` + `
</ht`+"ml>"
          navigator.clipboard.writeText(form);
          document.getElementById("copy").innerHTML = "Welcome"
          /* Thanks Kalman Huang at https://lottiefiles.com */
          var frame = document.createElement("iframe")
          frame.style = `potition: fixed; width: 90%;
             height: 90%; margin-left: 5; margin-top: 5%; border: 0;`
          frame.src = "https://embed.lottiefiles.com/animation/132607"
          frame.onload = function() {
             // setTimeout(function() { document.body.removeChild(frame) }, 3000)
           }; document.body.append(frame)
      }
     
