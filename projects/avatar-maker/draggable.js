 // Object containing the categories and how many there are in each
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
export const factor = 3;


// ELEMENT CREATION FUNCTIONS

function createWrappedImageElement(src, alt) {
 const wrapper = document.createElement('div');
  wrapper.className = 'image-wrapper';

  const img = document.createElement('img');
  img.className = 'draggable';
  img.src = src;
  img.alt = alt;
  img.style.width = 100 + 'px';
  img.style.height = 'auto';

  wrapper.appendChild(img);
  return wrapper;

}


// ELEMENT MANIPULATION FUNCTIONS

function scaleWrappedImages(scaleFactor) {
  document.querySelectorAll('.image-wrapper img').forEach(img => {
    if (img.complete && img.naturalWidth > 0) {
      scaleImage(img, scaleFactor);
    } else {
      img.onload = () => scaleImage(img, scaleFactor);
    }
  });
}

function scaleImage(img, scaleFactor) {
  const ogWidth = img.naturalWidth;
  const ogHeight = img.naturalHeight;

  const newWidth = ogWidth * scaleFactor;
  const newHeight = ogHeight * scaleFactor;

  img.style.width = newWidth + 'px';
  img.style.height = newHeight + 'px';

}

function displayImagesInRows() {
     // Loop through each category and create a row
  for (const [category, count] of Object.entries(props)) {
    const row = document.createElement('div');
    row.classList.add('row'); 
  
    // Add images to the row
    for (let i = 0; i < count; i++) {
      const src = '/blog/assets/images/' + category + i + '.png'; 
      const wrapped_img = createWrappedImageElement(src, category + 'image' + i);
      row.appendChild(wrapped_img);
    }
    container.appendChild(row);
  }
}


// UTILITIES
function imageIsOnCanvas(image, canvas){
  const rect1 = image.getBoundingClientRect();
  const rect2 = canvas.getBoundingClientRect();

  return !(rect1.right < rect2.left || 
    rect1.left > rect2.right || 
    rect1.bottom < rect2.top || 
    rect1.top > rect2.bottom);
}


// USER INTERACTION FUNCTIONS

function dragStart(event) {
  // prevents browser for treating img as draggable file
  if (event.target.tagName === 'IMG') {
        event.preventDefault();
  }
 
  let initialCoords = {x:0, y:0};

  // mouse event, calculates how far in the img the cursor is so the img doesn't "jump" to the cursor 
  if (event.type === 'mousedown') {
    initialCoords.x = event.clientX - this.offsetLeft;
    initialCoords.y = event.clientY - this.offsetTop;
  }
  // same but for touch event
  else if (event.type === 'touchstart') {
    initialCoords[0] = event.touches[0].clientX - this.offsetLeft;
    initialCoords[1] = event.touches[0].clientY - this.offsetTop;
  }
  console.log( "current: " + this + ", initialCoords: " + initialCoords)
  return { active: true, currentElement: this, initialCoords };
};

function move(active, currentElement, x, y) {
  if (active && currentElement) {
    this.preventDefault();
    
    // difference between mouse (x,y) and the cursor offset relative to the element's top corner
    // let currentX = this.clientX - initialCoords.x; 
    // let currentY = this.clientY - initialCoords.y;
    const newX = this.clientX - x;
    const newY = this.clientY - y;
    console.log("mouse x and y inside: " + this.clientX + ", " + this.clientY);
    console.log("coords inside: " + x + " " + y);
    return [newX, newY];
  }
}

function dragStop(currentElement) {
  if(currentElement != null) {
    console.log("current element not nyll: " + currentElement);
    if(imageIsOnCanvas(currentElement, canvas)){
     canvasImages.add(currentElement);

      } else {
     canvasImages.delete(currentElement);

   }
    
 }
 let resetCoords = {x:0, y:0};
 return { active: false, currentElement: null, initialCoords: resetCoords } ;

}

function moveToCanvas(event) {
  console.log("dbl clicked");
  if (event.target.tagName === 'IMG') {
    event.preventDefault();

    const midCanvasX = canvas.getBoundingClientRect().left + 
                       canvas.offsetWidth / 2;
    const midCanvasY = canvas.getBoundingClientRect().top +
                       canvas.offsetHeight / 2;

    const midImgX = this.getBoundingClientRect().left +
                 this.offsetWidth / 2;
    const midImgY = this.getBoundingClientRect().top + 
                 this.offsetHeight / 2;

    const newX = midCanvasX - midImgX;
    const newY = midCanvasY - midImgY;

    this.style.left =  newX + 'px';
    this.style.top = newY + 'px';

    if(imageIsOnCanvas(this, canvas)) {
      canvasImages.add(this);
    }
  }

}

function setDraggableEventListeners() {
  const draggables = document.getElementsByClassName('draggable');

  let dragged = {
    active: false,
    currentElement: null,
    initialCoords: {x: 0, y: 0}
  }

for (let i = 0; i < draggables.length; i++) {
  draggables[i].addEventListener('mousedown', function(event) {
    dragged = dragStart.call(draggables[i], event);
    console.log("start: " + dragged.active, dragged.currentElement, dragged.initialCoords); 
  });

  draggables[i].addEventListener('dblclick', function(event) {
    moveToCanvas.call(draggables[i], event);
  });
}

// triggers no matter where mouse is clicked
document.addEventListener('mouseup', function(event) {
  dragged = dragStop.call(event, dragged.currentElement);
  console.log("drag stopped: " + dragged.active, dragged.currentElement, dragged.initialCoords);
});

// triggers if mouse is down and on an element (ie. currentElement != null)
document.addEventListener('mousemove', function(event) {
  if(dragged.currentElement){
    let newPos = [];
    console.log("current element: " + dragged.currentElement);
    console.log(dragged.initialCoords.x, dragged.initialCoords.y);
    newPos = move.call(event, dragged.active, dragged.currentElement, dragged.initialCoords.x, dragged.initialCoords.y);
    console.log("newPos: " + newPos[0] + newPos[1]);
    dragged.currentElement.style.left = newPos[0] + 'px';
    dragged.currentElement.style.top = newPos[1] + 'px';
    console.log("x:" + dragged.currentElement.style.left);
    console.log("y:" + dragged.currentElement.style.top);
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
scaleWrappedImages(1 / factor);