import React from 'react'
import {useNavigate} from 'react-router-dom'
const PostedJob = ({ id, title, salary, description, location }) => {
    const navigate = useNavigate()
    const handleViewApplicants = () => { 
        navigate(`/job/applicants/${id}`)
    }
    {
        if (!title) {
            return null
        }
        return (
      
            <div className="max-w-screen mx-auto bg-white shadow-lg rounded-lg p-4 mt-10 cursor-pointer" onClick={handleViewApplicants} >
        
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{title}</h2>
                   
                </div>
                <div className="flex items-center mt-2 text-gray-600">
              
                    <span className="mr-4">💰 {salary}</span>
                    <span>🚩 {location}</span>
                </div>
                <p className="mt-2 text-gray-800">
                    {description}
                </p>
              
            </div>
        )
    }
}

export default PostedJob;