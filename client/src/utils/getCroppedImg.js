const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height

      ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height)

      resolve(canvas.toDataURL())
    }
    image.onerror = (error) => {
      reject(error)
    }
  })
}

export default getCroppedImg
