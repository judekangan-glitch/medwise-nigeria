import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera, Image, X } from 'lucide-react'
import { lang } from '../utils/translations'

export default function CodeScanner({ onScan, onError, onClose }) {
  const html5QrcodeRef = useRef(null)
  const [error, setError] = useState(null)
  const [started, setStarted] = useState(false)
  const fileInputRef = useRef(null)

  // Start the camera scanner
  const startCamera = async () => {
    setError(null)
    try {
      // Use the lower-level Html5Qrcode directly for full control
      const html5Qrcode = new Html5Qrcode('qr-reader')
      html5QrcodeRef.current = html5Qrcode

      await html5Qrcode.start(
        { facingMode: 'environment' }, // prefer rear camera
        {
          fps: 10,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight)
            const boxSize = Math.floor(minEdge * 0.7)
            return { width: boxSize, height: boxSize }
          },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          stopCamera()
          if (onScan) onScan(decodedText)
        },
        () => {
          // Per-frame errors are intentionally ignored — not every frame has a QR code
        }
      )
      setStarted(true)
    } catch (err) {
      console.error('Camera start error:', err)
      // Friendly user-facing message
      if (err && (err.name === 'NotAllowedError' || String(err).includes('NotAllowed'))) {
        setError('camera_denied')
      } else if (err && (err.name === 'NotFoundError' || String(err).includes('NotFound'))) {
        setError('no_camera')
      } else {
        setError('generic')
      }
    }
  }

  const stopCamera = () => {
    if (html5QrcodeRef.current) {
      html5QrcodeRef.current.stop()
        .catch((e) => console.log('Stop error (safe to ignore):', e))
        .finally(() => {
          html5QrcodeRef.current = null
          setStarted(false)
        })
    }
  }

  // Handle file-based scan fallback (iOS PWA / no camera access)
  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const tempHtml5Qrcode = new Html5Qrcode('qr-file-reader')
    tempHtml5Qrcode
      .scanFile(file, true)
      .then((decodedText) => {
        if (onScan) onScan(decodedText)
      })
      .catch(() => {
        setError('no_qr_in_image')
      })
      .finally(() => {
        tempHtml5Qrcode.clear().catch(() => {})
      })
  }

  // Auto-start camera on mount
  useEffect(() => {
    startCamera()

    return () => {
      stopCamera()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    stopCamera()
    if (onClose) onClose()
  }

  const errorMessages = {
    camera_denied: lang({
      en: 'Camera permission was denied. Please allow camera access in your browser settings, or use the photo upload option below.',
      pidgin: 'You no allow camera. Check your browser settings or upload photo for below.',
      ha: 'An hana izinin kyamara. Da fatan a ba da damar yin amfani da kyamara, ko loda hoto.',
      yo: 'A kọ ìgbàláàyè fún kámẹ̀rà. Jọwọ gba ìgbàláàyè, tàbí gbé fọ́tò rẹ wọlé.',
      ig: 'A jụrụ ikike kamera. Biko nye ikike ma ọ bụ bulite foto gị.',
    }),
    no_camera: lang({
      en: 'No camera found on this device. Please use the photo upload option below.',
      pidgin: 'We no see any camera for this phone/device. Try upload photo for below.',
      ha: 'Ba a sami kyamara a wannan na\'ura ba. Da fatan a loda hoto.',
      yo: 'A kò rí kámẹ̀rà ní ẹ̀rọ yìí. Jọwọ gbé fọ́tò rẹ wọlé.',
      ig: 'Enweghị kamera n\'ngwaọrụ a. Bulite foto.',
    }),
    no_qr_in_image: lang({
      en: 'No barcode or QR code found in the image. Please try another photo.',
      pidgin: 'We no see QR code or barcode for that photo. Try another one.',
      ha: 'Ba a sami barcode ko QR code a cikin hoton ba. Da fatan a gwada wata hoto.',
      yo: 'A kò rí barcode tàbí QR code nínú fọ́tò náà. Jọwọ gbìyànjú fọ́tò mìíràn.',
      ig: 'Achọtabeghị barcode ma ọ bụ QR code na foto a. Nwaa foto ọzọ.',
    }),
    generic: lang({
      en: 'Could not start the camera. Please try the photo upload option below.',
      pidgin: 'Camera no fit start. Try upload photo instead.',
      ha: 'Ba a iya kunna kyamara ba. Da fatan a loda hoto.',
      yo: 'Kámẹ̀rà kò lè bẹ̀rẹ̀. Jọwọ gbé fọ́tò rẹ wọlé.',
      ig: 'Enweghị ike ịmalite kamera. Bulite foto kama ya.',
    }),
  }

  return (
    <div className="bg-blue-50 p-6 rounded-xl border-2 border-primary border-dashed relative w-full mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-primary flex items-center gap-2">
          <Camera size={20} />
          {lang({ en: 'Camera Scanner', pidgin: 'Camera Scan', ha: 'Skan Kyamara', yo: 'Kámẹ̀rà Ṣàyẹ̀wò', ig: 'Kamera Nyocha' })}
        </h3>
        <button
          onClick={handleClose}
          className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
        >
          <X size={16} />
          {lang({ en: 'Close', pidgin: 'Close Am', ha: 'Rufe', yo: 'Tipa', ig: 'Mechie' })}
        </button>
      </div>

      {/* Camera viewfinder — only shown when camera is active */}
      {!error && (
        <>
          <div
            id="qr-reader"
            className="w-full bg-black rounded-lg overflow-hidden shadow-inner"
            style={{ minHeight: '250px' }}
          />
          <p className="text-center text-sm font-semibold text-primary-dark mt-3">
            {lang({
              en: 'Point camera at the NAFDAC barcode or QR code on your medication package.',
              pidgin: 'Point camera go the barcode or QR code wey dey your medicine pack.',
              ha: 'Nuna kyamara zuwa barcode ko QR code da ke kan akwatin maganin.',
              yo: 'Fi kámẹ̀rà sí barcode tàbí QR code tí ó wà ní apoti egbogi rẹ.',
              ig: 'Tụgharịa kamera gaa n\'barcode ma ọ bụ QR code dị na ọpọmọ ọgwụ gị.',
            })}
          </p>
        </>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4 mb-4 text-sm text-yellow-900">
          <p className="font-semibold mb-1">⚠️ {lang({ en: 'Camera issue', pidgin: 'Camera Problem', ha: 'Matsalar Kyamara', yo: 'Ìṣòro Kámẹ̀rà', ig: 'Nsogbu Kamera' })}</p>
          <p>{errorMessages[error]}</p>
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="mx-3 text-sm text-gray-500 font-medium">
          {lang({ en: 'or upload a photo instead', pidgin: 'or upload photo instead', ha: 'ko loda hoto', yo: 'tàbí gbé fọ́tò wọlé', ig: 'ma ọ bụ bulite foto' })}
        </span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* File upload fallback — critical for iOS PWA */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors"
      >
        <Image size={20} />
        {lang({ en: 'Upload Photo of Barcode / QR Code', pidgin: 'Upload Photo of Barcode / QR Code', ha: 'Loda Hoto na Barcode / QR Code', yo: 'Gbé Fọ́tò Barcode / QR Code Wọlé', ig: 'Bulite Foto nke Barcode / QR Code' })}
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileInput}
      />

      {/* Hidden div needed for file-based scan */}
      <div id="qr-file-reader" className="hidden" />
    </div>
  )
}
