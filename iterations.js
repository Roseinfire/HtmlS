/* load */
var loads = 0
function awaitload(endkey) {
    if( window.onresize) { window.onresize() }
    if(!loads && endkey != "") { try { hand.innerHTML = ""; } catch{} }
    if(!endkey) { loads++ }
    else if(endkey) { loads-- }
    if(!loads) {
        try {
            setTimeout(function() {
                background.image()
                var style = getouter("style", __head__)
                hand.style = style
                document.body.removeChild(__loading__)
                document.getElementById("content").style.display = "block";
                if(!nodes.length) {
                    hand.innerHTML = `<p style="font-size: 35px; text-align: center; color: maroon">Document Empy</p>`
                }
                if(window.onresize) { window.onresize() } 
               }, 5)
            } catch { console.warn("iterations run was not standart") }
        console.log("Compilation finished. Run `write.about()` to find out taken global names.") 
        console.groupEnd("compilation")
        }
    };

/* core */
class keyword {
    constructor(start=[], end=[], recall=function() {}, name) {
        const that = this
        this.ends = end
        this.starts = start
        this.name = name
        this.start = function(compl) {
            for(var i = 0; i < start.length; i++) { if(start[i]==compl) { return this } }
            return false
            }
        this.end = function(compl, moves) {
            for(var i = 0; i < end.length; i++) {
                var includes = false
                for(var e = 0; e < start.length; e++) {
                    if(end.includes(start[e]) ) { includes = true }
                    }
                if(end[i]==compl && (moves || !includes) ) { return this }
                }; return false
            }
        this.recall = function(event, response) { 
            if(response) { console.log(event) }
            recall(event)
            }
        }
    };

function read(data, response=false, encode=function(start, end, name) { return true }) {
    if(!read.pos) { read.pos = -1; awaitload() }
    read.data = data
    read.response = response
    read.iteration = null
    read.last_iteration = null
    read.res = ""
    while(read.data[read.pos+1]) {
        if(read.await) { console.log("reading paused"); break }
        read.pos++; read.change = null; read.last_iteration = null;
        if(response) { console.log(read.data[read.pos], read.iteration) }
        if(read.iteration && read.iteration.end( read.data[read.pos], read.pos-read.started ) ) {
            var draw = encode(read.started, read.pos-read.started, read.iteration.name);
            if(draw) {
                read.iteration.recall(read.res, response);
                }
            read.res = ""; read.started = null;
            read.last_iteration = read.iteration; read.iteration = null;
            }
        for(var i = 0; i < keywords.length; i++) {
            let key = keywords[i].start( read.data[read.pos] )
            if(!read.iteration && key  && key != read.last_iteration) {
                read.iteration = keywords[i]; read.change = true;read.started = read.pos; break;
                }
            }
        if(read.iteration && !read.change) { read.res += read.data[read.pos] }
        if(read.change) { read.change = null }
        }
    if(!read.await) {
        if(read.iteration) { read.iteration.recall(read.res, response) }
        awaitload(true)
        };
    };

read.awaitReading = function() {
    awaitload()
    read.await = true
    };

read.continueReading = function() {
    console.log("reading continued")
    awaitload(true)
    read.await = false; read.pos += 1
    read(read.data, read.response)
    };

/* syntax */
var keywords = []
keywords.tempotext = null
keywords.tempowrite = null
keywords.word = null
keywords.childhood = 1
var nodes = new Array()
var styles = new Array()

keywords.cssmodify = function(style) {
    var adition = true;
    for(var i = style.length-1; i > 0; i--) {
        if(style[i] == ";") { adition = false;}
        if(style[i] != " ") { break }
        }
    if(adition) { return style+";" } else { return eval('`' + style + '`') }
    };

keywords.getvalue = function(name, err) {
    for(var i = 0; i < styles.length; i++) {
        if(styles[i].name == name) { return keywords.cssmodify(styles[i].data) }
        }; if(err) { console.error("can't find style -->", res) }
    };

keywords.setvalue = function(name, data) {
    if( !keywords.getvalue(name) ) {
        styles.push({ name: name, data: data })
        } else { console.error("repeating name error -->", name) }
    };

