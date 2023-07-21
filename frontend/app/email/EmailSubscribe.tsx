'use client';
import {FormEvent, useState} from "react";
import useEmailSubscribe from "@/app/hooks/useEmailSubcribe";

export default function EmailSubscribe() {
  const [email, setEmail] = useState('')
  const {subscribeEmail} = useEmailSubscribe()

  const handleSubscription = async (event: FormEvent) => {
    event.preventDefault()
    await subscribeEmail(email)
    alert(`You have subscribed with the email: ${email}`)
    setEmail('')
  }

  return <>
    <form onSubmit={handleSubscription} className={'mx-auto mt-5'}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className={'w-60 px-3 py-2 border rounded-md text-black'}
      />
      <button type="submit" className={'ml-2 px-3 py-2 bg-green-500 text-white rounded-md'}>Subscribe</button>
    </form>
  </>
}
