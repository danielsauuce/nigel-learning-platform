import { HeroSection } from '../sections/HeroSection'
import { FeaturesSection } from '../sections/FeaturesSection'
import { TeachersSection } from '../sections/TeachersSection'
import { SponsorSection } from '../sections/SponsorSection'
import { CTASection } from '../sections/CTASection'

export const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TeachersSection />
      <SponsorSection />
      <CTASection />
    </>
  )
}
