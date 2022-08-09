const formatBytes = (bytes, decimals = 3) => {
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const addInfoElement = (width, height, type, fileSize) => {
  const div = document.createElement('div')
  const template = `
  <span style='background-color: white; padding: 0.6rem;'>Width: ${width} px | Height: ${height} px | Type: ${
    type.split('/')[1]
  } | File size: ${formatBytes(fileSize)}</span>
  `
  div.innerHTML = template
  document.body.insertBefore(div, document.body.firstChild)
}

if (document.body.childElementCount == 1) {
  const img = document.body.children[0]
  if (img.tagName == 'IMG') {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', img.src, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      const blob = xhr.response
      addInfoElement(img.naturalWidth, img.naturalHeight, blob.type, blob.size)
    }
    xhr.send()
  }
}
