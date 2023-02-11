
    /*
     iterations.js file is a main main file.
     It's expected to use iterations without Htmls  other files.
     File contains language main construction and functions.
     Divided into five parts:  CODESPACE, LOAD, CORE, SYNTAX, WRITING.
     Each part described in general and every function described in detail.
     Licensed under MIT, Roseinfire, 2023
   */
    
    /* CODESPACE */
    /* This part is preparing methods future syntax operations */
    
    HTMLElement.prototype.await  = function() { // hide content while complex elements are loading (see LOAD part)
        let tags = ["IMG", "FRAME", "IFRAME"] // images and frames
        for(var i = 0; i < tags.length; i++) {
            if(tags[i] == this.tagName) { // go through the tags
                awaitload() // awaitload
                this.onload = function() {  awaitload(true) } 
                this.onerror = function() { awaitload(true) }
                break // element found
                }
            }; return this
        };

   HTMLElement.prototype.clone  = function(single) { // carefully clone element
        if(single) { console.error(`can't clone element -->`, this) } // check for id 
        var node = this.cloneNode(49) // clone with all depth
        if(this.property) { // save JS made attributes
            node.property = new Array()
            for(var i = 0; i < this.property.length; i++) {
                node.property.push(this.property[i])
                keywords.attribute(node, this.property[i], true)
                }
            }; return node.await() // await just for safety
        };

   /* LOAD */
   /* 
     This part contains a single function and provides a preview.
     The main idea is to call function every time when we want to load heavy source
     and call with endkey, when the source is loaded. 
     Function itself counts calls when called and discounts when called with endkey. 
     When the number of progress is zero, then stroke the content.
     It's expected that count new sources faster than loading them, 
     However, the function waits some ms before showing the result. 
  */
    
    function awaitload(endkey) {
        if(!endkey) { awaitload.loads++ }
        else if(endkey) { awaitload.loads-- }
        if(__loading__) { __loading__.innerHTML= "Loading..<br>" + ("*").repeat(awaitload.loads) }
        if(!awaitload.loads) {
            try {
                setTimeout(function() {
                    onResize([hand], function(e) { // add layout to the end of resize list 
                        __layout__.js.content(e, __layout__.argument)
                        })
                    var source = getouter("image", __body__)
                    if(source) { document.body.style.backgroundImage = "url('" + source + "')"  } // create background image
                    hand.style = getouter("style", __head__) // style the hand element
                    document.body.removeChild(__loading__)
                    content.style.display = "block"
                    /* Function called once at the beginning and again when reading finished.
                     Whether no elements appended, stroke that document is empty */
                    if(nodes.length ==1 ) { // nothing appended before
                        hand.innerHTML = `<p id="docempty">Document is empty</p>`
                        };
                    dispatchEvent(new Event('load')) // call for onload event
                     __resize(2, true); // call for resize event
                    console.timeEnd("building")
                    }, 0)
                } catch { console.warn("iterations run was not standart") }
            console.log("Compilation finished. Run `write.about()` to find out taken global names.") 
            console.groupEnd("compilation")
            }
        };

   awaitload.loads = 0 // currently zero elements are loading
    
    /* CORE */
    /* 
     The most important and hard to understand part.
     Core algorithm reads the text value and compilates it into syntax functions.
     Divided in two parts: keyword {} and read(){}
     Language based on start/end symbols not complete keywords.
     It gives flexibility, but defines low syntax diversity.
     keyword - class of objects, each contains data about what symbols 
     start iteration, where end iteration and what happens with text between those symbols.
     read - function which divides text into keywords and gives every keyword data between its keys.
   */
    
    class keyword {
        constructor(start=[], end=[], recall=function() {}, name) {
            const that = this // declare a link to object itself
            /* arguments exists as properties, but further used the arguments because it's shorter */
            this.ends = end 
            this.starts = start
            this.name = name
            this.start = function(compl) { // compl - symbol which viewed by `read` function
                if(start.includes(compl)) { return this } // return keyword
                return false
                }
            this.end = function(compl, moves) { // moves - difference between positions when iteration started and ended
                if(end.includes(compl) && moves ) { return this } // if iteration not empty return keyword
                return false
                }
            this.recall = function(event, response) { // event - value between keys
                if(response) { console.log(event) } // important for debag
                recall(event) // run syntax
                }
            }
        };

   function read(data, response=false, encode=function(start, end, name) { return true }) {
        /* 
         data - text which divides to iterations
         response - show iterations in console or not
         encode - perspective function for code editor
       */
        if(!read.pos) { read.pos = -1; awaitload() } // pos = -1, because will be called before it's value needed
        read.data = data // remember the data for case of stop reading
        read.response = response // log everything in console or not
        read.iteration = null // current iteration NULL
        read.last_iteration = null // here will be iteration that executed before current
        read.res = "" // let's build value to give for iteration
        while(read.data[read.pos+1]) { // go through the data until possible
            if(read.await) { console.log("reading paused"); break } // when needed break reading
            read.pos++; // remember changed position
            read.change = null; // need to catch the iteration changes
            read.last_iteration = null; // this string very important to avoid reading the same symbol multiple times
            if(response) { console.log(read.data[read.pos], read.iteration) } // if needed show symbol and iteration
            if(read.iteration && read.iteration.end( read.data[read.pos], read.pos-read.started ) ) {
                /* 
                 This happens when the iteration has started and met the termination symbol.
                 New iteration starts by the next step in order to access chain iteration.
               */
                var draw = encode(read.started, read.pos-read.started, read.iteration.name); // if needed encode
                if(draw) { // sometimes it's needed only encode, but do not execute language
                    read.iteration.recall(read.res, response);
                    }
                read.res = ""; read.started = null; // update progression
                read.last_iteration = read.iteration; read.iteration = null // remember iteration and declare that no current iteration
                }
            for(var i = 0; i < keywords.length; i++) { // search over keywords
                let key = keywords[i].start( read.data[read.pos] ) // if returned iteration which not previos - begin new
                // this is important because of it's bad whether iteration which has same symbols for close and open just starts again 
                if(!read.iteration && key && key != read.last_iteration) {
                    read.iteration = keywords[i]  // declare iteration
                    read.change = true // remember that NEW iteration started
                    read.started = read.pos // remember position it's started
                    break // stop searching for iterations
                    }
                }
            if(read.iteration && !read.change) { read.res += read.data[read.pos] } // whether we have current iteration building a value for it
            if(read.change) { read.change = null } // clear parameter for the next move of while loop
            }
        // This happens when reading is completed
        if(!read.await) { // if reading was not paused
            if(read.iteration) { read.iteration.recall(read.res, response) } // recall the last iteration
            awaitload(true) // call endkey
            };
        };

   /* It's also possible to stop reading and continue later */
    read.awaitReading = function() { 
        awaitload() // declare that reading not completed
        read.await = true // stop reading
        };

   read.continueReading = function() {
        console.log("reading continued")
        awaitload(true) // call endkey after awaiting was declared when reading stopped
        read.await = false // unlock reading
        read.pos += 1 // go to the next symbol
        read(read.data, read.response) // continue reading
        };

   /* SYNTAX */
    /*
     This part contains functions which take as argument value of iteration
     and do anything you can imagine. There are three common constructions:
     1) # *tag
     2) name arg "value"
     3) @style .class
     3*) - #
     The first construction is required and gives an html node for the third construction.
     The second construction is not required, but works separately from the first.
     Child node construction is special, because not required, but incorporated into `writing part`
     However, it works almost as construction three. 
   */
    
    var keywords = new Array() // complete list of existing keywords (they pushed later)
    keywords.tempotext = null // innerHTML
    keywords.tempowrite = null // html Node
    keywords.word = null // recognized complete keyword
    keywords.childhood = 1 // default childhood one, because all elements append to `hand` element
    keywords.spacing = false // will browser remove spaces from string true/false
    var nodes = new Array() // list of the all Nodes
    var styles = new Array() // list of the all recognized styles
    
    keywords.cssmodify = function(style) { // add ";" after style, whether was no such symbol yet
        var addition = true;
        for(var i = style.length-1; i > 0; i--) { // ! start from end
            if(style[i] == ";") { addition = false } // if already is ";" nothing happens
            if(style[i] != " ") { break } // go to the place where no ";" then use  the addition
            }
        if(addition) { return eval('`' + style + ';`') } else { return eval('`' + style + '`') }
        };

   /* variables set to array 'styles' */
    keywords.getvalue = function(name, err) { // get value of variable
        for(var i = 0; i < styles.length; i++) { // search over variables
            if(styles[i].name == name) { return keywords.cssmodify(styles[i].data) } // return modified value
            }; if(err) { console.error(`can't find style -->`, res) }
        };

   keywords.setvalue = function(name, data) {
        if( !keywords.getvalue(name) ) { // if no such name used
            styles.push({ name: name, data: data }) // push value and id to the array
            } else { console.error(`repeating name error -->`, name) }
        };

   /* 
     'groupitem' function creates a line of nodes from the one node.
     Takes DataNode (nodemap) and argument between brackets "[" and "]" (command) 
   */    
    keywords.groupitem = function(nodemap, command) {
        var num = 1 // quantity
        var prop = 1 // proportion (group should have relative size)
        var margin = 0 // margin between elements
        var cnt = 1 // number of elements
        var res = "" // let's unpack argument
        /* spaces always separate the arguments [margin proportion quantity] */
        for(var i = 0; i < command.length; i++) {
            res += command[i]
            if(command[i] == " " && cnt == 1) { cnt++;
                try{ margin=eval(res); res = "" } catch {} // margin
                }
            else if(command[i] == " " && cnt == 2) { cnt++;
                try{ prop=eval(res); res = "" } catch {} // property
                }
            else if(command[i] == " " && cnt == 3) { cnt++; // quantity
                try{ num=eval(res); res = "" } catch {}
                }
            /* don't forget the values which was not before space */
            if(cnt == 1) { try{ margin=eval(res) } catch {} }
            else if(cnt == 2) { try{ prop=eval(res) } catch {} }
            else if(cnt == 3) { try{ num=eval(res) } catch {} }
            }
        var element = nodemap.node // original element
        var parent = element.parentElement // remember parent element
        var header = document.createElement("div") // create element which holds all the copies
        var brothers = new Array() // list of clones
        for(var i = 0; i < num; i++) {
            /* create number of clones */
            var broth = element.clone(num != 1 && element.id) // clone element whether it's not a single type
            broth.num = i // give a serial number
            broth.style.marginLeft = margin + "px"
            broth.style.position = "absolute"
            brothers.push(broth)
            }
        onResize(brothers, function(e, i) { // add resize events
            var parentWidth = parent.offsetWidth- ( onlyNumbers(parent.style.paddingLeft) + onlyNumbers(parent.style.paddingRight) )
            var ewidth = ( parentWidth-margin*(brothers.length+1) )/brothers.length
            var padding = onlyNumbers(e.style.paddingLeft) + onlyNumbers(e.style.paddingRight)
            var border = onlyNumbers(e.style.borderLeft) + onlyNumbers(e.style.borderRight)
            e.style.width = ewidth-padding-border + "px"
            var ehight = (ewidth)/prop
            e.style.height = ehight + "px"
            e.style.marginLeft = (e.num + 1) * margin + (ewidth)*e.num + "px"
            })
        onResize([header], function(e) { // resize parent element of all the clones
            if(e.children.length) {
                var height = e.children[0].offsetHeight
                height = height + onlyNumbers(e.children[0].style.marginTop) + onlyNumbers(e.children[0].style.marginBottom)
                height = height + onlyNumbers(e.children[0].style.top)  + onlyNumbers(e.children[0].style.bottom)
                e.style.height = height + "px"
                var width = parent.offsetWidth - onlyNumbers(e.style.paddingLeft) - onlyNumbers(e.style.paddingRight)
                width = width - onlyNumbers(e.style.borderLeft) - onlyNumbers(e.style.paddingRight)
                e.style.width =  + "px"
                }
            });
        parent.removeChild(element) // remove original element
        for(var i = 0; i < brothers.length; i++) {
            header.append(brothers[i]) // append clones to father element
            }
        nodes[nodemap.index].node = header // replace node in the DataNode to support further building
        keywords.tempowrite.node = header // and access container styling
        parent.appendChild(header) // finally append new element with clones
        };

   keywords.attribute = function(element, res, oneprop) { // read attributes
        if(!element.property) { element.property = [] } // create list for element properties
        if(!oneprop) { // eject attributes from command (res)
            var atr = "" // let's build the attribute
            for(var i = 0; i < res.length; i++) { // read given value
                if(res[i] == ",") { make(atr); atr="" } // "," used to separate arguments
                else { atr += res[i] } // build the attribute
                }; if(atr) { make(atr) }
            } else { make(res) }
        function make(a) { // create attribute via 'eval'
            element.property.push(a) // remember that element have property is important for cloning
            try { eval("element." + a) } 
            catch { console.error(`failed to attribute -->`, element, res) } // large scary error
            } 
        };

   keywords.importitem = function(command, late) { // import external files
        console.warn(`importing --> `, command)
        var ext = "" // define the extension
        for(var i = command.length-1; i > 0; i--) {
            if(command[i] == ".") { break } else { ext+=command[i] }
            }
        if(ext == "sj") {
            var script = document.createElement("script") // create script
            if(late != "later") { read.awaitReading() // stop reading to access further elements use the script 
                script.onload = function() { console.log(`imported script -->`, this); read.continueReading() } // continue
                script.onerror = function() { console.error(`failed to import -->`, command); read.continueReading() } // continue
                } else { console.log(`loading in background mode -->`, command) }
            script.src = command // upload script
            document.body.append(script) // append
            }
        else if(ext == "ssc") {
            var link = document.createElement("link") // just create link to style
            link.rel = "stylesheet" // give rel
            link.href = command // load
            document.head.append(link) // append
            } 
        else { console.warn(`unknown file extension -->`, ext) } // at this time only two extensions are supported
        };

   keywords.draw = function(res) { // create element and append to the document
        keywords.tempowrite = write(keywords.tempotext,  res, keywords.childhood) // create 
        keywords.tempotext = null; keywords.childhood = 1; keywords.spacing = false // reset the parameters for the next node
        write.truewrite() // append right now
        };

   keywords.readword = function(res, code) { // read keywords with arguments
        var factcode = "" // code wich given by command (res)
        for(var i = 0; i < code.length; i++) {
            factcode += res[i] // building
            }
        if(factcode == code) { // whether real word is the same as code, therefore build an argument
            var arg = "" // get the argument and remember fo future operations
            for(var i = code.length; i < res.length; i++) {
                if(res[i]!=" ") { arg += res[i] } // spaces always used to separate arguments
                };  keywords.word =  { code: code, argument: arg } // remember the argument and word to build the value later
            }; return keywords.word // return result
        };

   keywords.value = function(res) { // build the value
        if(keywords.word.code == "tyle ") { // style
            keywords.setvalue(keywords.word.argument, res); keywords.word = null // create variable
            }
        else if(keywords.word.code =="mport ") { // import
            keywords.importitem(res, keywords.word.argument); keywords.word = null // import item
            };
        };

   keywords.child = function(res) { // count node childhood
        var result = 2; // 1+1=2 
        /* Any element is a child of #paper by default and if this function is called it means elements have another childhood. */
        for(var i = 0; i < res.length; i++) { // explore the given value
            if(res[i] == "-") { result++ } // count the childhood
            }; keywords.childhood = result // remember childhood
        };

   keywords.style = function(node, res) { // build the style from variable
        if(node && res) {
            /* External property 'styling' is used, because element style is not a string. */
            if(!node.styling && keywords.getvalue(res)) {
                node.styling = keywords.getvalue(res)
                } 
            else if(keywords.getvalue(res)) { node.styling = node.styling + keywords.getvalue(res) }
            else { console.error(`can't find style -->`, "@" + res) }
            }; node.style = node.styling // but we can just give a string style
        };

   keywords.readcode = function(res) { // special function for parsing because it uses quotes different from keywords.value
        if(keywords.word.argument == "css") { 
            var style = document.createElement("style") // create style
            style.type = "text/css"; style.innerHTML = res
            document.head.append(style) // append style
            }
        else if(keywords.word.argument == "js") { // create script
            var script = document.createElement("script")
            script.type = "text/javascript"; script.innerHTML = res
            document.head.append(script) // append script
            } else { console.warn(`unexpected parse --> `, keywords.word.argument) }
        keywords.word = null // no need to remember keyword anymore
        };

   keywords.className = function(node, res) {
        if(res) {
            if(!node.className) {
                node.className = res // give className
                }
            else {
                node.className = node.className + " " + res // give more than one className
                }
            }
        };

   keywords.br = function(text, spacing) { // set '<br>'s and tabs
        var res = "" // let's declare result
        for(var i = 0; i < text.length; i++) { // go through the text
            if(text[i] == "\n") { res+="<br>" } // replace new strings on '<br>'s
            else if(spacing && text[i] == " ") { res += "&nbsp" } // add spaces
            else { res += text[i] } // if none of above, just build the text
            }; return res // return edited text
        };

   /* 
       Creating keywords. Names are not required, but very helpful for debugging.
       Not all the words can be used as keys, because of principles of compilation.
       For more information see the CORE part. (No 'Example' and 'Exmp' existing together)
  */
    keywords.push(new keyword(["~"], ["~"], function(res) { console.log(res) }, "comment")) 
    keywords.push(new keyword(['"'], ['"'], function(res) { keywords.value(res) }, "value"))
    keywords.push(new keyword(["`"], ["`"], function(res) { keywords.readcode(res) }, "code"))
    keywords.push(new keyword(["-"], ["!", "#"], function(res) { keywords.child(res) }, "child"))
    keywords.push(new keyword(["!"], ["#"], function(res) { keywords.spacing = true }, "spacing"))
    keywords.push(new keyword(["s"], ['"'], function(res) { keywords.readword(res, "tyle ") }, "style"))
    keywords.push(new keyword(["p"], ["`"], function(res) { keywords.readword(res, "arse ") }, "parse"))
    keywords.push(new keyword(["i"], ['"'], function(res) { keywords.readword(res, "mport ") }, "import"))
    keywords.push(new keyword(["["], ["]"], function(res) { keywords.groupitem(keywords.tempowrite, res) }, "group"))
    keywords.push(new keyword(["*"], [" ", "@", "\n", ".", "{", "["], function(res) { keywords.draw(res) }, "creation"))
    keywords.push(new keyword(["{"], ["}"], function(res) { keywords.attribute(keywords.tempowrite.node, res) }, "attribute"))
    keywords.push(new keyword(["#"], ["*"], function(res) { keywords.tempotext = keywords.br(res, keywords.spacing) }, "innerHTML"))
    keywords.push(new keyword(["@"], [" ", "\n", "{", ".", "["], function(res) { keywords.style(keywords.tempowrite.node, res) }, "style"))
    keywords.push(new keyword(["."], [" ", "\n", "{", "@", "["], function(res) { keywords.className(keywords.tempowrite.node, res) }, "class"))
    
    /* WRITING */
    /* 
     This part executes commands from syntax and gives created nodes their real lifes.
     Divided into three functions and one class.
     DataNode - broaden information about nodes. Includes its number and childhood
     write - function which creates element by given information
     truewrite - function which appends node to the right position
     about  - function which accesses global names taken by script.
   */
    
    class DataNode {
        constructor(node, childhood, index) { // broad the node
            const that = this 
            this.node = node // element itself
            this.childhood = childhood // how many parents element have
            this.index = index // serial number
            this.append = function(item) {
                that.node.append(item) // helper function to append a child
                }
            }
        };

   function write(text, type, childhood) {
        var element = (function () { // create element
            try {
                var res = document.createElement(type).await() // waiting for load whether element needs so
                if(text) { res.innerHTML = text } // provide innerHTML
                return res // return new element
                } 
            catch {
                console.warn("Element creation failed --> ", type)
                var err = document.createElement("p"); err.innerHTML = "creation error"
                return err // whether creation failed, then return error node (to avoid future errors)
                }
            })()
        var nodemap = new DataNode(element, childhood, nodes.length) // create DataNode
        nodes.push(nodemap) // and push to the list of nodes
        return nodemap // return created element
        };

   write.append = function(n1, n2) { // append one node to another
        if(nodes[n2].childhood) {
            nodes[n1].append(nodes[n2].node)
            }
        };

   write.truewrite = function(i, encode) { // append node to it's parent
        (i!=undefined) ? (i=i) : (i = nodes.length-1) // give ability to append the last created node as well as any from list
        try { // catch the errors
            for(var e = 1; e <= i; e++) { // find the first node before given, which childhood less by one
                if(nodes[i-e].childhood == nodes[i].childhood-1) { // when found
                    write.append(i-e, i); break // then append one to another and stop searching
                    }
                }
            } catch { console.error(`failed to create child -->`, nodes[i]) }
        };

   nodes.push(new DataNode(hand, 0, 0)) // let the first node will be #paper element
    
    /* provide the information about taken names or taken time, memory e.t.c */
    write.about = function() {
        let names = ["fetches", "ExtendFetch", "syncFetch", "onlyNumbers", "getouter", "loadtheme", "Layout",
         "searchlayouts", "estable", "setlayout", "__data__", "__metadata__",
         "__head__", "__body__", "__host__", "__layout__", "__scripts__", "createDocument", "onResize", "awaitload",
         "keyword", "read", "keywords", "nodes", "styles", "DataNode", "write"]
        console.group("taken global names")
        for(var i = 0; i < names.length; i++) { console.log(names[i], eval(names[i])) }
        console.groupEnd("taken global names")
        };

  
