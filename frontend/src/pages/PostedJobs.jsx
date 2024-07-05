import React,{useEffect, useState} from 'react'
import PostedJob from '../components/PostedJob'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
const PostedJobs = () => {
  const [myJobs, setMyJobs] = useState()
  const dispatch = useDispatch()
  useEffect(() => { 
    axios.get("http://localhost:3000/api/job/myjobs").then((response) => {
      setMyJobs(response.data)
    }).catch((error) => {
      if (error.response.status === 401) {
        dispatch(logout())
        return
      }
    });
  }, [])
  return (
    <div className='w-full px-52 mt-16'>
            {myJobs?.length === 0 ? <h1 className='text-2xl font-bold text-center'>No Jobs Posted By You Yet</h1>:myJobs?.map((job) => {
            return <PostedJob key={job._id}
            id = {job._id}
            title={job.title}
            salary={job.salary}
            location={job.location}
            description={job.description}
           />}
            
      )}</div>
  )
}

export default PostedJobs