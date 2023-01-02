## About HtmlScript
Was it ever boring to write typical HTML pages? <br>
If you ever think about web pages, you probably stopped due it's boring creation. <br>
Never stop. Just upgrade to new level. <br> 
HtmlScript is decoration language to work with HTML easily. <br>
  
## In the begining..
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
This form probably all HTML you will ever write.
  
## Dealing with syntax..
### Outer parametres
HtmlScript automatically creates page, where load and resize events included. <br>
Outer characteristics defined via script attributes:
* theme
* background
* screen
* style
* fetch
#### As example:
```HTML
<script screen="2200" theme="pink" style="border: 0"></script>
```
### Inner parametres
#### Just inside script.
```HTML
<script screen="2200" theme="pink" style="border: 0">
  Not specified text is a comment.
</script>
```
#### Creating style:
```javascript
&my-style:( font-size:30px; text-align: center )  
```
* variable can take any name exclude '&' and ':'
* variable can take value exlude '(' and ')'
#### Creating an element:
```javascript
# My text *type @style
```
* my text is innerHTML and take any value exclude '#' and '*'
* type takes standat tag name
* style is link like &style:()
> Character '@' is also draw operator.
> Even if style not specified, '@' must be marked.
```javascript
  # With no style *p @ 
```
#### Adding attributes:
```javascript
 #*img @ { src="https://my-image.com/img.png" } 
```
* between symbols '{' and '}' mark standart attributes.
#### Relative sizes:
```javascript
#*img @ { src="https://my-image.com/img.png" } [20]
```
* between symbols '[' and ']' mark margin from border.
#### Child node:
To specify child node, just begin command from "-"
```javascript
# *div @my-style
     - # *div @
     -- # Hello child nods! *div @ 
```
### Congratulations! You understood HtmlScript. 
#### For this moment it cannot replace HTML.
#### Nevertheless, some things can became significanty easier.
## About safety
HtmlScript works on the user side. <br>
Your information never goes further your device. <br>
However, be careful with scripts connected from the internet. <br>
When you connect outer script, it usually has control over your page. <br>
Don't write confidicial information. Whenever posible check source code. <br>
That's why HtmlScript have open code. <br>
  
## About advertisment
Accourding to our [rules](), HtmlScript itself never uses advertisment. <br>
It does not mean nobody can't use ads on HtmlScript-based site. <br>
