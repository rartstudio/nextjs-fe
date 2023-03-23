'use client'
import {
  useState, useEffect
} from 'react'
import { Job } from '../../../interfaces/Job';
import Link from 'next/link';

export default function Jobs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(()=> {
    fetchJobs();
  })

  const fetchJobs = async () => {
    const myToken = localStorage.getItem('myToken');
    const headers = { 'Authorization': `Bearer ${myToken}`}; 
    const response = await fetch('http://localhost:4002/api/jobs', {
      headers
    })
    .then((response) => response.json())
    .then((data: {data: Job[]}) => {
      setJobs(data.data);
      setError(null);
    })
    .catch((err: Error) => {
      setError(err.message)
      setJobs([]);
    })
    .finally(() => setLoading(false));
  }

  return <>
    <div className="bg-blue-700">
      <h1 className="text-2xl text-white p-4"><span className="font-bold">Github</span> Jobs</h1>
    </div>
    <div className="grid grid-cols-3 gap-4 px-4 mt-4">
      <div className="flex flex-col">
        <label htmlFor="job-description" className="mb-2">Job Description</label>
        <input type="text" className="border border-black px-4 py-2 rounded-lg" id="job-description" placeholder="Filter by Job Description"/>
      </div>
      <div className="flex flex-col">
        <label htmlFor="job-description" className="mb-2">Location</label>
        <input type="text" className="border border-black px-4 py-2 rounded-lg" id="job-description" placeholder="Filter by Location"/>
      </div>
      <div className="flex flex-col self-end">
        <button className="px-4 py-2 bg-blue-500 w-20 text-center text-white rounded-lg">Search</button>
      </div>
    </div>
    <h1 className="text-3xl mt-10 px-4">Job List</h1>
    <div className="grid grid-cols-4 px-4 gap-4">
      {jobs && jobs.map((job: Job) => {
          return (
            <div key={job.id} className='p-4 shadow-lg rounded-lg'>
              <h4 className='text-xl'>{job.title}</h4>
              <h6 className='text-lg'>{job.location}</h6>
              <p>{job.company}</p>
              <p>{job.created_at}</p>
              <Link href={`/jobs/${job.id}`}>Read More</Link>
            </div>
          );
      })}
    </div>
  </>
}