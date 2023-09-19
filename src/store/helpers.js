function calculateFactor(placement, design) {
  let placementCentre = frameCenterAbsolute(placement);
  let designCentre = frameCentre(design);
  return {
    distance: {
      left: (designCentre.left - placementCentre.left) / placement.width,
      top: (designCentre.top - placementCentre.top) / placement.height,
    },
    originalSize: {
      width: placement.width,
      height: placement.height,
    },
  };
}

function frameCenterAbsolute(frame) {
  return {
    left: frame.width / 2,
    top: frame.height / 2,
  };
}

function frameCentre(frame) {
  return {
    left: frame.left + frame.width / 2,
    top: frame.top + frame.height / 2,
  };
}

function getUpdatedLayer(placement, design, factor) {
  let placementCentre = frameCenterAbsolute(placement);

  let widthScaleFactor = placement.width / factor.originalSize.width;
  let heightScaleFactor = placement.height / factor.originalSize.height;
  let scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

  let newCentre = {
    left: placement.width * factor.distance.left + placementCentre.left,
    top: placement.height * factor.distance.top + placementCentre.top,
  };
  let newSize = {
    height: design.height * scaleFactor,
    width: design.width * scaleFactor,
  };
  return {
    fill: design.fill,
    left: newCentre.left - newSize.width / 2,
    top: newCentre.top - newSize.height / 2,
    ...newSize,
  };
}

function getRelativeFrame(placementRect, frame) {
  let left = placementRect.left + frame.left;
  let top = placementRect.top + frame.top;

  let relativeFrame = {
    ...frame,
    left,
    top,
  };
  return cutOfExtra(placementRect, relativeFrame);
}

function cutOfExtra(placementRect, frame) {
  let mutableFrame = { ...frame };
  let maxLeft = placementRect.left + placementRect.width;
  let maxTop = placementRect.top + placementRect.height;

  if (frame.left >= maxLeft || frame.top >= maxTop) {
    mutableFrame.weight = 0;
    mutableFrame.height = 0;
    return mutableFrame;
  }

  if (frame.left + frame.width > maxLeft) {
    mutableFrame.width = maxLeft - frame.left;
  }

  if (frame.top + frame.height > maxTop) {
    mutableFrame.height = maxTop - frame.top;
  }

  return mutableFrame;
}

function getFrameInCenterOfFrame(area, size) {
  let left = area.left + (area.width - size.width) / 2;
  let top = area.top + (area.height - size.height) / 2;
  return {
    ...size,
    left,
    top,
  };
}

export {
  calculateFactor,
  getUpdatedLayer,
  getRelativeFrame,
  getFrameInCenterOfFrame,
};
