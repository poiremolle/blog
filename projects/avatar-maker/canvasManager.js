import { canvasImages  } from "./draggable.js";
import { factor } from "./draggable.js";

function calculateOffset(rect){


}
function saveCanvas() {
    if(canvasImages.size < 1) {
        alert("Nothing on canvas!");
        return;
    }

    const canvas = document.createElement("canvas");
    const screenCanvasWidth = document.getElementById('canvas').offsetWidth;
    const screenCanvasHeight = document.getElementById('canvas').offsetHeight;

    canvas.width = screenCanvasWidth * factor;
    canvas.height = screenCanvasHeight * factor;
    
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let img of canvasImages) {
        const x = img.getBoundingClientRect().left;
        const y = img.getBoundingClientRect().top;
        const canvasX = document.getElementById('canvas').getBoundingClientRect().left;
        const canvasY = document.getElementById('canvas').getBoundingClientRect().top;

        ctx.drawImage(img, (x - canvasX) * factor, (y - canvasY) * factor, img.naturalWidth, img.naturalHeight);
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
button.setAttribute("style", "width: 250px; height: 100px; background-color:$brand-color");
button.classList.add("post-content");
document.getElementById('canvas').insertAdjacentElement("afterend", button);