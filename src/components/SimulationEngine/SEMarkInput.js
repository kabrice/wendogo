import React, { useState, useRef, useEffect } from 'react';
import helper from '../../utils/Helper';
import ButtonLarge from "../ButtonLarge";
import useAutoComplete from '../../hooks/useAutoComplete';
import { useSearchLevelValuesQuery } from '../../store/apis/levelValueApi';
import { REST_API_PARAMS } from '../../utils/Constants';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import _ from 'lodash';

const MARK_SYSTEM = {
  SUR_6: 'Sur 6',
  SUR_10: 'Sur 10',
  SUR_20: 'Sur 20',
  SUR_100: 'Sur 100',
  LETTRE: 'Lettres (A+, A, B-, etc.)'
}

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

  const { title, urlFragment, tip, subject, setSubject, setIsReadMode, setReferenceInc, referenceInc, setSubjectList, subjectList, subjectWeightSystem, markSystem  } = props;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [stopSearch, setStopSearch] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [focused, setFocused] = useState(false);
  const newRef = useRef(null)

  const reinitializeInput = (removeTextInput = true) => {
    setSubject({...subject, label: {validated : true, value: ''}})   
     removeTextInput && bindInput.onChange({ target: { value: '' } });
     setSuggestions([]);
     setBusy(false);
  }

  const markSystemIsNumeric = markSystem !== MARK_SYSTEM.LETTRE;

  const handleOutsideClick = (e) => { 
    if (newRef.current && !newRef.current.contains(e.target) && suggestions?.length > 0 && !helper.isTargetContainsIgnoreClass(e.target)) {
        console.log('outside click SEMarkInput')
        setBusy(false);
        reinitializeInput(false)
        setFocused(false); 
    }
  };

  const { bindInput, bindOptions,  bindOption, isBusy, suggestions, setSuggestions, setBusy} = useAutoComplete({ 
      source: async (search) => {
        try {
            //console.log('xxx search', search)
            setFocused(true);
            const res = await fetch(`${REST_API_PARAMS.baseUrl}${urlFragment}${search}`)
            const data = await res.json()

            setSubject({...subject, label: {value : _.capitalize(search), validated: true}})
            return data.map(d => ({ id: d.id, name: d.name }))
        } catch (e) {
              return []
        }
      }
  })
