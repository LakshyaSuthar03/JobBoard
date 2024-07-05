import React,{useState,useEffect} from 'react'
import Job from './Job'
import data from "../../data.json"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
const JobContainer = () => {
  const [jobs, setJobs] = useState()
  const dispatch = useDispatch()
    useEffect(() => { 
      axios.get("http://localhost:3000/api/job/").then((response) => {
      
       
          setJobs(response.data)
      }).catch((error) => {
        if (error.response.status === 401) {
          dispatch(logout())
          return
        }
      });
    }, [])
  return (
      <div className='w-full px-52 mt-16'>
          <Job />
          {jobs?.map((job) => (
              <Job
                    
                    key={job._id}
                    id = {job._id}
                    title={job.title}
                   
                    salary={job.salary}
                    location={job.location}
                    description={job.description}
                    
                    
                />
          ))  }
      </div>
  )
}

export default JobContainer