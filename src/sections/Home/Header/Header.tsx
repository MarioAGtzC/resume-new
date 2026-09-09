import { useState, useEffect } from 'react';
import { SECTIONS, GET_SECTION_INDEX, type Section } from '../../../config/sections';
import ScrollService, { type ScreenInView } from '../../../services/ScrollService';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

const DESKTOP_BREAKPOINT = '(min-width: 992px)';

export default function Header() {
  const [selectedScreen, setSelectedScreen] = useState(0);
  const [showHeaderOptions, setShowHeaderOptions] = useState(false);

  const updateCurrentScreen = (currentScreen: ScreenInView) => {
    if (!currentScreen || !currentScreen.screenInView) return;

    let screenIndex = GET_SECTION_INDEX(currentScreen.screenInView);
    if (screenIndex < 0) return;
  };
  let currentScreenSubscription = ScrollService.currentScreenBroadcaster.subscribe(updateCurrentScreen);

  const getHeaderOptions = () => {
    return SECTIONS.map((Screen, i) => (
      <div
        key={Screen.screen_name}
        className={getHeaderOptionsClasses(i)}
        onClick={() => switchScreen(i, Screen)}
      >
        <span>{Screen.screen_name}</span>
      </div>
    ));
  };

  const getHeaderOptionsClasses = (index: number) => {
    let classes = 'header-option ';
    if (index < SECTIONS.length - 1) classes += 'header-option-seperator ';

    if (selectedScreen === index) classes += 'selected-header-option ';

    return classes;
  };

  const switchScreen = (index: number, screen: Section) => {
    let screenComponent = document.getElementById(screen.screen_name);
    if (!screenComponent) return;

    screenComponent.scrollIntoView({ behavior: 'smooth' });
    setSelectedScreen(index);
    setShowHeaderOptions(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setShowHeaderOptions(false);
      }
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showHeaderOptions ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showHeaderOptions]);

  useEffect(() => {
    return () => {
      currentScreenSubscription.unsubscribe();
    };
  }, [currentScreenSubscription]);

  return (
    <header className='header-container'>
      <div className='header-parent'>
        <div className='header-logo'>
          <span>Mario Gutiérrez</span>
        </div>
        <div
          className='header-hamburger'
          onClick={() => setShowHeaderOptions(!showHeaderOptions)}
        >
          <FontAwesomeIcon className='header-hamburger-bars' icon={faBars} />
        </div>
        <nav
          className={
            showHeaderOptions
              ? 'header-options show-hamburger-options'
              : 'header-options'
          }
        >
          {getHeaderOptions()}
        </nav>
      </div>
    </header>
  );
}