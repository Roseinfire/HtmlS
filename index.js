/* Thanks Kalman Huang at https://lottiefiles.com */
 var frame = document.createElement("iframe")
 frame.style.display = "none"
 onResize(frame, function(fr) {
    e = fr.style
    e.position = "fixed"
    e.width = `{innerWidth}px`
    e.height = `{innerHeight}px`
    e.top = 0; e.border = 0;
 });
 frame.src = "https://embed.lottiefiles.com/animation/132607"
 document.body.append(frame)
 function join() {
          frame.onload = function() { 
            frame.style.display = "block" 
            setTimeout(function() { frame.style.display = "none" }, 9000)
          }
          frame.src += ""
          document.getElementById("copy").innerHTML = "Welcome"
      }
     
