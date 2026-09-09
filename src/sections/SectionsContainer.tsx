import { SECTIONS } from '../config/sections';

export default function SectionsContainer() {
  const mapAllSections = () => {
    return SECTIONS.map((section) =>
      section.component ? (
        <section.component
          screenName={section.screen_name}
          key={section.screen_name}
          id={section.screen_name}
        />
      ) : (
        <div key={section.screen_name}></div>
      )
    );
  };

  return <main>{mapAllSections()}</main>;
}