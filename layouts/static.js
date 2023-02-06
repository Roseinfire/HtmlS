/* layout = "static _" in range (0; ∞)*/
new Layout(
   function(e, arg) {
      try { arg = eval(arg) } catch { 
        console.error("static layout takes value in range (0; ∞)", 'example: layout = "static 500"') 
      }
         if(arg < innerWidth) {
              e.style.width = arg + "px"
              e.style.marginLeft = (innerWidth-e.offsetWidth)/2 + "px"
            }
         else { e.style.marginLeft = 0; }
          if(e.offsetHeight < innerHeight) {
             e.style.marginTop= (innerHeight - e.offsetHeight)/2 + "px"
          } else { e.style.marginTop = 0; }
   }, "static");
