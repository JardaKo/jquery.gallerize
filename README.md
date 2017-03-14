# jquery.gallerize - Demo

To begin, you will be required to import the latest version of jQuery onto your site. Then call jquery.gallerize.min.js, jquery.gallerize.min.css and the desired theme (Default, Light, Dark & Midnight) css file such as jquery.gallerize-midnight.min.css.

```markdown
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="js/jquery.gallerize.min.js"></script>
<link href="css/jquery.gallerize.min.css" rel="stylesheet" />
<link href="css/jquery.gallerize-default.min.css" rel="stylesheet" />
```




## Basic 360 Product Image

```markdown

## HTML
<div class="container">
  <div class="gallerize">
    <ul>
      <li class="g360pi">
        <ul>
          <li><img src="img/360pi/1.jpg" /></li>
          <li><img src="img/360pi/2.jpg" /></li>
          <li><img src="img/360pi/3.jpg" /></li>
          <li><img src="img/360pi/4.jpg" /></li>
          <li><img src="img/360pi/5.jpg" /></li>
          <li><img src="img/360pi/6.jpg" /></li>
          <li><img src="img/360pi/7.jpg" /></li>
          <li><img src="img/360pi/8.jpg" /></li>
          <li><img src="img/360pi/9.jpg" /></li>
          <li><img src="img/360pi/10.jpg" /></li>
          <li><img src="img/360pi/11.jpg" /></li>
          <li><img src="img/360pi/12.jpg" /></li>
          <li><img src="img/360pi/13.jpg" /></li>
          <li><img src="img/360pi/14.jpg" /></li>
          <li><img src="img/360pi/15.jpg" /></li>
          <li><img src="img/360pi/16.jpg" /></li>
          <li><img src="img/360pi/17.jpg" /></li>
          <li><img src="img/360pi/18.jpg" /></li>
          <li><img src="img/360pi/19.jpg" /></li>
          <li><img src="img/360pi/20.jpg" /></li>
          <li><img src="img/360pi/21.jpg" /></li>
          <li><img src="img/360pi/22.jpg" /></li>
          <li><img src="img/360pi/23.jpg" /></li>
          <li><img src="img/360pi/24.jpg" /></li>
          <li><img src="img/360pi/25.jpg" /></li>
          <li><img src="img/360pi/26.jpg" /></li>
          <li><img src="img/360pi/27.jpg" /></li>
          <li><img src="img/360pi/28.jpg" /></li>
          <li><img src="img/360pi/29.jpg" /></li>
          <li><img src="img/360pi/30.jpg" /></li>
          <li><img src="img/360pi/31.jpg" /></li>
        </ul>
      </li>
    </ul>
  </div>
</div>


## JS
<script type="text/javascript">
  $('.gallerize').gallerize({
    gBGColour: 'white',
    threeSixPiLoop: 'forever',
    threeSixPiDelay: 100,
    pauseSP: 8000,
    transSP: 2500,
    thumbHeight: 35,
    thumbWidth: 35
  });
</script>

```
