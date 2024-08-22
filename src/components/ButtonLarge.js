function ButtonLarge(props) {

  const {name, handleContinue, notStandard } = props;

  return (

    <button onClick={() => handleContinue()} 
            style={notStandard ? {width: '65.3%', margin: 0} : {}}
            className="CTA button primary xlarge userValidation" title="" data-trackingprefix="" data-testid="DaisyFieldView-continuer-VEH_DTL_POSSESSION"> {name} </button>
  );
}

export default ButtonLarge;