//   console.log('textValue 😍', subject, bindInput )
 if(!bindInput.value && subject.label.value){
    bindInput.value = subject.label.value  
    }
  //console.log('matchingValue SEMarkInput', matchingValue)
  useEffect(() => {
    //bindInput.onChange({ target: { value: subject.label.value } })
    helper.addOutsideClick(handleOutsideClick)

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
    };
  })

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
    console.log('😍')
    bindInput.onChange({ target: { value: suggestions[index].name } })
    setSubject({...subject, label: {value : suggestions[index].name, validated: true}})
    //handleChange({id: suggestions[index].id, name: suggestions[index].name}) 
    setBusy(false);
    reinitializeInput(false)
    setStopSearch(true)
  } 

  const outerTheme = useTheme(); 

  // Function to validate numerical grades
  function validateNumericGrade(mark, max) {
    const numericMark = parseFloat(mark);
    return !isNaN(numericMark) && numericMark <= max && numericMark > 0;
  }

  // Function to validate letter grades
  function validateLetterGrade(mark) {
    const validLetterGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F'];
    return validLetterGrades.includes(mark );
  }

  const validateInput = () => {
    const updatedSubject = { ...subject };

    // Validate label (no weird characters, length > 3 and length < 1024)
    const labelIsValid = /^[a-zA-Z0-9\sàâäéèêëîïôöùûüÿç'-,;:]+$/.test(updatedSubject.label.value) && updatedSubject.label?.value?.length > 3 && updatedSubject.label.value.length < 1024; 
    updatedSubject.label.validated = labelIsValid;

    // Convert mark to decimal and validate (mark <= 20 and mark > 0)
    //console.log('updatedSubject.mark.value', updatedSubject  )
    updatedSubject.mark.value = markSystemIsNumeric ? updatedSubject.mark.value?.replace(',', '.')?.replace(/^0+/, '') : updatedSubject.mark.value?.trim()?.toUpperCase() 
    
    let mark = updatedSubject.mark.value;
    let isValidMark = false;
    //const gradingSystem = '20'

    // Validation logic based on grading system
    switch(markSystem) {
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

    updatedSubject.mark.validated = isValidMark;

    // If validated, update the value (only for numeric systems)
    if (updatedSubject.mark.validated && markSystemIsNumeric) {
      updatedSubject.mark.value = parseFloat(mark).toString();
    }
    // Convert rank to number and validate (rank <= 1000 and rank >= 0, must be an integer), or allow empty rank
    if (!updatedSubject.rank.value || updatedSubject.rank.value.trim() === '') {
        updatedSubject.rank.validated = true;
    } else {
        const rank = parseInt(updatedSubject.rank.value, 10);
        updatedSubject.rank.validated = Number.isInteger(rank) && rank <= 1000 && rank >= 0;
        if(updatedSubject.rank.validated){
            updatedSubject.rank.value = rank.toString()
        }
    }

    // Convert weight to number and validate (weight <= 1000 and weight >= 0, must be an integer)
    console.log('weight before', updatedSubject , updatedSubject.mark.value)
    const weight = parseInt(updatedSubject.weight.value, 10);
    console.log('weight', weight)
    updatedSubject.weight.validated = Number.isInteger(weight) && weight <= 1000 && weight > 0;
    if(updatedSubject.weight.validated){
        updatedSubject.weight.value = weight.toString()
    }

    // Set the validated subject state
    setSubject(updatedSubject);

    // Check if all validations passed
    const allValid = updatedSubject.label.validated && updatedSubject.mark.validated && updatedSubject.rank.validated && updatedSubject.weight.validated;

    if (allValid) {
        if(updatedSubject.reference === 0){ // New subject
          setReferenceInc(prevInc => prevInc + 1);

          if (subjectList.length > 0) {
            const lastSubject = subjectList[subjectList.length - 1];
            updatedSubject.reference = lastSubject.reference + 1;
          } else {
            updatedSubject.reference = referenceInc + 1;
          }  
          setSubjectList(prevList => [...prevList, updatedSubject]);
        }else{ // Edit subject 
            setSubjectList(prevList => prevList.map(subject => subject.reference === updatedSubject.reference ? updatedSubject : subject));
        }
        setIsReadMode(true);
    } else {
        console.log('Validation failed', updatedSubject);
    } 
}

  return (
    <div className={`FieldWrapper TextField ${focused ? 'focused' : ''} `} >
      <div className={`FieldView DaisyFieldView TextField COORD_PRE ${focused ? 'focused' : ''}`}>
      <div className="css-4x6az7 eu4oa1w0">
        <div className="css-kr67x6 eu4oa1w0">
                <a role="link" aria-label="Retour" data-tn-element="back-btn" data-tn-variant="element" data-tn-action-click="true" className="css-101rujo e8ju0x50" onClick={() => setIsReadMode(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="css-1f4rn1b eac13zx0">
                        <path d="M20.8957 11.897c0-.5523-.4477-1-1-1H6.5173l3.245-3.245c.3906-.3906.3906-1.0238 0-1.4143-.3905-.3905-1.0237-.3905-1.4142 0l-4.9517 4.9517a.9958.9958 0 00-.2868.5964.9982.9982 0 00.2868.818l4.9515 4.9515c.3905.3905 1.0237.3905 1.4142 0 .3905-.3906.3905-1.0237 0-1.4143l-3.244-3.244h13.3776c.5523 0 1-.4477 1-1z" />
                    </svg> 
                    {/* {Retour} */}
                </a>
            </div>
        </div>
        <div className="FieldView-flex-container">
          <label className="Label">{title}</label>
        </div>
        <div className="Tip">
          <div>{tip} </div>
        </div>
        <div className="app-row app-field" style={{/*marginBottom:0*/}}>
          <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click" >
            <div className="AutoSuggest TextFieldContainer isBordered css-7xrqpf-MuiFormControl-root-MuiTextField-root">
            <label className={`MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium 
                              MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated 
                              MuiInputLabel-sizeMedium MuiInputLabel-outlined css-${( bindInput?.value?.length>0) ? '4fvunh' : '1kjrkh1'}-MuiFormLabel-root-MuiInputLabel-root
                              ${(bindInput?.value?.length>0) && ' MuiInputLabel-shrink MuiFormLabel-filled'}`} data-shrink="false" 
                              htmlFor="SEARCH_SUBJECT" id="SEARCH_SUBJECT-label" style={{zIndex: 1, color : `${(bindInput?.value?.length>0 && focused) ? 'rgb(78, 97, 116)' : (!subject.label.validated ? '#ff3535' : '')}`}}> Matière </label>
              {/* <h1>{bindInput?.value?.length+' '+focused}</h1> */}
              <div className={`AutoSuggest-inputWrapper ${(suggestions?.length>0 || isBusy)  ? 'not-empty ' : ''}`}>
              {<div className='Input ' style={{height: 80, border: 'none', borderEndEndRadius : (suggestions?.length>0 || isBusy) ? 0 : 16, borderEndStartRadius: (suggestions?.length>0 || isBusy) ? 0 : 16 }}>
                  <input  type="text" {...bindInput}   id="SEARCH_SUBJECT" name="9026b80" value={bindInput.value /*|| subject.label.value*/} 
                          tabIndex={6} maxLength={1000} autoComplete="off" 
                          style={{zIndex: 10, padding: '15px 30px'  }} 
                          onMouseDown={() => {setSubject({...subject, label: {validated : true, value: subject.label.value}}); setStopSearch(false); setFocused(true);}}
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
                <div className={`AutoSuggest-elements List-elements not-empty`}>
                  <div className="ListSuggestion"  ref={newRef} >
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
            <span className="Icon error-icon icon-lesfurets icon-system-alert" /> {'La valeur saisie est incorrecte.'}
          </div>
        )}
        <Box sx={{  marginLeft: '-15px', position: 'relative', minHeight: '1px', ...(windowWidth > 764 && { paddingRight: '15px', paddingLeft: '15px' })  }} 
             className={windowWidth <= 764 ? 'app-row app-field' : ''}>
            <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField error={!subject.mark.validated} 
                             id = 'Note'
                            defaultValue={subject.mark.value}
                            onMouseDown={e => { setSubject({...subject, mark: {value : e.target.value, validated: true}})}} 
                            helperText={!subject.mark.validated && `${markSystemIsNumeric ? 'La valeur saisie est incorrecte. Elle doit être un decimal et dans le bon système de notation.' : 'La valeur saisie est incorrecte. Elle doit être de la forme : A+, A, A-...E, F.'}`} 
                            onChange={(e) => { setSubject({...subject, mark: {value : e.target.value, validated: true}})}} 
                            label="Note" type={markSystemIsNumeric ? 'number' : 'text'} inputProps={{ autoComplete: 'off' }} className={windowWidth <= 764 ? 'app-col-xs-12' : ''}/>               
                <TextField error={!subject.weight.validated} 
                            id={subjectWeightSystem} 
                            defaultValue={subject.weight.value}
                            onMouseDown={e => { setSubject({...subject, weight: {value : e.target.value, validated: true}})}} 
                            helperText={!subject.weight.validated && "La valeur saisie est incorrecte. Elle doit être un nombre entier."} 
                            onChange={(e) => { console.log(' e.target.value',  e.target.value); setSubject({...subject, weight: {value : e.target.value, validated: true}})}} 
                            label={subjectWeightSystem} type="number" inputProps={{ autoComplete: 'off' }} className={windowWidth <= 764 ? 'app-col-xs-12' : ''}/>
                <TextField error={!subject.rank.validated} 
                            id="Rang"
                            defaultValue={subject.rank.value}
                            onMouseDown={e => { setSubject({...subject, rank: {value : e.target.value, validated: true}})}} 
                            helperText={!subject.rank.validated && "La valeur saisie est incorrecte. Elle doit être un nombre entier."} 
                            onChange={(e) => { setSubject({...subject, rank: {value : e.target.value, validated: true}})}} 
                            label="Rang" type="number" inputProps={{ autoComplete: 'off' }} className={windowWidth <= 764 ? 'app-col-xs-12' : ''}/>
            </ThemeProvider>
        </Box>
        <ButtonLarge notStandard={windowWidth > 764}  name="Enregistrer les modifications" handleContinue={  validateInput } />
      </div>

    </div>
  );
};

export default SEMarkInput;
