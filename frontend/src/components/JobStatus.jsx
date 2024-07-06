import React from 'react'

const JobStatus = ({status}) => {
  return (
    <div>
        {status === "applied" ? <>Applied 🟡</> : null}
        {status === "accepted" ? <>Selected 🟢</> : null}
        {status === "rejected" ? <>Rejected 🔴</> : null}
    </div>
  )
}

export default JobStatus