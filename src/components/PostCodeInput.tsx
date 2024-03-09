import React from 'react';

const PostcodeInput = () => {
  return (
    <div className="input-box input-postcode">
      <label htmlFor="billing:postcode" className="pointer-hover">
        Postnummer <span className="required">*</span>
      </label>
      <input
        type="number"
        title="Postnummer"
        name="billing[postcode]"
        id="billing:postcode"
        value=""
        className="validate-zip-international required-entry input-text"
      />
    </div>
  );
};

export default PostcodeInput;
