 
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
          frame.style = `potition: fixed; width: ${innerWidth*0.7}px;
             height: ${innerHeight*0.7}px; margin-left: ${innerWidth*0.15}px; margin-top: ${innerHeight*0.15}px`
          frame.src = "https://embed.lottiefiles.com/animation/132607"
          frame.onload = function() {
             setTimeout(function() { document.body.removeChild(frame) }, 900)
           }; document.body.append(frame)
      }
     
