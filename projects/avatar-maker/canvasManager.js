import { canvasImages  } from "./draggable.js";

function calculateOffset(rect){


}
function saveCanvas() {
    if(canvasImages.size < 1) {
        alert("Nothing on canvas!");
        return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white"; // Set background color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ;
    for(let img of canvasImages) {
        // const x = img.style.left;
        // const y = img.style.top;
        const x = img.getBoundingClientRect().left;
        const y = img.getBoundingClientRect().top;
        const canvasX = document.getElementById('canvas').getBoundingClientRect().left;
        const canvasY = document.getElementById('canvas').getBoundingClientRect().top;
        // const x = img.offsetLeft;
        // const y = img.offsetTop;
        // console.log('x in draw: ' + x + ', y in draw: ' + y);
        ctx.drawImage(img, x - canvasX, y - canvasY, img.naturalWidth, img.naturalHeight);
    }

// Convert canvas to image and download
  const link = document.createElement("a");
  link.download = "custom_layout.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

const button = document.createElement("button");
button.textContent = "Save as Image";
button.onclick = saveCanvas;
document.getElementById('maker').appendChild(button);