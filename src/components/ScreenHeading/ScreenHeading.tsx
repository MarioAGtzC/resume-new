import './ScreenHeading.css';

interface ScreenHeadingProps {
  title: string;
  subHeading?: string;
}

export default function ScreenHeading({title, subHeading}: ScreenHeadingProps) {
  return (
    <header className='heading-container'>
      <div className='screen-heading'>
        <span>{title}</span>
      </div>
      {subHeading ? (
        <div className='screen-sub-heading'>
          <span>{subHeading}</span>
        </div>
      ) : null}
      <div className='heading-seperator'>
        <div className='seperator-line'></div>
        <div className='seperator-blob'>
          <div></div>
        </div>
      </div>
    </header>
  );
}