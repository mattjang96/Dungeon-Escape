document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");


     let game = new DEscape(ctx);
    game.renderPreview();
})