import React from 'react'
import {useNavigate} from 'react-router-dom'

const Job = ({ id, title, salary, location, description }) => {
  const navigate = useNavigate()
  const handleJobClick = (id) => {
    navigate(`/job/${id}`)
  }
  {if (!title){
    return null
  }
  }

    return (
      <div className="max-w-screen mx-auto bg-white shadow-lg rounded-lg p-4 mt-10 cursor-pointer" onClick={()=>handleJobClick(id)}>
        
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{title}</h2>
            {/* <div className="text-yellow-500 flex items-center">
              <span className="mr-1">⭐</span>
              <span>{company?.rating}</span>
              <span className="text-gray-500 ml-1">({company?.reviews})</span>
            </div> */}
          </div>
          <div className="flex items-center mt-2 text-gray-600">
            {/* <span className="mr-4">📅 {experience}</span> */}
            <span className="mr-4">💰 {salary}</span>
                <span>🚩 {location}</span>
          </div>
          <p className="mt-2 text-gray-800">
                { description}
          </p>
            {/* <div className="mt-2 text-blue-500 flex flex-wrap">
                {skills?.map((skill,index) => (
                    <span key={index} className="mr-2 mb-2">{skill}</span>
                ))}
  
          </div> */}
          {/* <div className="flex justify-between items-center mt-4 text-gray-500">
            <span>{posted}</span>
          </div> */}
        </div>
      );
}

export default Job