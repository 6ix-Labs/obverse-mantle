import Hero from '../../sections/Hero/Hero'
import Herotext from '../../sections/Hero/Herotext'
import SendScanDone from '../../sections/SendScanDone/SendScanDone'
import BuiltFor from '../../sections/BuiltFor/BuiltFor'
import WhatMakes from '../../sections/WhatMakes/WhatMakes'
import PaymentApp from '../../sections/PaymentApp/PaymentApp'
import ReadyToAccept from '../../sections/ReadyToAccept/ReadyToAccept'
import Testimonials from '../../sections/Testimonials/Testimonials'

// import Built from "@/sections/newSections/Built"
// import Faq from "@/sections/newSections/Faq"
// import Footer from "@/sections/newSections/Footer"
// // import Hero from "@/sections/newSections/Hero"
// import Navbar from "@/sections/newSections/Navbar"
// import { TimelineDemo } from "@/sections/newSections/TimeLineDemo"
// import Main from '../Waitlist/waitlist'

const Home = () => {
  return (
    <section>
      <Hero />
      <Herotext />
      <SendScanDone />
      <BuiltFor />
      <WhatMakes />
      <PaymentApp />
      <Testimonials />
      <ReadyToAccept /> 
      {/* <Navbar />
      {/* <Hero /> */}
      {/* <Built /> */}
      {/* <TimelineDemo /> */}
      {/* <Faq /> */}
      {/* <Footer /> */}
      {/* <Main/> */}
    </section>
  )
}

export default Home
