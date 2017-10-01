import React from 'react';

import * as strings from '../constants/Strings';

const ContactPage = () => {

  return (
    <div>
      <h2>{strings.contactTitle}</h2>
      <section>
        <p>
        	For more info, visit: <a href="changeforabutton.com">changeforabutton.com</a>.
        </p>
      </section>
    </div>
  );

};

export default ContactPage;
