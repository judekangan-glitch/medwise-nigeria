
import { useState } from 'react'
import { Search, AlertTriangle, CheckCircle, Camera, FileText } from 'lucide-react'
import FakeDrugAlerts from '../components/FakeDrugAlerts'
import { verifyNafdac } from '../utils/verifyNafdac'

export default function Verify() {
  const [nafdacCode, setNafdacCode] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)


  const handleVerify = (e) => {
    e.preventDefault()
    setIsVerifying(true)

    setTimeout(() => {
      const found = verifyNafdac(nafdacCode)
      if (found) {
        setVerificationResult({
          status: 'verified',
          name: found.name,
          nafdacNumber: found.nrn,
          manufacturer: found.manufacturer || 'N/A',
          expiryCheck: 'Check expiry date on package'
        })
      } else {
        setVerificationResult({
          status: 'not_found',
          warning: 'NAFDAC number not found in database. This could indicate a counterfeit product.'
        })
      }
      setIsVerifying(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-gray-900">
            Verify Your Medication
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Check NAFDAC registration numbers to help identify counterfeit medications
          </p>
          <div className="mt-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
              <strong>Currently verifying:</strong> 10,076 NAFDAC-registered drugs
            </span>
            <p className="text-xs text-gray-500 mt-2 max-w-xl mx-auto">
              <strong>Note:</strong> This tool does <u>not</u> cover every drug registered by NAFDAC. The limitation is due to lack of access to the official NAFDAC API. Only drugs for which we could obtain public data are included.
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="text-red-600 mr-3 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                30-40% of Medications in Nigerian Markets Are Counterfeit
              </h3>
              <p className="text-gray-700">
                Fake medications contain no active ingredients or harmful substances. Verification before consumption can save lives.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Form */}
        <div className="card mb-8">
          <h2 className="font-bold text-2xl mb-6 text-gray-900">
            Check NAFDAC Registration Number
          </h2>

          <form onSubmit={handleVerify} className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Enter NAFDAC Number (e.g., A7-1234)
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={nafdacCode}
                  onChange={(e) => setNafdacCode(e.target.value.toUpperCase())}
                  placeholder="A7-XXXX"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isVerifying || !nafdacCode}
                  className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? (
                    'Verifying...'
                  ) : (
                    <>
                      <Search size={20} className="inline mr-2" />
                      Verify
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Find the NAFDAC number on your medication package
              </p>
            </div>
          </form>

          {/* Verification Result */}
          {verificationResult && (
            <div className={`p-6 rounded-xl ${
              verificationResult.status === 'verified'
                ? 'bg-green-50 border-2 border-green-500'
                : 'bg-red-50 border-2 border-red-500'
            }`}>
              <div className="flex items-start mb-4">
                {verificationResult.status === 'verified' ? (
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={32} />
                ) : (
                  <AlertTriangle className="text-red-600 mr-3 flex-shrink-0" size={32} />
                )}
                <div>
                  <h3 className={`font-bold text-xl mb-2 ${
                    verificationResult.status === 'verified'
                      ? 'text-green-900'
                      : 'text-red-900'
                  }`}>
                    {verificationResult.status === 'verified'
                      ? 'Medication Verified ✓'
                      : 'Verification Failed'}
                  </h3>
                  
                  {verificationResult.status === 'verified' ? (
                    <>
                      <p className="text-gray-700 mb-2">
                        <strong>Product:</strong> {verificationResult.name}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Manufacturer:</strong> {verificationResult.manufacturer}
                      </p>
                      <p className="text-gray-700 mb-4">
                        <strong>NAFDAC Number:</strong> {verificationResult.nafdacNumber}
                      </p>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Important:</strong> {verificationResult.expiryCheck}. Ensure the packaging is intact and matches the product description.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-red-800 font-semibold mb-2">
                        {verificationResult.warning}
                      </p>
                      <p className="text-gray-700 text-sm">
                        Do NOT consume this medication. Report to NAFDAC and the pharmacy where you purchased it.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* How to Find NAFDAC Number */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <Camera size={32} className="text-primary mb-4" />
            <h3 className="font-bold text-xl mb-3 text-gray-900">
              Where to Find NAFDAC Number
            </h3>
            <p className="text-gray-700 mb-3">
              Look for the NAFDAC registration number on the medication package. It typically starts with a letter followed by numbers (e.g., A7-1234).
            </p>
            <p className="text-sm text-gray-600">
              Found on: Product label, packaging box, or insert leaflet
            </p>
          </div>

          <div className="card">
            <FileText size={32} className="text-primary mb-4" />
            <h3 className="font-bold text-xl mb-3 text-gray-900">
              Additional Verification Tips
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Check for spelling errors on packaging</li>
              <li>• Verify the expiry date is legible and valid</li>
              <li>• Ensure packaging is professionally printed</li>
              <li>• Buy from licensed pharmacies only</li>
            </ul>
          </div>
        </div>

        {/* Community Reporting */}
        <div className="card bg-blue-50">
          <h3 className="font-bold text-xl mb-4 text-gray-900">
            Report Suspected Counterfeit Medications
          </h3>
          <p className="text-gray-700 mb-4">
            If you suspect you've purchased a counterfeit medication:
          </p>
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>• Do not consume the medication</li>
            <li>• Keep the packaging and receipt</li>
            <li>• Report to NAFDAC immediately</li>
            <li>• Report to the pharmacy where purchased</li>
            <li>• Warn others in your community</li>
          </ul>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>NAFDAC Hotline:</strong> 0800-NAFDAC (0800-623-322) <br />
              <strong>SMS:</strong> 20000 (Free from all networks)
            </p>
          </div>
        </div>

        {/* Fake Drug Alerts Gallery */}
        <FakeDrugAlerts />

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This verification tool uses a limited database of 10,076 drugs. For official and complete verification, contact NAFDAC directly or visit a licensed pharmacy. We do not have access to the full NAFDAC registry or API.
          </p>
        </div>
      </div>
    </div>
  )
}

