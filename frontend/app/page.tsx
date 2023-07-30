import Image from 'next/image'
import EmailSubscribe from "@/app/email/EmailSubscribe";
import SlideShow from "@/app/components/SlideShow/SlideShow";
import path from "path";
import React from "react";
import {fumbyLandingPageSlides} from "@/app/components/SlideShow/slides";

export default function Home() {
  return (
    <main className={'mt-2'}>
      <h1 className="text-dark text-8xl font-bubble text-center mt-[10%]">FUMBIES</h1>
      <h2 className={"text-secondary text-3xl mt-2 text-center font-bubble"}>A playground for your imagination</h2>

        <SlideShow
          slides={fumbyLandingPageSlides}
          duration={800}
        />

      <div className="flex justify-center">
        <EmailSubscribe/>
      </div>
    </main>
  )
}
