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
### Just inside script.
```HTML
<script screen="2200" theme="pink" style="border: 0">
  Looks like a comment
</script>
```
### Creating style:
```javascript
local style1 "font-size:30px; text-align: center"
local style2 "border: 2px solid;"  
```
#### works like variable
*  style can take any name exclude space " and .
*  style can take value exlude "
### Creating an element:
```javascript
# My text *type @style1 style2.
```
* my text defines innerHTML, takes any value exclude # and *
* type takes standart tag name
* style1 and style2 is links like ' local style ".." '
### Character '@' is also draw operator. Even if style not specified, '@.' must be marked.
```javascript
  # Element with no style *p @.
```
### Adding attributes:
```javascript
 #*img @. {id="new_image"}{src="https://my-image.com/img.png"} 
```
* between symbols '{' and '}' mark standart attribute.
* one attribute per bracket 
### Relative sizes and groups:
```javascript
#*div @style2. [margin proportion quantity]
```
#### separate arguments width spaces
* margin from parent border
* proportion width/height
* quantity = how many elements need
### Child node:
To specify child node, just begin command from "-"
```javascript
# *div @style1.
     - # *div @.
     -- # Hello child nods! *div @.
```
### connecting files
```javascript
  import "code.js"
  import "style.css"
```
#### Congratulations! You understood HtmlScript. 
 Give project a star if you would like to see more!
## Join development
The simplest way to take part in this project is write new Html layout.<br>
Read wiki to understand additions. <br>
Create new branch, write your addition and apply for contribution.<br>

# Learn more
## About safety
HtmlScript works on the user side. <br>
Your information never goes further your device. <br>
However, be careful with scripts connected from the internet. <br>
When you connect outer script, it usually has control over your page. <br>
Don't write confidicial information. Whenever posible check source code. <br>
That's why HtmlScript have open code. <br>
  
## About advertisment
Accourding to our rules, HtmlScript itself never uses advertisment. <br>
It does not mean nobody can't use ads on HtmlScript-based site. <br>

# Contacts
##### Roseinfire
##### 14box14@gmail.com
##### ko-fi.com/Roseinfire


# Licence
This project licenced under MIT licence
