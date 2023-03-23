"use client"
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let result = await fetch(`http://localhost:4002/api/auth/login`,{
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
    .then((data: {data : {accessToken: string, refreshToken: string}}) => {
      console.log("Success:", data.data.accessToken);
      localStorage.setItem('myToken',data.data.accessToken);
    })
  }

  return <>
    <section className="h-screen flex items-center justify-center">
      <form className="shadow-lg p-10 rounded-xl">
        <h1 className="text-2xl text-center mb-8">Login Form</h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="mb-2">Username</label>
          <input id="username" type="text" className="px-4 py-2 border rounded-lg" placeholder="Username" value={form.username} 
            onChange={(e) => {setForm({...form, username: e.target.value})}}/>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-2">Password</label>
          <input id="password" type="password" className="px-4 py-2 border rounded-lg" placeholder="Password" value={form.password}
          onChange={(e) => {setForm({...form, password: e.target.value})}}/>
        </div>
        <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white px-4 py-2 w-full text-center rounded-lg">Login</button>
      </form>
    </section>
  </>
}