import Image from 'next/image'
import EmailSubscribe from "@/app/email/EmailSubscribe";

export default function Home() {
  return (
    <main>
      <h1 className="text-green text-center mt-40">FUMBIES</h1>
      <Image
        src={'/shiba_fumby.png'}
        width={500}
        height={500}
        className={'mx-auto'}
      >
      </Image>

      <div className="flex justify-center">
        <EmailSubscribe/>
      </div>
    </main>
  )
}
