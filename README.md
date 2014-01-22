# Conveyor

Conveyor is a simple, dumbed-down horizontal slider. It was written to animate stops in a road-trip landing-page.

![Screenshot](img/screenshot.png)


## Usage

1. Import the JS and CSS somewhere in your page

```html
<link rel="stylesheet" href="css/conveyor.css">

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="js/jquery.conveyor.js"></script>
```

2. Create the conveyor structure

```html
<div class="conveyor">
    <ul class="items">
        <li>
            <img src="http://placehold.it/120x120" alt=""/>
        </li>
        <li>
            <img src="http://placehold.it/120x120" alt=""/>
        </li>
        <!-- ... -->
    </ul>
</div>
```

3. Init the conveyor

```js
$(function() {
    var slider = $('.conveyor .items').conveyor();
});
```

### Add a control board to your conveyor

You can use the `next()`, `previous()` and `restart()` methods to make it move.

There is also a `scrollTo()` and an `index()` method that you can use to control precisely where you want it to go.

```js
var slider = $('.conveyor .items').conveyor();

$('.control-previous').click(function() {
    slider.previous();
});

$('.control-next').click(function() {
    slider.next();
});

$('.control-start').click(function() {
    slider.restart();
});
```

### Make a vertical slider

Set the direction option to 'vertical' ...

```js
var slider = $('.conveyor .items').conveyor({
    direction: 'vertical'
});
```

... and add the `conveyor--vertical` class to your HTML element

```html
<div class="conveyor conveyor--vertical">
    <ul class="items">
        <li>
            <img src="http://placehold.it/120x120" alt=""/>
        </li>
        <li>
            <img src="http://placehold.it/120x120" alt=""/>
        </li>
        <!-- ... -->
    </ul>
</div>
```

### Add a callback function

There is an `onScroll` option you can use to execute a function every time the conveyor scrolls

```js
var slider = $('.conveyor .items').conveyor({
    onScroll: function(){
        alert('Hi!');
    }
});
```


## Requirements

- jQuery


## License

Conveyor is released under the MIT License. See the bundled [LICENSE](LICENSE) file for details.
