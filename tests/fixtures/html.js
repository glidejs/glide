export default `
<div id="glide" class="glide">
  <div data-glide-el="controls" class="glide__arrows">
    <button class="glide__arrow glide__arrow--start" data-glide-dir="<<">start</button>
    <button class="glide__arrow glide__arrow--prev" data-glide-dir="<">prev</button>
    <button class="glide__arrow glide__arrow--next" data-glide-dir=">">next</button>
    <button class="glide__arrow glide__arrow--end" data-glide-dir=">>">end</button>
  </div>

  <div data-glide-el="controls" class="glide__bullets">
    <button data-glide-dir="=0">1</button>
    <button data-glide-dir="=1">2</button>
    <button data-glide-dir="=2">3</button>
  </div>

  <div data-glide-el="track" class="glide__track">
    <ul class="glide__slides">
      <li class="glide__slide">1</li>
      <li class="glide__slide">2</li>
      <li class="glide__slide">3</li>
    </ul>
  </div>
</div>
`
