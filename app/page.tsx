import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import UserSegments from '@/components/home/UserSegments';
import Testimonials from '@/components/home/Testimonials';
import DownloadApp from '@/components/home/DownloadApp';

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <UserSegments />
      <Testimonials />
      <DownloadApp />
    </div>
  );
}
