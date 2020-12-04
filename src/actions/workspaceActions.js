export function pan(x, y) {
  return { 
    type: 'PAN_WORKSPACE',
    offset: { x, y },
  }
}

export function zoom(scale) {
  return {
    type: 'ZOOM_WORKSPACE',
    scale,
  }
}