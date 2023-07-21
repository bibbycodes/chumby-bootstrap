import Image from 'next/image'

export default function Home() {
  return (
    <main className={'bg-white mt-36'}>
      <h1 className="text-green text-center mt-40">FUMBIES</h1>
      <Image 
        src={'/shiba_fumby.png'}
        width={500}
        height={500}
        className={'mx-auto'}
      >
      </Image>
    </main>
  )
}
