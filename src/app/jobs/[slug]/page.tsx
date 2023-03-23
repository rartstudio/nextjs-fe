'use client'
import {
  useState, useEffect
} from 'react'
import { Job } from '../../../../interfaces/Job';
import Link from 'next/link';

export default function JobDetail({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<Job|null>(null);

  useEffect(()=> {
    fetchJobs();
  })
  const fetchJobs = async () => {
    const myToken = localStorage.getItem('myToken');
    const headers = { 'Authorization': `Bearer ${myToken}`}; 
    const response = await fetch(`http://localhost:4002/api/jobs/${params.slug}`, {
      headers
    })
    .then((response) => response.json())
    .then((data: {data: Job}) => {
      setJob(data.data);
      setError(null);
    })
    .catch((err: Error) => {
      setError(err.message)
      setJob(null);
    })
    .finally(() => setLoading(false));
  }

  return <>
    <div className="bg-blue-700">
      <h1 className="text-2xl text-white p-4"><span className="font-bold">Github</span> Jobs</h1>
    </div>
    <div className='px-4 mt-8'>
      <Link href="/jobs" className='px-4 py-2 bg-blue-300 mt-4'>Back</Link>
    </div>
    <h1 className="text-3xl mt-10 px-4">Job List</h1>
    <div className="grid grid-cols-4 px-4 gap-4">
      {job && 
        <>
          <div className="col-span-8">
            <h6>{job.type}/{job.location}</h6>
            <h1>{job.title}</h1>
            <hr/>
            <div dangerouslySetInnerHTML={{__html: job.description}} />
          </div>
          <div className="col-span-4">
            <h5>How to apply</h5>
            <div><span>apply directly at</span>{job.url}</div>
          </div>
        </>
      }
    </div>
  </>
}