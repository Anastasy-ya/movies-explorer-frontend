import React from 'react';
import './Main.css';

import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import SectionFrame from '../SectionFrame/SectionFrame';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  return (
    <>
      <Promo></Promo>
      <NavTab></NavTab>

      <SectionFrame
        content={<AboutProject></AboutProject>}
        title={'О проекте'}
        sectionName={'about-project'}
      >
      </SectionFrame>

      <SectionFrame
        content={<Techs></Techs>}
        title={'Технологии'}
        sectionName={'techs'}
      >
      </SectionFrame>

      <SectionFrame
        content={<AboutMe></AboutMe>}
        title={'Студент'}
        sectionName={'about-me'}
      >
      </SectionFrame>
      
    </>
  );
}

export default Main;