export function onMouseMove(value) {
    if (value) {
        window.addEventListener("mousemove", this.updateCoords);
    } else {
        window.removeEventListener("mousemove", this.updateCoords);
        window.onmouseup = null;
    }
}
