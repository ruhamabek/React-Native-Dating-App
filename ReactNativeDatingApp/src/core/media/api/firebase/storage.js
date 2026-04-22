import { Platform } from 'react-native'
import storage from '@react-native-firebase/storage'
import { processMediaFile } from '../../mediaProcessor'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

const uploadFile = async file => {
  const uri = file?.path || file?.uri
 
  if (!uri) {
    console.log('No uri found for file upload')
    return null
  }

  const fallbackName = Platform.select({
    native: uri.substring(uri?.lastIndexOf('/') + 1),
    default: 'webdefaultbase24',
  })

  const fileName = file?.name ?? file?.fileName ?? fallbackName
  const ext = fileName.split('.').pop() || 'jpg'
  const storagePath = `uploads/${uuid()}.${ext}`

  console.log('raw file object', file)

  try {
    const reference = storage().ref(storagePath)

    // Upload the file
    await reference.putFile(uri.replace('file://', ''))

     const downloadURL = await reference.getDownloadURL()

    console.log('json datt', { downloadURL })
    return downloadURL
  } catch (error) {
    console.log('error uploading file via Firebase Storage SDK', error)
    return null
  }
}

const processAndUploadMediaFile = file => {
  return new Promise((resolve, _reject) => {
    processMediaFile(file, ({ processedUri, thumbnail }) => {
      uploadFile(file)
        .then(downloadURL => {
          if (thumbnail) {
            uploadFile(thumbnail)
              .then(thumbnailURL => {
                resolve({ downloadURL, thumbnailURL })
              })
              .catch(e => resolve({ error: 'photoUploadFailed' }))

            return
          }
          resolve({ downloadURL })
        })
        .catch(e => resolve({ error: 'photoUploadFailed' }))
    })
  })
}

const uploadMedia = async mediaAsset => {
  try {
    const response = await processAndUploadMediaFile(mediaAsset)
    return {
      ...mediaAsset,
      downloadURL: response.downloadURL,
      thumbnailURL: response.thumbnailURL ?? response.downloadURL,
    }
  } catch (error) {
    console.log('error uploading media', error)
    return null
  }
}

const firebaseStorage = {
  processAndUploadMediaFile,
  uploadMedia,
}

export default firebaseStorage