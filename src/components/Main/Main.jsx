import React from 'react';
import './Main.css';

import Promo from '../Promo/Promo';
import SectionFrame from '../SectionFrame/SectionFrame';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  return (
    <>
      <Promo></Promo>

      <SectionFrame
        content={<AboutProject></AboutProject>}
        title={'About project'}
        sectionName={'about-project'}
      >
      </SectionFrame>

      <SectionFrame
        content={<Techs></Techs>}
        title={'Technologies'}
        sectionName={'techs'}
      >
      </SectionFrame>

      <SectionFrame
        content={<AboutMe></AboutMe>}
        title={'About me'}
        sectionName={'about-me'}
      >
      </SectionFrame>

    </>
  );
}

export default Main;