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

const canvas = document.getElementById('canvas');
const container = document.getElementById('image-container');
export const canvasImages = new Set();

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

function displayImagesInRows() {
     // Loop through each category and create a row
  for (const [category, count] of Object.entries(props)) {
    const heading = document.createElement('h3');
    heading.textContent = category
    container.appendChild(heading);

    const row = document.createElement('div');
    row.classList.add('row'); 
    // row.dataset.category = category;
  
    // Add images to the row
    for (let i = 0; i < count; i++) {
      const src = '/blog/assets/images/' + category + i + '.png'; 
      const wrapped_img = createWrappedImageElement(src, category + 'image' + i);
      row.appendChild(wrapped_img);
    }
    container.appendChild(row);
  }

}

function imageIsOnCanvas(image, canvas){
  const rect1 = image.getBoundingClientRect();
  const rect2 = canvas.getBoundingClientRect();

  return !(rect1.right < rect2.left || 
    rect1.left > rect2.right || 
    rect1.bottom < rect2.top || 
    rect1.top > rect2.bottom);
}

function setDraggableEventListeners() {
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
    // console.log("currentElement.offsetLeft in mousedown: " + currentElement.offsetLeft + ", currentElement.offsetTop in mousedown: " + currentElement.offsetTop);
    // console.log("event.clientX in mousedown: " + event.clientX + ", event.clientY in mousedown: " + event.clientY);
 
    // console.log("initialX in mousedown: " + initialX + ", initialY in mousedown: " + initialY);
    console.log("bounding posX in mousedown: " + currentElement.getBoundingClientRect().left + ", bounding posY in mousedown: " + currentElement.getBoundingClientRect().top);
    
  });
}

// triggers no matter where mouse is clicked
document.addEventListener('mouseup', function() {
  if(currentElement != null) {
    console.log('rect x in mouseup: ' + currentElement.getBoundingClientRect().left + 'rect y: in mouseup' + currentElement.getBoundingClientRect().top);
    if(imageIsOnCanvas(currentElement, canvas)){
      canvasImages.add(currentElement);
      console.log("event.clientX in mouseup: " + event.clientX + ", event.clientY in mouseup: " + event.clientY);
 
       } else {
      canvasImages.delete(currentElement);
      // console.log(canvasImages.size);
    }
     
  }
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
    console.log('mousex: ' + event.clientX + 'mousey: ' + event.clientY);
    console.log('x in mousemove: ' + currentX + ' y in mousemove: ' + currentY);
    currentElement.style.left = currentX + 'px';
    currentElement.style.top = currentY + 'px';
  }
});

}


function loadDraggableStyles() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = '/blog/projects/avatar-maker/draggable.css'; 
    document.head.appendChild(link);
}



loadDraggableStyles();
displayImagesInRows();
setDraggableEventListeners();