keywords.groupitem = function(nodemap, command) {
    var num = 1
    var prop = 1
    var margin = 0
    var classname = null
    var cnt = 1
    var res = ""
    for(var i = 0; i < command.length; i++) {
        res += command[i]
        if(command[i] == " " && cnt == 1) { cnt++;
            try{ margin=eval(res); res = "" } catch {}
            }
        else if(command[i] == " " && cnt == 2) { cnt++;
            try{ prop=eval(res); res = "" } catch {}
            }
        else if(command[i] == " " && cnt == 3) { cnt++;
            try{ num=eval(res); res = "" } catch {}
            }
        else if(command[i] == " " && cnt == 4) {
            try{ classname=eval(res); res = "" } catch {}
            }
        if(cnt == 1) { try{ margin=eval(res) } catch {} }
        else if(cnt == 2) { try{ prop=eval(res) } catch {} }
        else if(cnt == 3) { try{ num=eval(res) } catch {} }
        else if(cnt == 4) { classname = res}
        }
    var element = nodemap.node
    var parent = element.parentElement
    var header = document.createElement("div");
    var brothers = new Array()
    for(var i = 0; i < num; i++) {
        var broth = element.clone(num == 1)
        broth.num = i
        broth.style.marginLeft = margin + "px"
        broth.style.position = "absolute"
        if(classname) { broth.className = classname }
        brothers.push(broth)
        }
    onResize(brothers, function(e, i) {
        var ewidth = ( parent.offsetWidth-margin*(brothers.length+1) )/brothers.length
        e.style.width = ewidth + "px"
        var ehight = ewidth/prop
        e.style.height = ehight + "px"
        e.style.marginLeft = (e.num + 1) * margin + ewidth*e.num + "px"
        })
    onResize([header], function(e) {
        if(e.children.length) {
            e.style.height = e.children[0].offsetHeight + "px"
            e.style.width = parent.offsetWidth + "px"
            }
        }) 
    parent.removeChild(element);
    for(var i = 0; i < brothers.length; i++) {
        header.append(brothers[i])
        }
    nodes[nodemap.index].node = header;
    keywords.tempowrite.node = header
    parent.appendChild(header)
    };

keywords.attribute = function(element, res, oneprop) {
    if(!element.property) { element.property = [] }
    if(!oneprop) { 
        var atr = ""
        for(var i = 0; i < res.length; i++) {
            if(res[i] == ",") { make(atr); atr="" }
            else { atr += res[i] }
            }; if(atr) { make(atr) }
        } else { make(res) }
    function make(a) {
        element.property.push(a)
        try { eval("element." + a) } 
        catch { console.error("failed to attribute -->", element, res) }
        } 
    };

keywords.importitem = function(command, preload) {
    console.warn("importing --> ", command)
    var ext = ""
    for(var i = command.length-1; i > 0; i--) {
        if(command[i] == ".") { break } else { ext+=command[i] }
        }
    if(ext == "sj") {
        read.awaitReading()
        var script = document.createElement("script")
        script.src = command
        script.onload = function() { console.log("imported script -->", this); read.continueReading() }
        script.onerror = function() { console.error("failed to import -->", command); read.continueReading() }
        document.body.append(script)
        }
    else if(ext == "ssc") {
      /*  var style = document.createElement("style")
        style.type = "text/css" */
        var link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = command
        document.head.append(link)
    /*    fetch(command)
        .then(response => response.text())
        .then(text => (function(t) { 
            style.innerHTML = t
            document.head.append(style);
            })(text)) */
        } 
    else if(preload) { 
        var link = document.createElement("link")
        link.rel = "preload"
        link.href = command
        document.head.append(link)
        }
    else { console.warn("unkown file extension -->", ext) }
    };

keywords.draw = function(res) {
    keywords.tempowrite = write(keywords.tempotext,  res, keywords.childhood)
    keywords.tempotext = null; keywords.childhood = 1;
    write.truewrite();
    };

keywords.readword = function(res, code) {
    var factcode = ""
    for(var i = 0; i < code.length; i++) {
        factcode += res[i]
        }
    if(factcode == code) {
        var arg = ""
        for(var i = code.length; i < res.length; i++) {
            if(res[i]!=" ") { arg += res[i] }
            };  keywords.word =  { code: code, argument: arg }
        }; return keywords.word
    };

keywords.value = function(res) {
    if(keywords.word.code == "ocal ") {
        keywords.setvalue(keywords.word.argument, res); keywords.word = null;
        }
    else if(keywords.word.code =="mport ") {
        keywords.importitem(res, keywords.word.argument); keywords.word = null;
        };
    };

