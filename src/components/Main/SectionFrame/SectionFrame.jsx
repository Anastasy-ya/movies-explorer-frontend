import React from 'react';
import './SectionFrame.css';

function SectionFrame({
  content, 
  title,
  sectionName,
}) {

  return (
    <section className={`${sectionName} section-frame`}>
      <div className={`${sectionName}__size-container size-container size-container_type_768mm`}>
        <h2 className="section-frame__title">{title}</h2>
        {content}
        </div>
    </section>
  );
}

export default SectionFrame;