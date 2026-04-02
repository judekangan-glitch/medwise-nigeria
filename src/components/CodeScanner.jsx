import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

export default function CodeScanner({ onScan, onError, onClose }) {
  const scannerRef = useRef(null)

  useEffect(() => {
    // Only initialize the scanner once
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 }, 
          rememberLastUsedCamera: true,
          supportedScanTypes: [] // empty means all formats supported
        },
        false // verbose flag
      )
      
      scanner.render(
        (decodedText) => {
          // On successful scan, clear the scanner to free up the camera
          scanner.clear().then(() => {
            if (onScan) onScan(decodedText)
          }).catch(console.error)
        },
        (error) => {
          if (onError) onError(error)
        }
      )
      
      scannerRef.current = scanner
    }

    // Cleanup function when component unmounts normally
    return () => {
      if (scannerRef.current) {
        // html5-qrcode's clear() is async, so we catch potential unmount errors
        scannerRef.current.clear().catch(e => console.log('Scanner cleanup:', e))
        scannerRef.current = null
      }
    }
  }, [onScan, onError])

  return (
    <div className="bg-blue-50 p-6 rounded-xl border-2 border-primary border-dashed relative w-full mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-primary">Camera Active</h3>
        <button 
          onClick={onClose}
          className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-4 py-2 rounded-lg transition-colors"
        >
          Close Camera
        </button>
      </div>
      
      {/* Container for the actual scanner video feed */}
      <div id="reader" className="w-full bg-black rounded-lg overflow-hidden shadow-inner"></div>
      
      <p className="text-center text-sm font-semibold text-primary-dark mt-4">
        Hold your phone steady and point the camera at any NAFDAC barcode or QR code.
      </p>
    </div>
  )
}
