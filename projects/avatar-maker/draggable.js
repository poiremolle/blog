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
export const factor = 3;

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
    const heading = document.createElement('p');
    heading.className="post-list-heading";
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
  });

  draggables[i].addEventListener('dblclick', function(event) {
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
   
  });
}

// triggers no matter where mouse is clicked
document.addEventListener('mouseup', function() {
  if(currentElement != null) {
     if(imageIsOnCanvas(currentElement, canvas)){
      canvasImages.add(currentElement);

       } else {
      canvasImages.delete(currentElement);

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
scaleWrappedImages(1 / factor);