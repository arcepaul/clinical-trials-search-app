import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Fieldset, TextInput } from '../../atomic';
import {useZipConversion} from '../../../hooks';

const ZipCode = ({ handleUpdate }) => {
  const { zip } = useSelector(store => store.form);
  const [errorMsg, setErrorMsg] = useState('');
  const [inputtedZip, setInputtedZip] = useState('');
  const [{ getZipCoords }] = useZipConversion(handleUpdate);

  useEffect(() => {
    if(inputtedZip !== ''){
      getZipCoords(inputtedZip);
    }
  }, [inputtedZip]);

  const handleZipUpdate = e => {
    const zipInput = e.target.value;
    handleUpdate('hasInvalidZip', false);
    
    if(zipInput.length === 5){
      // test that all characters are numbers
      if(/^[0-9]+$/.test(zipInput)){
        setErrorMsg('');
        setInputtedZip(zipInput);
        handleUpdate('zip', zipInput);
        handleUpdate('location', 'search-location-zip');
      } else {
        handleUpdate('zip', '');
        setErrorMsg(`Please enter a 5 digit U.S. zip code`);
      }
    }
  };

  return (
    <Fieldset
      id="zip"
      legend="U.S. Zip Code"
      helpUrl="/about-cancer/treatment/clinical-trials/search/help#basicsearch"
    >
      <TextInput
        action={handleZipUpdate}
        id="zip"
        label="zip code"
        labelHidden
        errorMessage={errorMsg}
        inputHelpText="Show trials near this U.S. ZIP code."
        maxLength={5}
        value={zip}
      />
    </Fieldset>
  );
};

export default ZipCode;
