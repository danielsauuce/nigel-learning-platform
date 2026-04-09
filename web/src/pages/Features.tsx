import React from 'react'
import { FeaturesHero } from '../components/ui/FeaturesHero'
import { AppShowcase } from '../components/ui/AppShowcase'
import { FeaturesGrid } from '../components/ui/FeaturesGrid'
import { DetailedFeaturesGrid } from '../components/ui/DetailedFeaturesGrid'
import { DownloadCTA } from '../components/ui/DownloadCTA'

export const Features: React.FC = () => (
  <>
    <FeaturesHero />
    <AppShowcase />
    <FeaturesGrid />
    <DetailedFeaturesGrid />
    <DownloadCTA />
  </>
)
