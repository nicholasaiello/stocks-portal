import React from 'react';

import Strings from '../constants/Strings';

const AboutPage = () => {

  return (
    <div>
      <h2>{Strings.aboutTitle}</h2>
      <section>
        <p>
        	This little app was a good excuse to play around with ReactJS and incorporate Redux.<br/><br/>
        	For more info, visit: <a href="changeforabutton.com">changeforabutton.com</a>.
        </p>
      </section>
    </div>
  );

};

export default AboutPage;
