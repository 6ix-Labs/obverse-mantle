// import React from 'react'
// import Hero from '../../sections/Hero/Hero'
// import Herotext from '../../sections/Hero/Herotext'
// import SendScanDone from '../../sections/SendScanDone/SendScanDone'
// import BuiltFor from '../../sections/BuiltFor/BuiltFor'
// import WhatMakes from '../../sections/WhatMakes/WhatMakes'
// import PaymentApp from '../../sections/PaymentApp/PaymentApp'
// import ReadyToAccept from '../../sections/ReadyToAccept/ReadyToAccept'
// import Testimonials from '../../sections/Testimonials/Testimonials'
// import Main from '../Waitlist/waitlist'


import Built from "@/sections/newSections/Built"
import Faq from "@/sections/newSections/Faq"
import Footer from "@/sections/newSections/Footer"
import Hero from "@/sections/newSections/Hero"
import Navbar from "@/sections/newSections/Navbar"
import { TimelineDemo } from "@/sections/newSections/TimeLineDemo"



const Home = () => {
  return (
    <section className='flex flex-col space-y-14'>
     <Navbar />
     <Hero />
     <Built />
     <TimelineDemo />
     <Faq />
     <Footer />
      {/* <Hero />
      <Herotext />
      <SendScanDone />
      <BuiltFor />
      <WhatMakes />
      <PaymentApp />
      <Testimonials />
      <ReadyToAccept /> */}
    </section>
    // <Main/>
  )
}

export default Home
