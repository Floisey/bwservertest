// Example: integrate into the Bonzi rendering routine (adapt variable names/coordinates to your renderer)
function drawBonzi(ctx, x, y, scale, userPublic) {
  // ... existing avatar drawing logic here ...

  // Draw hat if present
  if (userPublic && userPublic.hat) {
    if (!drawBonzi.hatImages) drawBonzi.hatImages = {};
    var hatName = userPublic.hat;
    var hatImg = drawBonzi.hatImages[hatName];

    if (!hatImg) {
      hatImg = new Image();
      // Hat files live at ./img/hat/<name>.webp
      hatImg.src = './img/hat/' + hatName + '.webp';
      drawBonzi.hatImages[hatName] = hatImg;
      // Note: you may want to handle onload to redraw when image finishes loading.
    }

    // Example offsets & size (tune these to the avatar art/scale).
    // If your Bonzi is drawn in a 100x100 box, a typical hat could be:
    var hatW = 60 * scale;
    var hatH = 40 * scale;
    var hatX = x + (20 * scale);   // offset from avatar left
    var hatY = y - (10 * scale);   // slightly above avatar head

    if (hatImg.complete) {
      ctx.drawImage(hatImg, hatX, hatY, hatW, hatH);
    } else {
      // optional: redraw after image loads
      hatImg.onload = function() {
        try { ctx.drawImage(hatImg, hatX, hatY, hatW, hatH); } catch (e) {}
      };
    }
  }
}
