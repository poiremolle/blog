---
layout: post
title:  "Avatar maker"
date:   2025-01-31
categories: you
---
Hi Andreas


<div id="image-container"></div>

<script>
  // Object containing the categories and their counts
  const props = {
    head: 3,
    mouth: 3,
    nose: 3,
    eyes: 3,
    hat: 3,
    butterfly: 2,
    flower: 5
  };

  const container = document.getElementById('image-container');


function createWrappedImageElement(src, alt) {
 const wrapper = document.createElement('div');
  wrapper.className = 'image-wrapper';

  const img = document.createElement('img');
  img.className = 'draggable';
  img.src = src;
  img.alt = alt;

  wrapper.appendChild(img);
  return wrapper;

}

  // Loop through each category and create a row
  for (const [category, count] of Object.entries(props)) {
    const row = document.createElement('div');
    row.classList.add('row'); 
    row.dataset.category = category;

    // Add images to the row
    for (let i = 0; i < count; i++) {
      const src = '/blog/assets/images/' + category + i + '.png'; 
      const wrapped_img = createWrappedImageElement(src, category + 'image' + i);
      row.appendChild(wrapped_img);
    }

    container.appendChild(row);
  }
</script>

<style>
  #image-container {
    display: flex;
    flex-direction: column; 
    gap: 10px; /* Space between rows */
  }

  .row {
    display: flex;
    gap: 10px; /* Space between images */
  }

  .image-wrapper {
  position: relative;
  }

  .image-wrapper img {
    width: 50%;

  }

  .draggable {
  position: relative; 
  cursor: grab;
}
</style>


<!-- Built upon code snippet from W3doc's JavaScript Mouse Events article
https://www.w3docs.com/learn-javascript/mouse-events-basics.html#implementing-drag-and-drop-features-13 

Adding event listeners in for-loop, prevent default drag behaviour for images
and adding comments for my own understanding.
-->

<script>
  const draggables = document.getElementsByClassName('draggable');
  let active = false;
  let currentX, currentY, initialX, initialY;
  let currentElement = null;

  for (let i = 0; i < draggables.length; i++) {
    draggables[i].addEventListener('mousedown', function(event) {
      // prevents browser for treating img as draggable file
      if (event.target.tagName === 'IMG') {
            event.preventDefault();
      }
      active = true;
      currentElement = this; 

      // calculates how far in the img the cursor is so the img doesn't "jump" to the cursor 
      initialX = event.clientX - currentElement.offsetLeft;  
      initialY = event.clientY - currentElement.offsetTop;
    });
  }

  // triggers no matter where mouse is clicked
  document.addEventListener('mouseup', function() {
    active = false;
    currentElement = null;
  });

  // triggers if mouse is down and on an element (ie. currentElement != null)
  document.addEventListener('mousemove', function(event) {
    if (active && currentElement) {
      event.preventDefault();
      
      // difference between mouse (x,y) and the cursor offset relative to the element's top corner
      currentX = event.clientX - initialX; 
      currentY = event.clientY - initialY;
      currentElement.style.left = currentX + 'px';
      currentElement.style.top = currentY + 'px';
    }
  });
</script>

