![HtmlScript](https://raw.githubusercontent.com/Roseinfire/HtmlScript/main/Icon(200x200).png)
# Introdution
Was it ever boring to write typical HTML pages? <br>
If you ever think about write web pages, probably stopped due it's boring creation. <br>
Never stop. Just upgrade. <br> 
HtmlScript is decoration language above Html. <br>
  
# Installation
When creating HTML document, connect HtmlScript.
```HTML
<html>
      <head>
          <meta charset="utf-8">
            <script src="https://roseinfire.github.io/HtmlScript/begin.js">
            </script>
        </head>
     </body>
</html>
```
Probably all. Now start coding!
  
# Dealing with syntax
## Outer parametres
HtmlScript automatically creates page, where load and resize events included. <br>
Outer characteristics defined via script attributes:
* theme
* background
* screen
* style
* fetch
### As example:
```HTML
<script screen="2200" theme="pink" style="border: 0"></script>
```
### theme
background-color of your page
### backgroud
background-image under your page
### screen
Html layout.
* full
* static center
* relative center
### style
Css style of content holder element.
By default: "border: 1px dotted; border-radius: 20px"
### fetch
Source to your h-script code, if want to store it separetely
## Inner parametres
#### Just inside script
```HTML
<script theme="pink" style="border: 0">
  Looks like a comment
</script>
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
# text *type @font border.
```
* text defines innerHTML, takes any value exclude `#` and `*`
* type takes classic tag name
* font and border is styles, defined as `local name "value"`

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
#### separate arguments width spaces
* margin from parent border (`0` by defult)
* proportion width/height (`1` by defaul)
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
File action will be defined automaticly by it's extension.
`.js` files become scripts <br>
`.css` files become styles <br>
## Congratulations! You understood HtmlScript syntax!
 Give project a star if you would like to see more!
# Join development
The simplest way to take part in this project is write new Html layout.<br>
Read wiki to understand how to write additions. <br>
Create new branch, write your addition and apply for contribution.<br>
Note that you can take part in the discussion about new featurs. <br>


# Learn more
## About safety

  
## About advertisment


# Contacts
##### Roseinfire
##### 14box14@gmail.com
##### ko-fi.com/Roseinfire


# Licence
This project licenced under MIT licence
