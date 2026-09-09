import './ScrollToTop.css';
import ScrollService from '../../services/ScrollService';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ScrollToTop() {
  return (
    <div className='scroll-container'>
      <button
        className='btn-scroll'
        onClick={() => ScrollService.scrollHandler.scrollToHome()}
      >
        <FontAwesomeIcon className='icon' icon={faArrowUp} />
      </button>
    </div>
  );
}