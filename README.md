![HtmlScript](https://raw.githubusercontent.com/Roseinfire/HtmlScript/main/Icon(500x500).png)
# Introdution
HTML is technology used everywhere in the web. <br>
Nevertheless it writen more then thirty years ago. <br>
HtmlScript is decoration language above Html. <br>
Writen to be more flexible and beatifull. <br>

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
 
# Dealing with syntax
## Outer code
#### Head attributes show how page generally looks like
```HTML
<head layout="full"></head>
```
#### There are a few.
* layout
* style
* theme
* background
* fetch

## Inner code
#### Just inside
```HTML
<script type="text/hscript"> Classic text works like a comment. </script>
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
## About safety
Your page build with hsccript, not hscript build width your page. `This is a law.`
Your page is local if build from local file and public when hosted on public domain.
Keep in mind that hscript will not take responsibility if you publish confidicial information.
When connect external scripts (include this one) you give it access to all your page.
  
## About advertisment


# Contacts
##### Roseinfire
##### 14box14@gmail.com
##### ko-fi.com/Roseinfire


# Licence
This project licenced under MIT licence
