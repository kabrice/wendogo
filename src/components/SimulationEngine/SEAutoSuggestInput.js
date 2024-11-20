'use client';

import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";
import useAutoComplete from '../../hooks/useAutoComplete'; 
import { REST_API_PARAMS } from '../../utils/Constants';

const SEAutoSuggestInput = (props) => {

  const { title, urlFragment, handleChange, handleContinue, showContinueBtn, tip, messageError, matchingValue, id } = props;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [stopSearch, setStopSearch] = useState(matchingValue)
  
  const [focused, setFocused] = useState(true);
  const newRef = useRef(null)

  const reinitializeInput = (removeTextInput = true) => {
     removeTextInput && bindInput.onChange({ target: { value: '' } });
     setSuggestions([]);
     setBusy(false);
  }


  const handleOutsideClick = (e) => { 
    if (newRef.current && !newRef.current.contains(e.target) && suggestions?.length > 0 && !helper.isTargetContainsIgnoreClass(e.target)) {
        //console.log('Outside click SEAutoSuggestInput')
        setBusy(false);
        reinitializeInput(false)
        setFocused(false); 
    }
  };

  const { bindInput, bindOptions,  bindOption, isBusy, suggestions, setSuggestions, setBusy} = useAutoComplete({ 
      source: async (search) => {
        try {
            setFocused(true);
            const res = await fetch(`${REST_API_PARAMS.baseUrl}${urlFragment}${search}`)
            const data = await res.json()
            //console.log('data', data)
            return data.map(d => ({ id: d.id, name: d.name }))
        } catch (e) {
              return []
        }
      }
  })
  //console.log('matchingValue SEAutoSuggestInput', matchingValue)
  useEffect(() => {
    
    helper.addOutsideClick(handleOutsideClick)
    //console.log('value', value)
    })

  const voidFunction = () => {
    return null;
  }
  
  const toSentenceCase = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  const putStringTagOnOptionFromSearchInput = (index, searchInput) => {
    // Convert option to Sentence Case
    const sentenceCaseOption = toSentenceCase(suggestions[index].name);
  
    // Highlight the search input
    const regex = new RegExp(searchInput.value, 'gi');
    const highlightedOption = sentenceCaseOption.replace(regex, (match) => `<strong>${match}</strong>`);
  
    return <span dangerouslySetInnerHTML={{ __html: highlightedOption }}></span>;
  };

  const handleOnClickOption = (index) => {
    bindInput.onChange({ target: { value: suggestions[index].name } })
    handleChange({id: suggestions[index].id, name: suggestions[index].name}) 
    setBusy(false);
    reinitializeInput(false)
    setStopSearch(true)
  }
  const activateSearchFromTag = (searchVal) => {
    bindInput.onChange({ target: { value: searchVal } })
    setStopSearch(false)
    //setBusy(true)
  }

  return (
    <div className={`FieldWrapper fade-animation fade-slow-enter-done TextField ${focused ? 'focused' : ''} `} >
      <div className={`FieldView DaisyFieldView TextField COORD_PRE ${focused ? 'focused' : ''}`}>
        <div className="FieldView-flex-container">
          <label className="Label">{title}</label>
        </div>
        <div className="Tip">
          <div>{tip} </div>
        </div>
        <div className="app-row app-field">
          <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click" >
            <div className="AutoSuggest TextFieldContainer isBordered">
              <div className={`AutoSuggest-inputWrapper field-error ${(suggestions?.length>0 || isBusy)  ? 'not-empty ' : ''}`}>
              {!stopSearch && <div className={`Input ${(focused || isBusy) ? 'focused' : 'field-error'}`}>
                  <input  type="text" {...bindInput} placeholder="Domaine d'études" id={id} name={id} value={bindInput.value} 
                          tabIndex={6} maxLength={1000} autoComplete="off"/>
                  {bindInput?.value?.length>0 && 
                      <span className="Input-symbol" onClick={reinitializeInput}>
                        <svg width="17px" height="17px" viewBox="0 0 17 17" xversion="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <title>noun-multiply-665717</title>
                          <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <g id="noun-multiply-665717" transform="translate(0.500000, 0.500000)" stroke={`${(focused || isBusy) ? '#0154C0' : '#ff3535'}`}>
                              <g id="Group" transform="translate(4.945168, 4.945168)" strokeWidth={3}>
                                <line x1={0} y1="0.000204692577" x2="6.10966405" y2="6.10966405" id="Path" />
                                <line x1={0} y1="6.10945936" x2="6.10966405" y2={0} id="Path" />
                              </g>
                              <circle id="Oval" cx={8} cy={8} r={8} />
                            </g>
                          </g>
                        </svg>
                      </span>}
                </div>}
              {stopSearch && <div className="AutoSuggest suggestion-tag TextFieldContainer isBordered">
                <div className="AutoSuggest-inputWrapper  ">
                  <div className="Input  hasSymbol right  field-valid ">
                    {bindInput.value || matchingValue?.name} 
                    <span className="Input-symbol" onClick={() => activateSearchFromTag(bindInput.value || matchingValue?.name)}>
                      <span className="Icon  icon-lesfurets icon-system-close-circled" />
                    </span>
                  </div>
                </div>
              </div>}
              </div>
              {!stopSearch && isBusy && <div {...bindOptions} className="slide-animation slide-fast-enter-done">
                <div className="AutoSuggest-elements List-elements  not-empty">
                  <div className="ListSuggestion">
                    <div className={`AutoSuggest-element List-element icon-lesfurets icon-arrow-right after`}><i>un instant svp...</i></div></div></div></div>}
              {!stopSearch && suggestions?.length>0 && <div {...bindOptions} className="slide-animation slide-fast-enter-done">
                <div className={`AutoSuggest-elements List-elements not-empty`}>
                  <div className="ListSuggestion"  ref={newRef}  >
                      {
                          suggestions.map((_, index) => (                             
                              <div className={`AutoSuggest-element List-element icon-lesfurets icon-arrow-right after ${hoveredIndex === index ? 'active ' : ''}`}
                                   onMouseEnter={() => setHoveredIndex(index)}
                                   onMouseLeave={() => setHoveredIndex(null)}   
                                   onClick={() => handleOnClickOption(index)}
                                   key={index}
                                   {...bindOption}>
                                   {putStringTagOnOptionFromSearchInput(index, bindInput)}
                              </div>
                          ))
                      } 
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>
        {( !focused) && (
          <div className="Error">
            <span className="Icon error-icon icon-lesfurets icon-system-alert" /> {messageError}
          </div>
        )}
        {(bindInput?.value?.length>0 || matchingValue) && <div className="Tip subTip ">
          <div className="Box  " style={{ padding: "8px 0px 0px", borderWidth: "initial", borderStyle: "none", borderColor: "initial" }}>
            <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "center" }}>
              <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                <div className="icon-wrapper" style={{ color: "#2A3775" }}>
                  <svg width="20px" height="23.6376351px" viewBox="0 0 20 23.6376351" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>Group</title>
                    <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                      <g id="Group" fillRule="nonzero">
                        <g id="light" transform="translate(3.705375, 3.684032)">
                          <path d="M8.85020682,15.147261 C9.14063336,15.147261 9.37795952,15.378952 9.37795952,15.661576 L9.37795952,18.3157278 C9.37795952,18.5985685 9.14063336,18.8302596 8.85020682,18.8302596 L8.07364095,18.8302596 C7.79925289,19.4717988 7.14015804,19.9536034 6.37139467,19.9536034 C5.60241456,19.9536034 4.94353645,19.4720155 4.66893166,18.8302596 L3.92010802,18.8302596 C3.62968148,18.8302596 3.39192185,18.5985685 3.39192185,18.3157278 L3.39192185,15.661576 C3.39192185,15.378952 3.62946475,15.147261 3.92010802,15.147261 L8.85020682,15.147261 Z M6.53806482,6.01356317 L7.51034351,6.37052773 L8.20606678,6.03090207 C8.3473377,5.96219951 8.51439356,5.97324317 8.6453911,6.05994472 C8.77543283,6.14663921 8.84695578,6.29532026 8.83243445,6.44811929 L8.13584424,13.7085659 C8.11482083,13.9274695 7.92561011,14.0917556 7.70453916,14.0917556 C7.69110152,14.0917556 7.6772304,14.0911054 7.66335928,14.0900217 C7.42494944,14.0681313 7.24960984,13.8622319 7.27193367,13.6298907 L7.89570051,7.12802082 L7.72924709,7.2092969 C7.62067569,7.26227547 7.49517772,7.26861692 7.38181893,7.22685253 L6.38288169,6.85970138 L5.35316791,7.22815295 C5.25715376,7.26239727 5.15160322,7.26283075 5.05537234,7.22836969 L4.55146063,7.04999578 L5.57445559,13.5369109 C5.61086727,13.7677349 5.44853184,13.9833875 5.21185589,14.0187155 C4.97474647,14.0538267 4.75345879,13.895826 4.7170471,13.6652187 L3.58264972,6.47304396 C3.55977042,6.32457187 3.61856156,6.17527551 3.73653244,6.08226855 C3.85595792,5.98699216 4.01619867,5.96034004 4.16003501,6.01182928 L5.20275297,6.38158127 L6.23550106,6.01226275 C6.33281562,5.97715149 6.44053353,5.97758496 6.53784809,6.01356317 L6.53806482,6.01356317 Z" id="Combined-Shape" fill="#2A3775" />
                          <path d="M6.28535039,0 C9.75096256,0 12.5707008,2.84834741 12.5707008,6.34950431 C12.5684113,8.15098946 11.8157147,9.87008122 10.4935008,11.0936434 C10.1621112,11.4575436 10.0684811,12.4283051 10.0923221,12.8706637 C10.1130953,13.2584965 9.97541722,13.6381281 9.71086635,13.9224846 C9.44762693,14.2041491 9.07989491,14.3648065 8.69437348,14.3665771 L3.90992142,14.3665771 C3.52493099,14.3655339 3.15735732,14.206009 2.89364528,13.9255189 C2.62928634,13.6423016 2.49129988,13.2638557 2.51132259,12.8769491 C2.53147905,12.4369745 2.43286407,11.4646959 2.1068928,11.0908259 C0.767679693,9.86843359 0,8.14126265 0,6.34950431 C0,2.84834741 2.81952149,0 6.28535039,0 Z M6.28535039,0.568715842 C3.12967102,0.568715842 0.562863964,3.16218146 0.562863964,6.34950431 C0.562863964,7.98499583 1.26703994,9.56283552 2.4946339,10.6781601 C2.50113598,10.684012 2.50785481,10.6905141 2.51414016,10.6974496 C3.02997236,11.2663822 3.09325934,12.4840063 3.07396981,12.9051248 C3.06164773,13.137153 3.14409512,13.3642353 3.30240979,13.53431 C3.46018716,13.701905 3.67996138,13.7972136 3.91013815,13.7978613 L8.69415674,13.7978613 C8.92172978,13.7978613 9.14345093,13.7007634 9.30188511,13.5312757 C9.46014522,13.3610062 9.54250738,13.1337868 9.53010835,12.901657 C9.50735104,12.4785879 9.56370246,11.257496 10.0912384,10.695499 C10.0959012,10.6904113 10.1008203,10.6855646 10.1059765,10.6809777 C11.3161264,9.56547722 12.005538,7.99534721 12.0078368,6.34950431 C12.0078368,3.16196472 9.44081302,0.568715842 6.28535039,0.568715842 Z M7.6024564,1.80974744 C9.39118043,2.43741553 10.236235,3.52933261 10.6298279,4.33472441 C11.0606995,5.21532367 11.0604828,5.9485423 11.0602758,5.97931885 C11.0600293,6.13485191 10.9342573,6.26101123 10.7787257,6.26172614 L10.7767751,6.26172614 C10.6208182,6.25982174 10.4958368,6.13202851 10.4974021,5.9760678 L10.4974021,5.96002932 C10.4924172,5.72205295 10.3699612,3.38303566 7.41758041,2.34703653 C7.27032006,2.29433418 7.19297178,2.13286963 7.24419143,1.98508704 C7.26833535,1.91424441 7.31969323,1.85593077 7.38691789,1.82303014 C7.45414255,1.7901295 7.53170071,1.78534993 7.6024564,1.80974744 L7.6024564,1.80974744 Z" id="Combined-Shape" fill="#627A93" />
                        </g>
                        <path d="M0.316487268,5.88607169 L2.13056943,6.20597436 C2.22694048,6.22162818 2.30743446,6.28792495 2.34126688,6.37950982 C2.3750993,6.47109469 2.35703627,6.57379947 2.29398591,6.64834524 C2.23093555,6.72289102 2.13265176,6.75774556 2.03672265,6.73957893 L0.222423748,6.41967627 C0.0758083267,6.39297496 -0.0217132607,6.25287165 0.00415823743,6.10610753 C0.0300297356,5.9593434 0.169579144,5.86103083 0.316487268,5.88607169 Z M19.6805681,5.88607169 C19.8230238,5.86017262 19.9606651,5.950864 19.9930745,6.09198098 C20.0254838,6.23309796 19.9412047,6.37475629 19.8017237,6.41360766 L19.7746317,6.41967627 L17.9605495,6.73957893 C17.8185824,6.76456108 17.6819127,6.67400216 17.6495797,6.53352674 C17.6172467,6.39305133 17.7005738,6.25185605 17.8391772,6.21225971 L17.8662692,6.20597436 L19.6805681,5.88607169 Z M3.31113162,1.72040154 L4.63647361,3.00022892 C4.70632177,3.06742726 4.73495005,3.16682063 4.71154831,3.26087775 C4.68814656,3.35493486 4.61628037,3.42932485 4.52308665,3.4559578 C4.42989294,3.48259075 4.32957101,3.45740876 4.2600028,3.38992064 L2.93487755,2.11031 C2.86522711,2.04309868 2.83672426,1.9438348 2.86010575,1.84991009 C2.88348724,1.75598538 2.95520086,1.68166925 3.04823279,1.65495586 C3.14126472,1.62824247 3.24148119,1.65319022 3.31113162,1.72040154 L3.31113162,1.72040154 Z M16.6859238,1.50366532 C16.7894377,1.40363151 16.9531082,1.40201636 17.058576,1.49998786 C17.1640439,1.59795936 17.1744786,1.7613049 17.0823343,1.87190016 L17.0621779,1.89357378 L15.7370526,3.17318442 C15.6336051,3.27334569 15.4698797,3.27508609 15.3643264,3.17714648 C15.2587732,3.07920688 15.2482742,2.91580916 15.3404253,2.80516632 L15.3605818,2.7834927 L16.685707,1.50366532 L16.6859238,1.50366532 Z M10.0860891,0.000166157285 C10.1579562,0.00259581083 10.2259091,0.0334968014 10.2749776,0.0860615211 C10.3240461,0.138626241 10.3502045,0.208542001 10.3476898,0.28040609 L10.2833191,2.12158028 C10.2799508,2.21833206 10.2252219,2.30593742 10.1397482,2.35139627 C10.0542746,2.39685512 9.95104167,2.39326117 9.86893633,2.34196824 C9.78683098,2.29067531 9.73832697,2.19947601 9.74169528,2.10272423 L9.80606594,0.261550039 C9.8085518,0.189721215 9.8394773,0.121823708 9.89203579,0.0728016313 C9.94459429,0.0237795545 10.0144781,-0.00234923605 10.0863059,0.000166157285 L10.0860891,0.000166157285 Z" id="Shape" fill="#2A3775" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="Stack-child  " style={{ paddingLeft: 0 }}>
                <p style={{ color: "rgb(127, 148, 169)", fontSize: "1rem", margin: "0px 15px", padding: 0, textAlign: "left", fontWeight: 400, lineHeight: "inherit" }}> Cliquez sur la croix pour fermer et resaisir si ça ne convient pas. </p>
              </div>
            </div>
          </div>
        </div>}

        {showContinueBtn && <ButtonLarge  name="Continuer" handleContinue={stopSearch ? handleContinue : voidFunction} />}
      </div>
    </div>
  );
};

export default SEAutoSuggestInput;
