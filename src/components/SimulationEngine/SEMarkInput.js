'use client';

import React, { useState, useRef, useEffect } from 'react'; 
import ButtonLarge from "../ButtonLarge";
import useAutoComplete from '../../hooks/useAutoComplete';
import { REST_API_PARAMS } from '../../utils/Constants';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import _ from 'lodash';
import SvgConstant from "../../utils/SvgConstant";


const MARK_SYSTEM = {
  SUR_6: 'Sur 6',
  SUR_10: 'Sur 10',
  SUR_20: 'Sur 20',
  SUR_100: 'Sur 100',
  LETTRE: 'Lettres (A+, A, B-, etc.)'
}
const LETTER_GRADES = {
  'A+': 20,
  'A': 18,
  'A-': 17,
  'B+': 16,
  'B': 14,
  'B-': 12,
  'C+': 10,
  'C': 8,
  'C-': 6,
  'D+': 5,
  'D': 4,
  'F': 0
};
const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': '#E0E3E7',
              '--TextField-brandBorderHoverColor': '#B2BAC2',
              '--TextField-brandBorderFocusedColor': '#6F7E8C',
              '& label.Mui-focused': {
                color: 'rgb(78, 97, 116)',
              },
              '& .Mui-error': { 
                color: '#ff3535 !important',
              },
              '& .Mui-error .MuiOutlinedInput-notchedOutline': {  
                borderColor: '#ff3535 !important',
                borderWidth: '2px',
              },
              marginBottom: '15px',
            '& label': {
                color: 'rgb(172, 186, 200)',
                fontSize: '1.125rem',
                padding: '15px'
            },
              position: 'relative',
              width: '66.66666667%'
            },
            
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
            //  borderWidth: '0',
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: '#0154c0',
                borderWidth: '2px 2px 2px 2px',
                boxShadow: '0 4px 8px 0 rgba(19, 172, 247, 0.1), 0 6px 20px 0 rgba(19, 172, 247, 0.1)',
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: '#0154c0',
                borderWidth: '2px 2px 2px 2px',
                boxShadow: '0 4px 8px 0 rgba(19, 172, 247, 0.1), 0 6px 20px 0 rgba(19, 172, 247, 0.1)',
              },
              backgroundColor: 'white',
              borderWidth: '0',
              borderColor: '#acbac8',
              borderStyle: 'solid',
              boxShadow: '0 4px 8px 0 rgba(172,186,200,0.1),0 6px 20px 0 rgba(172,186,200,0.1)',
              borderRadius: '16px',
              outline: 'none',
              color: '#4e6174',
              fontSize: '1.125rem',
              height: '80px',
              padding: '15px 30px',
              width: '100%',
              '& input': {
                caretColor: '#0154c0',
                textOverflow: 'ellipsis',
                padding: '0',
              }
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              '& label': {
                color: 'green',
              },
              '&::before, &::after': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              '&::before': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              }
            },
          },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    //color: 'green !important',
                    '&.MuiInputLabel-shrink': {
                        padding: '0 !important',
                    },
                }
            }
        }
      },
    });

