import React from 'react'
import HeroSection from './HeroSection'
import ExperienceSection from './ExperienceSection'
import FeaturedProjectsSection from './FeaturedProjectsSection'
import LatestPostsSection from './LatestPostsSection'
import CommunityTeaser from './CommunityTeaser'

export default function HomeContent() {
  return (
    <div>
      <HeroSection/>
      <ExperienceSection/>
      <FeaturedProjectsSection/>
      <LatestPostsSection/>
      <CommunityTeaser/>
    </div>
  )
}
