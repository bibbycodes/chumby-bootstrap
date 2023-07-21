'use client';
import {FormEvent, useState} from "react";
import useEmailSubscribe from "@/app/hooks/useEmailSubcribe";
import colors from "../../public/colors"

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
    <form onSubmit={handleSubscription} className={'mx-auto'}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        id={'subscribe'}
        className={'w-60 h-16 text-grassGreen border-0 text-2xl px-3 py-2 border font-bubble::placeholder rounded-l-full text-black'}
        style={{
          fontFamily: 'bubble',
          '::placeholder': {
            fontFamily: 'bubble',
          },
        }}
      />
      <button type="submit" className={'ml-0 border-0 rounded-l-none text-2xl h-16 font-bubble px-6 py-2 rounded-r-full bg-grassGreen text-white'}>Go!</button>
    </form>
  </>
}