const SEMarkInput = (props) => {

  const { title, urlFragment, tip, subject, setSubject, setIsReadMode, setReferenceInc, referenceInc, setSubjectList, 
          subjectList, subjectWeightSystem, markSystem, id, isBacReportCard, svgConstantName} = props;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [stopSearch, setStopSearch] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [focused, setFocused] = useState(false);
  const newRef = useRef(null)
  const [showTPCheckBox, setShowTPCheckBox] = useState(false);

  const [localMark, setLocalMark] = useState(subject.mark.value || '');
  const [localWeight, setLocalWeight] = useState(subject.weight.value || '');
  const [localRank, setLocalRank] = useState(subject.rank.value || '');
  
  useEffect(() => {
    setLocalMark(subject.mark.value || '');
      setLocalWeight(subject.weight.value || '');
      setLocalRank(subject.rank.value || '');
  }, [subject]);

  const handleChangeTPCheckbox = (event) => {
    setShowTPCheckBox(event.target.checked);
  };

  const { bindInput, bindOptions, bindOption, isBusy, suggestions, setSuggestions, setBusy, setTextValue} = useAutoComplete({
    source: async (search) => {
        try {
            const res = await fetch(`${REST_API_PARAMS.baseUrl}${urlFragment}${search}`, {
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            return data.map(d => ({ id: d.id, name: d.name }));
        } catch (error) {
            console.error('Autocomplete error:', error);
            return [];
        }
    },
    initialValue: subject.label.value, // Initialize with subject.label.value
    onChange: (selectedOption) => {
        setSubject({ ...subject, label: { value: selectedOption.label, validated: true } });
    },
  });

  const reinitializeInput = (removeTextInput = true) => {
    setSubject({...subject, label: {validated : true, value: ''}})   
     removeTextInput && bindInput.onChange({ target: { value: '' } });
     setSuggestions([]);
     setBusy(false);
  }


  let effectiveMarkSystem = markSystem;
  if(isBacReportCard){
    effectiveMarkSystem = MARK_SYSTEM.SUR_20;
  }
  const markSystemIsNumeric = effectiveMarkSystem !== MARK_SYSTEM.LETTRE;
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log('newRef.current:', newRef.current, 'event.target:', event.target);

      if (
        newRef.current &&
        !newRef.current.contains(event.target) && // Check if the click is outside `newRef`
        !event.target.closest('.AutoSuggest-inputWrapper') // Check if the click is outside the input wrapper
      ) {
        console.log('Outside click detected');
        setBusy(false);
        reinitializeInput(false);
        setFocused(false);
        setSuggestions([]); // Clear suggestions
      }
    };
  
    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);
  
    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [suggestions, setBusy, setFocused]);
  

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;
    
    if (subjectList.length === 0) {
      setIsInitialized(true);
      return;
    }
  
    const referenceCounts = _.countBy(subjectList, 'reference');
    const duplicateReferences = Object.entries(referenceCounts).filter(([_, count]) => count > 1);
    
    if (duplicateReferences.length > 0) {
      let newSubjectList = [...subjectList];
      duplicateReferences.forEach(([reference, count]) => {
        let increment = 0;
        newSubjectList = newSubjectList.map(subject => {
          if (subject.reference === parseInt(reference)) {
            increment += 100;
            return { ...subject, reference: parseInt(reference) + increment };
          }
          return subject;
        });
      });
      setSubjectList(newSubjectList);
    }
    
    setIsInitialized(true);
  }, [subjectList, setSubjectList]);

  useEffect(() => {
    const scrollToDiv = () => {
      const element = document.getElementById('open-mark-input');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    scrollToDiv();
    if (isFirstRender && subject?.label?.value) {
      console.log('hiboux', subject.label.value)
      setTextValue(subject.label.value);
      setIsFirstRender(false);
    }
    console.log('🦉', isFirstRender, subject?.label?.value)
    //helper.addOutsideClick(handleOutsideClick)

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
    };
  }, [isFirstRender, subject?.label?.value, setTextValue])

  useEffect(() => {
    setLocalMark(subject.mark.value || '');
  }, [subject.mark.value]);

  useEffect(() => {
    setLocalWeight(subject.weight.value || '');
  }, [subject.weight.value]);

  useEffect(() => {
      setLocalRank(subject.rank.value || '');
  }, [subject.rank.value]);
  
  const putStringTagOnOptionFromSearchInput = (index, searchInput) => {
    // Convert option to Sentence Case
    console.log('IIII searchInput',searchInput, index, suggestions)
    if (!suggestions[index]?.name || !searchInput?.value) {
        return <span>{suggestions[index]?.name || ''}</span>;
    }

    const sentenceCaseOption = suggestions[index].name.charAt(0).toUpperCase() + suggestions[index].name.slice(1).toLowerCase();
    console.log('IIII sentenceCaseOption',searchInput, index, sentenceCaseOption)
    // Highlight the search input
    const regex = new RegExp(searchInput.value, 'gi');
    const highlightedOption = sentenceCaseOption.replace(regex, (match) => `<strong>${match}</strong>`);
  
    return <span dangerouslySetInnerHTML={{ __html: highlightedOption }}></span>;
  };

  const handleOnClickOption = (index) => {
   // console.log('😍', suggestions[index].name)
    bindInput.onChange({ target: { value: suggestions[index].name } })
    //setSubject({...subject, label: {value : suggestions[index].name, validated: true}})
    setSubject({ ...subject, label: { ...subject.label, validated: true, value:  suggestions[index].name }});
    //console.log('handleOnClickOption subject 😍', subject)
    //handleChange({id: suggestions[index].id, name: suggestions[index].name}) 
    setBusy(false);
    reinitializeInput(false)
    setStopSearch(true)
  } 

  const outerTheme = useTheme(); 

  // Function to validate numerical grades
  function validateNumericGrade(mark, max) {
    console.log('mark xxx', mark, max)
    const numericMark = parseFloat(mark);
    return !isNaN(numericMark) && numericMark <= max && numericMark > 0;
  }

  // Function to validate letter grades
  function validateLetterGrade(mark) {
    const validLetterGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F'];
    return validLetterGrades.includes(mark );
  }

  // Function to normalize the input value to SUR_20 scale
  const convertToSur20 = (value, effectiveMarkSystem) => {
    //const { value, markSystem } = inputValue;
    //console.log('convertToSur20', value, effectiveMarkSystem);
    switch (effectiveMarkSystem) {
        case MARK_SYSTEM.SUR_6:
            return Math.round(((value / 6) * 20) * 100) / 100; // Convert from Sur 6 to Sur 20
        case MARK_SYSTEM.SUR_10:
            return Math.round(((value / 10) * 20) * 100) / 100; // Convert from Sur 10 to Sur 20
        case MARK_SYSTEM.SUR_100:
            return Math.round(((value / 100) * 20) * 100) / 100; // Convert from Sur 100 to Sur 20
        case MARK_SYSTEM.LETTRE:
            return LETTER_GRADES[value] || null; // Convert letter grades to Sur 20
        case MARK_SYSTEM.SUR_20:
            return Math.round(value * 100) / 100; // No conversion needed but still round
        default:
            return null; // Handle unknown mark systems
    }
  };

  const validateInput = () => {
    if(subject.label.value === '') {
        setSubject({
            ...subject,
            label: {
                ...subject.label,
                validated: true,
                value: bindInput.value
            }
        });
    }

    // Create a new object instead of modifying the existing one
    const updatedSubject = {
        ...subject,
        label: { ...subject.label },
        mark: { ...subject.mark },
        rank: { ...subject.rank },
        weight: { ...subject.weight }
    };

    if (!updatedSubject.label.value && bindInput.value) {
        updatedSubject.label = {
            ...updatedSubject.label,
            value: bindInput.value
        };
    }

    // Validate label
    const labelIsValid = /^[a-zA-ZÀ-ÿ0-9\s',;''‛:-]+$/.test(updatedSubject.label.value) 
        && updatedSubject.label?.value?.length > 3 
        && updatedSubject.label.value.length < 1024;

    updatedSubject.label = {
        ...updatedSubject.label,
        validated: labelIsValid
    };

    // Handle mark validation
    updatedSubject.mark = {
        ...updatedSubject.mark,
        value: markSystemIsNumeric ? 
            localMark.replace(',', '.').replace(/^0+/, '') : 
            localMark.trim().toUpperCase()
    };

    let mark = updatedSubject.mark.value;
    let isValidMark = false;

    // Validation logic based on grading system
    switch(effectiveMarkSystem) {
        case MARK_SYSTEM.SUR_6:
            isValidMark = validateNumericGrade(mark, 6);
            break;
        case MARK_SYSTEM.SUR_10:
            isValidMark = validateNumericGrade(mark, 10);
            break;
        case MARK_SYSTEM.SUR_20:
            isValidMark = validateNumericGrade(mark, 20);
            break;
        case MARK_SYSTEM.SUR_100:
            isValidMark = validateNumericGrade(mark, 100);
            break;
        case MARK_SYSTEM.LETTRE:
            isValidMark = validateLetterGrade(mark);
            break;
        default:
            console.error('Unsupported grading system');
            break;
    }

    updatedSubject.mark = {
        ...updatedSubject.mark,
        validated: isValidMark
    };

    // Handle rank validation
    if (!localRank || localRank.trim() === '') {
        updatedSubject.rank = {
            ...updatedSubject.rank,
            validated: true,
            value: ''
        };
    } else {
        const rank = parseInt(localRank, 10);
        updatedSubject.rank = {
            ...updatedSubject.rank,
            validated: Number.isInteger(rank) && rank <= 1000 && rank >= 0,
            value: Number.isInteger(rank) ? rank.toString() : localRank
        };
    }

    // Handle weight validation
    const weight = parseInt(localWeight, 10);
    updatedSubject.weight = {
        ...updatedSubject.weight,
        validated: Number.isInteger(weight) && weight <= 1000 && weight > 0,
        value: Number.isInteger(weight) ? weight.toString() : localWeight
    };

    updatedSubject.isBaccalaureat = isBacReportCard;
    updatedSubject.isPracticalWork = showTPCheckBox;

    // Set the validated subject state
    setSubject(updatedSubject);

    // Check if all validations passed
    const allValid = updatedSubject.label.validated && 
                    updatedSubject.mark.validated && 
                    updatedSubject.rank.validated && 
                    updatedSubject.weight.validated;

    if (allValid) {
        if(updatedSubject.reference === 0) {
            setReferenceInc(prevInc => prevInc + 1);
            const newReference = subjectList.length > 0 
                ? subjectList[subjectList.length - 1].reference + 1 
                : referenceInc + 1;
            
            const finalSubject = {
                ...updatedSubject,
                reference: newReference
            };
            
            setSubjectList(prevList => [...prevList, finalSubject]);
        } else {
            setSubjectList(prevList => 
                prevList.map(subject => 
                    subject.reference === updatedSubject.reference ? updatedSubject : subject
                )
            );
        }
        setIsReadMode(true);
    }
};
  return (
    <div className={`FieldWrapper TextField ${focused ? 'focused' : ''} fade-animation fade-slow-enter-done`} id="open-mark-input">
      <div className={`FieldView DaisyFieldView TextField COORD_PRE ${focused ? 'focused' : ''}`}>
      <div className="css-4x6az7 eu4oa1w0">
        <div className="css-kr67x6 eu4oa1w0">
                <button title='Retour'  role="link" aria-label="Retour" data-tn-element="back-btn" data-tn-variant="element" data-tn-action-click="true" className="css-101rujo e8ju0x50" onClick={() => setIsReadMode(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="css-1f4rn1b eac13zx0">
                        <path d="M20.8957 11.897c0-.5523-.4477-1-1-1H6.5173l3.245-3.245c.3906-.3906.3906-1.0238 0-1.4143-.3905-.3905-1.0237-.3905-1.4142 0l-4.9517 4.9517a.9958.9958 0 00-.2868.5964.9982.9982 0 00.2868.818l4.9515 4.9515c.3905.3905 1.0237.3905 1.4142 0 .3905-.3906.3905-1.0237 0-1.4143l-3.244-3.244h13.3776c.5523 0 1-.4477 1-1z" />
                    </svg> 
                    {/* {Retour} */}
                </button>
            </div>
        </div>
        <div className="FieldView-flex-container">
          <label className="Label">{svgConstantName && SvgConstant.getSvg(svgConstantName)} {title}</label>
        </div>
        {!isBacReportCard && <div className="Tip">
          <div>{tip} </div>
        </div>}
        <div className="app-row app-field" style={{/*marginBottom:0*/}}>
          <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click" >
            <div className="AutoSuggest TextFieldContainer isBordered css-7xrqpf-MuiFormControl-root-MuiTextField-root">
            <label className={`MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium 
                              MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated 
                              MuiInputLabel-sizeMedium MuiInputLabel-outlined css-${( bindInput?.value?.length>0) ? '4fvunh' : '1kjrkh1'}-MuiFormLabel-root-MuiInputLabel-root
                              ${(bindInput?.value?.length>0) && ' MuiInputLabel-shrink MuiFormLabel-filled'}`} data-shrink="false" 
                              htmlFor="SEARCH_SUBJECT" id={`${id}-label`} style={{zIndex: 1, color : `${(bindInput?.value?.length>0 && focused) ? 'rgb(78, 97, 116)' : (!subject.label.validated ? '#ff3535' : '')}`}}> Matière </label>
              {/* <h1>{bindInput?.value?.length+' '+focused}</h1> */}
              <div className={`AutoSuggest-inputWrapper ${(suggestions?.length>0 || isBusy)  ? 'not-empty ' : ''}`}>
              {<div className='Input ' style={{height: 80, border: 'none', borderEndEndRadius : (suggestions?.length>0 || isBusy) ? 0 : 16, borderEndStartRadius: (suggestions?.length>0 || isBusy) ? 0 : 16 }}>
                  {/* {'$$  '+bindInput?.value} */}
                  <input  type="text" {...bindInput}   id={`${id}`} name="9026b80" value={bindInput.value /*|| subject.label.value*/} 
                      onChange={(e) => {
                        bindInput.onChange(e); // Update textValue in useAutoComplete
                        setSubject({
                            ...subject,
                            label: {
                                value: e.target.value,
                                validated: /^[a-zA-ZÀ-ÿ0-9\s',;''‛:-]+$/.test(e.target.value),
                            },
                        });
                    }}
                    onFocus={() => {
                        if (!bindInput.value && subject.label.value) {
                            setTextValue(subject.label.value); // Sync autocomplete state
                        }
                    }}
                          tabIndex={6} maxLength={1000} autoComplete="off" 
                          style={{zIndex: 10, padding: '15px 30px'  }} 
                          onMouseDown={() => {console.log('$$$ onMouseDown',subject.label.value); setSubject({...subject, label: {validated : true, value: subject.label.value}}); setStopSearch(false); setFocused(true);}}
                          onMouseEnter={() => {setFocused(true); setStopSearch(false);}}
                          onMouseLeave={() => setFocused(false || suggestions?.length>0)}  />
                    <fieldset className={`MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline ${!subject.label.validated && 'mark-search-fieldset-error'}
                                                            ${(focused && !((!stopSearch && suggestions?.length>0) || isBusy)) ? ' mark-search-fieldset-focus ' : ''}
                                                            ${(focused && ((!stopSearch && suggestions?.length>0) || isBusy)) ? ' mark-search-fieldset-revealed ' : ''}`}
                        >
                        <legend className={`css-${( bindInput?.value?.length>0) ? '14lo706' : 'yjsfm1'}`} 
                                style={{ ...((bindInput?.value?.length>0 && windowWidth <= 764) && {  paddingLeft: '5px' })  }}>
                            <span>Matière</span>
                        </legend>
                    </fieldset>
                    {bindInput?.value?.length>0 && 
                        <span className="Input-symbol" onClick={reinitializeInput}>
                        <svg width="17px" height="17px" viewBox="0 0 17 17" xversion="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <title>noun-multiply-665717</title>
                            <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <g id="noun-multiply-665717" transform="translate(0.500000, 0.500000)"  stroke={`${subject.label.validated ? '#0154C0' : '#ff3535'}`}>
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
              </div>
              {/* {' '+!stopSearch+' '+isBusy+' '+suggestions?.length} */}
              {!stopSearch && isBusy && <div {...bindOptions} className="slide-animation slide-fast-enter-done">
                <div className="AutoSuggest-elements List-elements  not-empty">
                  <div className="ListSuggestion">
                    <div className={`AutoSuggest-element List-element icon-lesfurets icon-arrow-right after`}><i>un instant svp...</i></div></div></div></div>}
              {!stopSearch && suggestions?.length>0 && <div {...bindOptions} className="slide-animation slide-fast-enter-done">
                <div className={`AutoSuggest-elements List-elements not-empty`} ref={newRef}>
                  <div className="ListSuggestion"    >
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
        {!subject.label.validated && (
          <div className="Error"  style={{ fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.66, letterSpacing: '0.03333em', textAlign: 'left', marginTop: '-12px', marginRight: '14px', marginLeft: '8px' }}>
            <span className="Icon error-icon icon-lesfurets icon-system-alert" /> {'La saisie est incorrecte. Ecrivez complètement les mots, sans abréviations.'}
          </div>
        )}
        <Box sx={{  marginLeft: '-15px', position: 'relative', minHeight: '1px', ...(windowWidth > 764 && { paddingRight: '15px', paddingLeft: '15px' })  }} 
             className={windowWidth <= 764 ? 'app-row app-field' : ''}>
            <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField 
                    error={!subject.mark.validated} 
                    id='Note'
                    value={localMark}
                    onFocus={() => {
                        setSubject({
                            ...subject, 
                            mark: {
                                value: localMark,
                                valueIn20: convertToSur20(localMark, effectiveMarkSystem),
                                validated: true
                            }
                        });
                    }}
                    helperText={!subject.mark.validated && 
                        `${markSystemIsNumeric 
                            ? 'La valeur saisie est incorrecte. Elle doit être un decimal et dans le bon système de notation.' 
                            : 'La valeur saisie est incorrecte. Elle doit être de la forme : A+, A, A-...E, F.'}`
                    } 
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setLocalMark(newValue);
                        setSubject({
                            ...subject, 
                            mark: {
                                value: newValue,
                                valueIn20: convertToSur20(newValue, effectiveMarkSystem),
                                validated: true
                            }
                        });
                    }}
                    label="Note" 
                    type={markSystemIsNumeric ? 'number' : 'text'} 
                    inputProps={{ 
                        autoComplete: 'off',
                        step: markSystemIsNumeric ? '0.01' : undefined,
                        min: markSystemIsNumeric ? '0' : undefined,
                        max: markSystemIsNumeric ? 
                            effectiveMarkSystem === MARK_SYSTEM.SUR_6 ? '6' :
                            effectiveMarkSystem === MARK_SYSTEM.SUR_10 ? '10' :
                            effectiveMarkSystem === MARK_SYSTEM.SUR_20 ? '20' :
                            effectiveMarkSystem === MARK_SYSTEM.SUR_100 ? '100' : undefined
                            : undefined
                    }} 
                    className={windowWidth <= 764 ? 'app-col-xs-12' : ''}
                />

                <TextField 
                    error={!subject.weight.validated} 
                    id={subjectWeightSystem} 
                    value={localWeight}
                    onFocus={() => {
                        setSubject({
                            ...subject, 
                            weight: {
                                value: localWeight,
                                validated: true
                            }
                        });
                    }}
                    helperText={!subject.weight.validated && "La valeur saisie est incorrecte. Elle doit être un nombre entier."} 
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setLocalWeight(newValue);
                        setSubject({
                            ...subject, 
                            weight: {
                                value: newValue,
                                validated: true
                            }
                        });
                    }}
                    label={subjectWeightSystem} 
                    type="number" 
                    inputProps={{ 
                        autoComplete: 'off',
                        min: '0',
                        max: '1000',
                        step: '1'
                    }} 
                    className={windowWidth <= 764 ? 'app-col-xs-12' : ''}
                />

                {!isBacReportCard && (
                    <TextField 
                        error={!subject.rank.validated} 
                        id="Rang"
                        value={localRank}
                        onFocus={() => {
                            setSubject({
                                ...subject, 
                                rank: {
                                    value: localRank,
                                    validated: true
                                }
                            });
                        }}
                        helperText={!subject.rank.validated && "La valeur saisie est incorrecte. Elle doit être un nombre entier."} 
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setLocalRank(newValue);
                            setSubject({
                                ...subject, 
                                rank: {
                                    value: newValue,
                                    validated: true
                                }
                            });
                        }}
                        label="Rang" 
                        type="number" 
                        inputProps={{ 
                            autoComplete: 'off',
                            min: '0',
                            max: '1000',
                            step: '1'
                        }} 
                        className={windowWidth <= 764 ? 'app-col-xs-12' : ''}
                    />
                )}
              <FormControlLabel
                      sx={{ margin: '0 0 10px -7px', width: '100%' }}
                      control={<Checkbox checked={showTPCheckBox} onChange={handleChangeTPCheckbox} sx={{ color: '#acbac8', borderWidth: '1px' }} />}
                      label="Travaux Pratiques (TP) ?"
                  />
            </ThemeProvider>
        </Box>
        <ButtonLarge notStandard={windowWidth > 764}  name="Enregistrer les modifications" handleContinue={  validateInput } />
      </div>

    </div>
  );
};

export default SEMarkInput;
