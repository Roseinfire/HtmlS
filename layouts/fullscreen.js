  /* layout = "fullscreen" */
new Layout(
  function(e, arg) {
     e.style.padding = 0;
     e.style.margin = 0;
     e.style.position = "fixed"
     e.style.width = innerWidth+ "px"
     e.style.height = innerHeight + "px"
   }, "fullscreen")