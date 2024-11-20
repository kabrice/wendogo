'use client';

import ButtonLarge from "../ButtonLarge";
import React from "react";
import SvgConstant from "../../utils/SvgConstant";

function SEDropDownList(props) {
    const { title, newRef, collapseOption, items, itemSelected, toggleDropdown, updateSelected, handleContinue, showContinueBtn, tip, showTip, isPartOfInputGroup, inputGroupBlockTitle, svgConstantName } = props;
    
    return (
        <div className="FieldWrapper SelectField VEH_USA_KILOM field-default">
            <div className="FieldView DaisyFieldView  field-default SelectField VEH_USA_KILOM" style={isPartOfInputGroup && {margin: 0}}>
                {!isPartOfInputGroup
                
                && <>
                    <div className="FieldView-flex-container">
                        <label className="Label">{svgConstantName && SvgConstant.getSvg(svgConstantName)} {title}</label>
                    </div>
                    <div className="Tip">
                        {showTip && <div>{tip}</div>}
                    </div>
                </>}
                
                {/* <div className="DrawerAnimation" style={{ height: 0 }}>
                <div />
                </div> */}
                <div className="app-row app-field fade-animation fade-slow-enter-done">
                    <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click" ref={newRef}>
                        <div id="Select-VEH_USA_KILOM" className={"Select undefined isBordered VEH_USA_KILOM icon-lesfurets after icon-system-arrow-more field-" + (itemSelected.validated ? "valid " : "default ") + (collapseOption ? "arrowNotToggled up" : "focused arrowToggled up ") } data-testid="VEH_USA_KILOM">
                            <div className="Select-text" style={{ color: itemSelected.validated ? '#0154c0' : '#4e6174', fontSize: '15px', padding: '0 0 0 30px', margin : '10px 0 -10px 0', display : isPartOfInputGroup ? '' : 'none' }}>{inputGroupBlockTitle}</div>
                            <div className="Select-text" tabIndex={8} onClick={() => toggleDropdown()}>
                                
                                <span className="Select-text-placeholder">{itemSelected.name}</span>
                            </div>
                            {!collapseOption && (
                                <>
                                    <div className="Select-separator up" />
                                    <div className="slide-animation slide-fast-enter-done">
                                        <div className="Select-elements List-elements not-empty up">
                                            {items.map((item) => (
                                                <div key={item.id} className={"Select-element List-element icon-lesfurets icon-arrow-right after SuggestionLabel " + (itemSelected.name === item.name ? "selected" : "")} onClick={() => updateSelected(item)}>
                                                    <span>{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {!inputGroupBlockTitle && showContinueBtn && <ButtonLarge name="Continuer" handleContinue={handleContinue} uniqueId={`${title}-continue-btn`}  />}
            </div>
        </div>
    );
}

export default SEDropDownList;
