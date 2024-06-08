# Conor Dowdall | Graphic Designer

## A Logo Design for Muso Dojo

View the rendered HTML page here: https://conor-dowdall.github.io/musodojo-logo/

Designed using the Stick-Regular font from https://github.com/fontworks-fonts/Stick.

### The MDHeader Component

Import the javascript module in the document head

```html
<head>
  <!--  -->
  <script type="module" src="./md-header.mjs"></script>
  <!--  -->
</head>
```

and use the component in the body

```html
<body>
  <!--  -->
  <md-header></md-header>
  <!--  -->
</body>
```

The Stick font must be included in the stylesheet

```html
<style>
  /*  */
  @font-face {
    font-family: "Stick";
    src: url("./Stick-Regular.ttf");
  }
  /*  */
</style>
```

### CSS Custom Properties

The following properties and their defaults, which may be overwritten, are used

```css
--_md-header-wrapper-max-width: var(--md-header-wrapper-max-width, 100%);
--_md-header-max-width: var(--md-header-max-width, 110rem);
--_md-header-min-height: var(--md-header-min-height, 100svh);
--_md-header-gap: var(--md-header-gap, 0);
--_md-header-font-size: var(--md-header-font-size, 3rem);

--_md-logo-letter-size: var(--md-logo-letter-size, 10rem);
--_md-logo-size: var(--md-logo-size, 1.4em);
```
