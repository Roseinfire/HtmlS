/* Thanks Kalman Huang at https://lottiefiles.com */
 var frame = document.createElement("iframe")
 frame.style = `position: fixed; width: 90%; top: 0;
 height: 90%; margin-left: 5%; margin-top: 5%; border: 0; display: none;`
 frame.src = "https://embed.lottiefiles.com/animation/132607"
 document.body.append(frame)
 function join() {
          frame.onload = function() { 
            frame.style.display = "block" 
           // setTimeout(function() { frame.style.display = "none" }, 9000)
          }
          frame.src += ""
          document.getElementById("copy").innerHTML = "Welcome"
      }
     
