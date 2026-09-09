import type { SectionProps } from '../../config/sections';
import './Home.css';
import HomeBackground from './HomeBackground/HomeBackground';
import Profile from './Profile/Profile';

export default function Home({id}: SectionProps) {
  return (
    <div className='home-container' id={id}>
      <Profile/>
      <HomeBackground/>
    </div>
  )
}