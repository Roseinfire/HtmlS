![HtmlScript](https://raw.githubusercontent.com/Roseinfire/HtmlScript/main/Icon(500x500).png)
# Introdution
`HTML` is technology used everywhere in the web. <br>
However, it was writen more then thirty years ago. <br>
In spite of updates, html too old to be comfortable. <br>
HtmlScript is decoration language above Html. <br>
Writen to be `more` `flexible` and more `comfortable`

## Needed knowledge
* CSS 3.0
* basic HTML
  
# Installation
```HTML
<html>
    <head layout="center">
      <meta charset="utf-8">
     </head>
     <body>
      <script src="https://roseinfire.github.io/HtmlScript/begin.js"></script>
   </body>
</html>
```
At the top of classic html connect HtmlScript and `let's begin!`
 
# Usage
## Set the attributes
```HTML
<head layout="full">
<script type="hscript"></script>
</head>
```
> There are only five
### layout
General plan of the your page. Related to `<head>`.
Currently support three layouts:
* center
* full
* relative center
By default set to `center`
### style
Style of hand element.<br>
Hand Element can be found in the console typing `hand` <br>
Related to `<head>` <br>
By default set to `border-radius: 15px; border: 1px dotted`
### theme 
Indicates background-color of the page.<br>
Related to `<head>`. By default set to `white`
### background
Takes url and indicates background-image of your page. <br>
Related to `<head>`. By default not set.
### fetch 
Specific attribute related to `<script>`.
Fetch contains link to code, if you would like to store it separetely.
By default not set.

## Inner code
#### Just inside any hscript
```HTML
<script type="hscript"> Classic text works like a comment. </script>
```
### Creating style:
```javascript
local name "value"
```
#### works like variable
*  name: all chars exclude space, `"` and `.`
*  value: all chars exlude `"`
#### Example:
```javascript
local font "font-size:30px; text-align: center"
local border "border: 2px solid;"
```
### Creating an element:
```javascript
# Hello World! *type @font border.
```
* after `#` goes innerHTML, takes any value exclude `*`
* `type` takes classic tag name like `p` or `div`
* `font` and `border` are styles, defined like `local name "value"`

#### Character `@` is also draw operator. Even if style not specified, `@.` must be marked.
```javascript
  # Element with no style *p @.
```
### Adding attributes:
```javascript
 #*img @. { class="image" } { id="example" }
```
* between brackets `{` and `}` mark standart attribute. One attribute per bracket.
### Relative sizes and groups:
```javascript
#*div @border. [margin proportion quantity]
```
#### Between brackets `[` and `]` mark the conditions. Separate arguments width spaces.
* margin from parent border (`0` by defult)
* proportion - width/height (`1` by defaul)
* quantity - how many elements in group (`1` by default)
### Child nodes:
To specify child node, just begin command from `-`
```javascript
# *div @font.
     - # *div @.
     -- # Hello child nods! *div @.
```
### External files:
```javascript
  import "code.js"
  import "style.css"
```
File action defined automatically by it's extension. <br>
`.js` files become scripts <br>
`.css` files become styles <br>
## Congratulations! You finished a short course
 Give project a star, if you would like to see more featurs!
# Join development
The simplest way to take part in this project is write new Html layout.<br>
Read wiki to understand how to write additions. <br>
Create new branch, write your addition and apply for contribution.<br>
Note that you can take part in the discussion about new featurs. <br>


# Learn more
### About safety
Your page built with hscript, not hscript built with your page. `This is a law.` <br>
If your page build from local file, it stays local. Your page is public when hosted on public domain.<br>
Keep in mind, that hscript will not take responsibility if you publish confidicial information on the public server.<br>
When connect external scripts (include this one) you give it access to all your page.<br>
Be sure that you can trust the script you connect. That's why HtmlScript open code project. <br>
  
### About advertisment
HtmlScript itself `never use advertisment`. <br>
Anyone can use advertisment on his own site if it built with hscript. <br>
We believe that best support is join project or just give it a star. <br>
However, you can suppot project financially on ko-fi. <br>

# Contacts
##### Roseinfire
##### 14box14@gmail.com
##### ko-fi.com/Roseinfire


# Licence
This project licenced under MIT licence
