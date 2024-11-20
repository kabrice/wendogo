'use client';

import React from 'react'; 

const SECheckBox = (props) => {

  const { title, id} = props;

  const formattedTitle = React.createElement('span', { dangerouslySetInnerHTML: { __html: title } });

  return (
    <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
      <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>
          <div className="Stack-child  " style={{ paddingLeft: 0 }}>
          <div className="Checkbox  after field-valid " data-testid="">
              <input type="checkbox" name={id} id={id} tabIndex={7} defaultValue="COORD_COMMERCIAL_VALIDATION" />
              <button type="button" role="checkbox" aria-checked="true" className="Checkbox-tick icon-lesfurets icon-system-check ticked active " />
              <label className="Checkbox-label  active">{title ? formattedTitle : `J'accepte de recevoir des offres personnalisées de lesfurets.`} </label>
              <div className="CguModal-wrapper">
              <div />
              </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default SECheckBox;
