import './HomeBackground.css';
import shapeBg from '../../../assets/shape-bg.svg';

export default function HomeBackground() {
  return (
    <div className='background-container'>
      <div className='background-parent'>
        <img src={shapeBg} alt=''/>
      </div>
    </div>
  )
}