import React, { useState } from 'react'
import { createResumeAnalyze } from '../services/upload'

function Upload() {
  const [selectFile, setSelectFile] = useState(null)
  const [job_description, setJobDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectFile) {
      alert("Please upload a resume file.")
      return
    }

    setLoading(true)
    try {
      const res = await createResumeAnalyze(selectFile, job_description)
      setFeedback(res.data.feedback)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFeedback(null)
    setSelectFile(null)
    setJobDescription("")
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      
      {/* Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center z-50">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-blue-700 text-sm font-semibold tracking-wide">Analyzing your resume...</p>
        </div>
      )}

      <div className={`w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 space-y-6 transition-all duration-300 ${loading ? 'blur-sm' : ''}`}>
        <h2 className="text-3xl font-bold text-gray-800 text-center">🤖 AI Resume Analyzer</h2>

        {!feedback ? (
          <form onSubmit={handleUpload} className="space-y-6 animate-fade-in">
            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                Upload your Resume <span className="text-red-500">*</span>
              </label>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setSelectFile(e.target.files[0])}
              />
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="jobdesc" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea
                id="jobdesc"
                rows="4"
                placeholder="Paste the job description here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={job_description}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-green-600">✅ Analysis Complete</h3>
              <button
                onClick={resetForm}
                className="text-sm text-gray-500 hover:text-red-600 border px-2 py-1 rounded-md border-gray-300 hover:border-red-500"
              >
                Close
              </button>
            </div>

            {/* Feedback Sections */}
            <div className="grid gap-4 md:grid-cols-1">
              {feedback.strengths?.length > 0 && (
                <div className="bg-green-50 border border-green-300 rounded-xl p-4 shadow-md">
                  <h4 className="text-lg font-bold text-green-700 mb-2">💪 Strengths</h4>
                  <ul className="space-y-2 pl-4 list-disc text-sm text-green-800">
                    {feedback.strengths.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback.weaknesses?.length > 0 && (
                <div className="bg-red-50 border border-red-300 rounded-xl p-4 shadow-md">
                  <h4 className="text-lg font-bold text-red-700 mb-2">⚠️ Weaknesses</h4>
                  <ul className="space-y-2 pl-4 list-disc text-sm text-red-800">
                    {feedback.weaknesses.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback.improvements?.length > 0 && (
                <div className="bg-purple-50 border border-purple-300 rounded-xl p-4 shadow-md">
                  <h4 className="text-lg font-bold text-purple-700 mb-2">📈 Improvements</h4>
                  <ul className="space-y-2 pl-4 list-disc text-sm text-purple-800">
                    {feedback.improvements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Another Upload */}
            <button
              onClick={resetForm}
              className="mt-6 w-full bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition"
            >
              Upload Another Resume
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Upload
