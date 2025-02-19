export const calculateMD5 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = async (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        resolve(hashHex)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
  })
} 