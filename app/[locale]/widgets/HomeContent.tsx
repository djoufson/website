import React from 'react'
import HeroSection from './HeroSection'
import ActivitySection from './ActivitySection'
import ExperienceSection from './ExperienceSection'
import FeaturedProjectsSection from './FeaturedProjectsSection'
import LatestPostsSection from './LatestPostsSection'
import CommunityTeaser from './CommunityTeaser'

export default function HomeContent() {
  return (
    <div>
      <HeroSection/>
      <ActivitySection/>
      <ExperienceSection/>
      <FeaturedProjectsSection/>
      <LatestPostsSection/>
      <CommunityTeaser/>
    </div>
  )
}
