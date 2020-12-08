export function cancelLink() {
  return { type: 'CANCEL_LINK' }
}

export function startLink(type, id, x, y) {
  return {
    type: 'START_LINK',
    item: { type, id },
    position: { x, y }
  }
}

export function finishLink(type, id) {
  return {
    type: 'FINISH_LINK',
    item: { type, id }
  }
}
