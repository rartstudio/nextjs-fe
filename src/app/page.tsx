import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Link href="/login" className='px-6 py-2 bg-blue-500 text-white rounded-xl'>Login</Link>
    </div>
  )
}
