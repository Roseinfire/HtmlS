  new Layout(
      function(e, arg) {
          try { arg = eval(arg) } catch {
            console.error("argument must be a number in range (0, 1) > ", arg)
              }
          if(innerWidth > innerHeight) {
              e.style.width = innerWidth*arg + "px"
              e.style.marginLeft = (innerWidth-e.offsetWidth)/2 + "px"
           } else {
               e.style.width = innerWidth*(1-arg/10)+"px"
               e.style.marginLeft = (innerWidth-e.offsetHeight)/2 + "px"
           }  
           if(e.offsetHeight < innerHeight) { 
              e.style.marginTop = (innerHeight-e.offsetHeight)/2 + "px" 
            } else { e.style.marginTop = "10px"; e.style.marginBottom="10px" }
   }, "relative")
