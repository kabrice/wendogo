import ButtonLarge from "../ButtonLarge";

function SESelectionList(props){
    const {title, items, itemSelected, handleItemSelection, handleContinue, showContinueBtn} = props;

  return (
    <div id="VEH_DTL_POSSESSION-wrapper" className="FieldWrapper RadioField VEH_DTL_POSSESSION field-valid  fade-animation fade-slow-enter-done">
        <div className="FieldView DaisyFieldView undefined field-valid RadioField VEH_DTL_POSSESSION ">
                <div className="FieldView-flex-container">
                    <label className="Label ">{title}</label>
                </div>
                <div className="DrawerAnimation" style={{ height: 0 }}/>
                <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                    <div className="ButtonField flex-direction-column">

                        {items.map((item) => {
                            
                            return  <div key={item.id} className="ButtonField-Block button-field-false-VEH_DTL_POSSESSION app-col-xs-12 app-col-sm-8 app-col-md-8" onClick={()=>handleItemSelection(item)}>
                                        {/* <input type="radio" id="VEH_DTL_POSSESSION_false" name="VEH_DTL_POSSESSION" className="checkbox-field" tabIndex={3} defaultValue="false" style={{ display: "none" }} /> */}
                                        <div className={"Button ButtonField-Block-Button ButtonField-value-false noIcon field-valid "+(item.id === itemSelected ? "isActive" : "") } tabIndex={0}>
                                        <label className="Button-label" htmlFor="VEH_DTL_POSSESSION_false"> {item.name} </label>
                                        {!(item.id === itemSelected) && <div className="radio-tick icon-lesfurets " />}
                                        {(item.id === itemSelected) && <div className="radio-tick icon-lesfurets icon-system-check">
                                                            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12.098 20.161a1.5 1.5 0 00-2.196 2.045l4.953 5.316a1.5 1.5 0 002.176.02l13.048-13.5a1.5 1.5 0 00-2.158-2.084L15.972 24.32l-3.874-4.16z" fillRule="evenodd" fill='#ffffff'></path></svg>
                                                        </div>}
                                        </div>
                                    </div>
                            
                        })}
                    </div>
                </div>

                {showContinueBtn && <ButtonLarge name="Continuer" handleContinue={handleContinue} />}
        </div>

    </div>
  );
}

export default SESelectionList;
