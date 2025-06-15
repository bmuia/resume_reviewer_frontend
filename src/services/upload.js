import axios from "axios"
export const createResumeAnalyze = async (file, job_description) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('job_description', job_description)

  try {
    const res = await axios.post('https://resume-reviewer-backend-lp2u.onrender.com/api/resume-review/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res
  } catch (error) {
    console.error(error)
    throw error  // So the calling component (Upload.jsx) can handle it too
  }
}