keywords.child = function(res) {
    var result = 2;
    for(var i = 0; i < res.length; i++) {
        if(res[i] == "-") { result++ }
        }; keywords.childhood = result;
    };

keywords.style = function(node, res) {
    if(node) {
        node.style = (function separate(variables) {
            var variable = ""
            var result = ""
            for(var i = 0; i < variables.length; i++) {
                if(variables[i] == " ") { result += keywords.getvalue(variable); variable = "" }
                else { variable += variables[i] }
                }; if(variable) { result += keywords.getvalue(variable) }
            return result
            })(res)
        }
    };

keywords.readcode = function(res) {
    if(keywords.word.argument == "css") { 
        var style = document.createElement("style")
        style.type = "text/css"; style.innerHTML = res
        document.head.append(style)
        }
    else if(keywords.word.argument == "js") {
        var script = document.createElement("script")
        script.type = "text/javascript"; script.innerHTML = res
        document.head.append(script)
        } else { console.warn("unexpected parse --> ", keywords.word.argument) }
    keywords.word = null;
    };

keywords.push(new keyword(["~"], ["~"], function(res) { console.log(res) }, "comment"))
keywords.push(new keyword(["l"], ['"'], function(res) { keywords.readword(res, "ocal ") }, "local"))
keywords.push(new keyword(["i"], ['"'], function(res) { keywords.readword(res, "mport ") }, "import"))
keywords.push(new keyword(["p"], ["`"], function(res) { keywords.readword(res, "arse ") }, "parse"))
keywords.push(new keyword(["`"], ["`"], function(res) { keywords.readcode(res) }, "code"))
keywords.push(new keyword(['"'], ['"'], function(res) { keywords.value(res) }, "value"))
keywords.push(new keyword(["-"], ["#"], function(res) { keywords.child(res) }, "child"))
keywords.push(new keyword(["#"], ["*"], function(res) { keywords.tempotext = res; }, "inner"))
keywords.push(new keyword(["*"], [" ", "@", "\n"], function(res) { keywords.draw(res) }, "draw"))
keywords.push(new keyword(["@"], [".", "\n"], function(res) { keywords.style(keywords.tempowrite.node, res) }, "style"))
keywords.push(new keyword(["{"], ["}"], function(res) { keywords.attribute(keywords.tempowrite.node, res) }, "attribute"))
keywords.push(new keyword(["["], ["]"], function(res) { keywords.groupitem(keywords.tempowrite, res) }, "group"))

/* writing */
class DataNode {
    constructor(node, childhood, index) {
        const that = this
        this.node = node
        this.childhood = childhood
        this.index = index
        this.append = function(item) {
            that.node.append(item)
            }
        }
    };

function write(text, type, childhood) {
    var element = (function () {
        try {
            var res = document.createElement(type)
            if(res.tagName == "IMG" || res.tagName == "frame" || res.tagName == "iframe") {
                awaitload()
                res.onload = function() { awaitload(true) }
                res.onerror = function() { awaitload(true) }
                }
            if(text) { res.innerHTML = text }
            return res
            } catch {
            console.warn("Element creation failed --> ", type)
            var err = document.createElement("p"); err.innerHTML = "creation error"
            return err
            }
        })()
    var nodemap = new DataNode(element, childhood, nodes.length)
    nodes.push(nodemap)
    return nodemap
    };

write.append = function(n1, n2) {
    if(nodes[n2].childhood) {
        nodes[n1].append(nodes[n2].node)
        }
    };

write.truewrite = function(i, encode) {
    (i!=undefined) ? (i=i) : (i = nodes.length-1)
    try {
        for(var e = 1; e <= i; e++) {
            if(nodes[i-e].childhood == nodes[i].childhood-1) {
                write.append(i-e, i); break
                }
            }
        } catch { console.error("failed to create child -->", nodes[i]) }
    }; nodes.push(new DataNode(hand, 0, 0))

write.about = function() {
    console.group("taken global names")
    console.log("hand") 
    console.log("awaitload")
    console.log("loads")
    console.log("Keyword")
    console.log("keywords")
    console.log("read")
    console.log("write")
    console.log("nodes")
    console.log("DataNode")
    console.log("Layout")
    console.log("getouter")
    console.log("__host__")
    console.log("__head__")
    console.log("__body__")
    console.log("__scripts__")
    console.log("__loading__")
    console.log("__load")
    console.groupEnd("taken global names")
    };
