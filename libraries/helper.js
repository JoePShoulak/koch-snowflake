function rotatePoint(cx, cy, x, y, radians) {
  var cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

function rotateLine(x1, y1, x2, y2, xR, yR, angle) {
  const nP1 = rotatePoint(xR, yR, x1, y1, angle);
  const nP2 = rotatePoint(xR, yR, x2, y2, angle);

  return [...nP1, ...nP2];
}
