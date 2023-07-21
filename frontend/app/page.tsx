import Image from 'next/image'
import EmailSubscribe from "@/app/email/EmailSubscribe";

export default function Home() {
  return (
    <main>
      <h1 className="text-dark text-8xl font-bubble text-center mt-40">FUMBIES</h1>
      <h2 className={"text-secondary text-3xl mt-2 text-center font-bubble"}>A playground for your imagination</h2>
      <Image
        src={'/shiba_fumby.png'}
        width={500}
        height={500}
        className={'mx-auto'}
       alt={'cute cuddly fumby'}>
      </Image>

      <div className="flex justify-center">
        <EmailSubscribe/>
      </div>
    </main>
  )
}
