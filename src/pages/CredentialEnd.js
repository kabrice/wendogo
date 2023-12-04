import React, { useState, useEffect, useRef } from 'react';
import { useCountriesQuery } from '../store/apis/userApi';
import { useSelector, useDispatch } from 'react-redux'
import  { useForm, Controller }  from  "react-hook-form"
import { activateSpinner, deactivateSpinner } from '../redux/spinnerslice'
import { useUpdateCredentialMutation } from '../store/apis/userApi';
import { useNavigate } from "react-router-dom"
import helper from '../utils/Helper'
import {close} from '../redux/modalslice'
import FooterSingleRow from '../components/FooterSingleRow';

const  CredentialEnd = () => {

  const selectCheck = (<span className="pp-cons-e5r1zs-svg-size_sm-SelectedMain-selected_icon" data-ppui-info="icons_8.13.0" data-ppui="true">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" data-ppui="true">
                              <path fillRule="evenodd" d="M19.62 6.207a1 1 0 0 1 .185 1.402L11.37 18.603a1.01 1.01 0 0 1-1.525.09l-4.996-5.13a1 1 0 1 1 1.433-1.396l4.198 4.311 7.74-10.086a1 1 0 0 1 1.402-.185z" clipRule="evenodd" data-ppui="true" />
                          </svg>
                        </span>)
  //const user = useSelector((state) => state.user.user)
  const user = JSON.parse(localStorage.getItem('wendgouser'))

  const {data} = useCountriesQuery('CM')
  //let countries = data.countries
  //console.log('countries', user.country,  data?.countries)
  const { register, handleSubmit, formState: { errors } } = useForm({
    // use mode to specify the event that triggers each input field 
    mode: "onBlur"
  })
  const spinnerIsActive = useSelector((state) => state.spinner.activateSpinner)
  const [updateCredential] = useUpdateCredentialMutation()

  const newRef = useRef(null)
  //const newRef = useRef(null)
  
  const handleOutsideClick = (e) => {
      if (newRef.current && !newRef.current.contains(e.target)) {
        setCollapseCountryOption(true)
        setCollapseCityOption(true)
      }
    };

  const [collapseCountryOption, setCollapseCountryOption] = useState(true)
  const toggleCountryDropdown= () => {
    //console.log('ddd')
    setCollapseCountryOption(!collapseCountryOption)
  }


  const [collapseCityOption, setCollapseCityOption] = useState(true)
  const toggleCityDropdown= () => {
    //console.log('ddd')
    setCollapseCityOption(!collapseCityOption)
  }

  const [countryArray, setCountryArray] = useState(null)
  const [cityArray, setCityArray] = useState(null)
  
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const updateSelectedCountry = (value) => {
    setSelectedCountry(value)
    setCollapseCountryOption(!collapseCountryOption)
    let clonedCountryArray = [...countryArray]
    clonedCountryArray = clonedCountryArray.map((item) => ({ ...item }));
    clonedCountryArray.map(item => {
      item.selected = !(item.selected === true)
      return item
    })
    clonedCountryArray.map(item => {
      item.selected  = (item.value === value)
      return item 
    })
    setCountryArray(clonedCountryArray)
  }

  const updateSelectedCity = (value) => {
    setSelectedCity(value)
    setCollapseCityOption(!collapseCityOption)
    let clonedCityArray = [...cityArray]
    clonedCityArray = clonedCityArray.map((item) => ({ ...item }));
    clonedCityArray.map(item => {
      item.selected = !(item.selected === true)
      return item
    })
    clonedCityArray.map(item => {
      item.selected  = (item.value === value)
      return item 
    })
    setCityArray(clonedCityArray)
  }

  const navigate = useNavigate()

  const [displayEmailField, setDisplayEmailField] = useState(true)
  //const newRef = useRef(null)
  const dispatch = useDispatch()

  const toggleEmailField = () => {
    setDisplayEmailField(!displayEmailField)
  }
  async function onSubmitUserInfo (data)  {
    data = {...data, ...{country : selectedCountry, city : selectedCity, phone : user.phone}}
    console.log('data onSubmitUserInfo', data)
    try {
      // dispatch(activateSpinner())
      // const result = await updateCredential(data).unwrap();
      // dispatch(deactivateSpinner())
      // if(result.success){   
      //   console.log('👍👍', result)     
      //   navigate('/credentialend')
      // }else if (result.errorId){
      //     const msgToast = () => (
      //         <div>
      //           <p>Une erreur est survenue. Nous en sommes désolé. Veuillez nous soumettre le problème 
      //             <a href="https://m.me/wendogoHQ" style={{color: "rgb(1, 84, 192)"}}><b> ici.</b></a></p>
      //           <p>Code Erreur : {result.errorId} </p>
      //         </div>
      //       )
      //     helper.toastError(msgToast)             
      // }
    } catch (error) {
      dispatch(deactivateSpinner())
      console.log('error',error);
    }
  }
  const goToPreviewsPage = () => {
    navigate('/credentialstart')
  }

  useEffect(() => {
    //console.log('data', data?.countries)
    let clonedCountryArray = []
    let clonedCityArray = []

    if(data){
      clonedCountryArray = (data.countries).map((item) => ({ ...item }));
      let myCountries = clonedCountryArray.sort((a, b) => a.value.localeCompare(b.value))
      
      clonedCityArray = (data.cities).map((item) => ({ ...item }));
      let myCities = clonedCityArray.sort((a, b) => a.value.localeCompare(b.value))     

      myCountries.forEach(item => {
        if(item.selected === true){
          setSelectedCountry(item.value)
        }
      })
      myCities.forEach(item => {
        if(item.selected === true){
          setSelectedCity(item.value)
        }
      })
      setCountryArray(myCountries)
      setCityArray(myCities)
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

  }, [data])
 return <>
 <div id="app-element-mountpoint">
   <div dir="ltr">
     <div>
       <div>
        <header className='pp-cons-1djyuxb-container_fluid' style={{ maxWidth: '50rem'}}>
          <div className='headerRowDefault pp-cons-12vsk8k-row-no_gutter'>
            <div className="countrySelectorLeftAlign pp-cons-lcrspw-col_auto" align="left" style={{ paddingLeft: "0.25rem", paddingRight: "0.25rem", minWidth: "6.3rem" }} data-ppui="true">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button data-ppui-info="icon-button_3.4.3" onClick={() => goToPreviewsPage()} className="iconButtonHover pp-cons-1686jie-icon-button_base-tertiary" type="button" id="paypalAccountData_backButton" href="#" aria-label="Retour">
                    <span className="pp-cons-1am46ks-svg-size_sm-icon" data-ppui-info="icons_8.13.0" aria-hidden="true" data-ppui="true">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" data-ppui="true">
                        <path d="M9.707 17.29a1 1 0 1 1-1.414 1.414L2.3 12.711a.997.997 0 0 1 0-1.428L8.293 5.29a1 1 0 0 1 1.414 1.414l-4.293 4.293H21a1 1 0 1 1 0 2H5.414l4.293 4.293z" data-ppui="true" />
                      </svg>
                    </span>
                    <span data-ppui="true" className="pp-cons-geb0bj-screenReader" />
                  </button>
                </div>
              </div>
              <div className="wendogo-logo" />
              <div className="pp-cons-y9ni7b-col_1" align="right" style={{ paddingLeft: "0.25rem", paddingRight: "0.25rem", minWidth: "6.3rem" }} data-ppui="true" />
            </div>
        </header>
         <main className="smsChallenge">
           <div>
             <div className="innerContainer">
               <div className="componentVisible">
                 <div className="elevationContainer pp-cons-0">
                   <form  onSubmit={handleSubmit(onSubmitUserInfo)} id="PageMainForm" className="signupAppContent" method="POST">
                     <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
                       <div className=" pp-cons-1jdwb3y-container_form" data-ppui-info="grid_3.2.9" style={{marginTop : 33}}>
                         <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                           <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                             <div className="pp-cons-ttr2i5-text_heading_sm" data-ppui-info="heading-text_6.5.1" id="paypalAccountData_createAccountHeading" style={{ marginBottom: "-0.5rem" }}>
                               <span className="inherit_stylesV2"> Informations personnelles </span>
                             </div>
                           </div>
                         </div>
                         {/* <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                           <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                             <div className="pp-cons-16jt5za-text_body" data-ppui-info="body-text_6.5.1" id="paypalAccountData_createAccountSubHeading" style={{ marginBottom: "1.5rem" }}>
                               <span className="inherit_stylesV2"> Assurez-vous que ces informations correspondent à votre pièce d'identité officielle. </span>
                             </div>
                           </div>
                         </div> */}
                       </div>
                       <div className="formFieldsContainer">
                         <div className=" pp-cons-1jdwb3y-container_form" data-ppui-info="grid_3.2.9">
                          
                           {countryArray && <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                             <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                               <div className="pp-cons-80b3zl-dropdown_menu_base" id="paypalAccountData_nationality" data-ppui-info="dropdown-menu_3.4.3">
                                 <button onClick={() => toggleCountryDropdown()} className="pp-cons-ih2vqh-dropdown_menu_button-text_field_value_sm-active" type="button" id="dropdownMenuButton_paypalAccountData_nationality" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="dropdownMenuButton_paypalAccountData_nationality-label dropdownMenuButton_paypalAccountData_nationality" autoComplete="country" aria-describedby="paypalAccountData_nationality" aria-invalid="false" placeholder="" data-ppui="true">
                                   <span className="pp-cons-58354q-svg-size_sm-BackgroundMediumContrast-dropdown_menu_affordance_icon" data-ppui-info="icons_8.13.0" aria-hidden="true" data-ppui="true">
                                     <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" data-ppui="true">
                                       <path fillRule="evenodd" d="M4.292 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 0 1 1.414 1.414L12.713 16.7a1.01 1.01 0 0 1-1.428 0L4.292 9.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" data-ppui="true" />
                                     </svg>
                                   </span>
                                   <span data-ppui="true">{selectedCountry}</span>
                                 </button>
                                 <label id="dropdownMenuButton_paypalAccountData_nationality-label" htmlFor="dropdownMenuButton_paypalAccountData_nationality" className="pp-cons-19ayeth-dropdown_menu_label-text_field_label_lg-active-text_field_label_sm" data-ppui="true">
                                   <span data-ppui="true">Pays</span>
                                 </label>
                                 <div ref={newRef} className="pp-cons-1ewrwkf-menu_container-elevation_level3" data-ppui-info="selection-menu_3.7.4" style={{height: 147, display: (collapseCountryOption ? 'none' : '')}}>
                                    <ul className="pp-cons-11r0hsg-list" id="selectionMenu_235" tabIndex={0} role="listbox" aria-hidden="false" data-ppui="true" style={{ width: 528 }}>
                                        {countryArray.map((item,id) => {
                                          return <li onClick={() => updateSelectedCountry(item.value)} key={id} className="pp-cons-1cuk0h4-list_item" id="smenu_item_ZA" role="option" aria-selected="false" tabIndex={-1}>
                                                    <p data-ppui="true" className="pp-cons-1h6ioru-item_text-text_body">
                                                        <span className={"pp-cons-16jt5za-text_body"+(item.selected ? '_strong' : '')} data-ppui-info="body-text_6.5.1" data-ppui="true"> {item.value} </span>
                                                        {item.selected && selectCheck}
                                                    </p>
                                                </li>})}
                                    </ul>
                                </div>
                               </div>
                             </div>
                           </div>}
                           {cityArray && <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                             <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                               <div className="pp-cons-80b3zl-dropdown_menu_base" id="paypalAccountData_nationality" data-ppui-info="dropdown-menu_3.4.3">
                                 <button onClick={() => toggleCityDropdown()} className="pp-cons-ih2vqh-dropdown_menu_button-text_field_value_sm-active" type="button" id="dropdownMenuButton_paypalAccountData_nationality" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="dropdownMenuButton_paypalAccountData_nationality-label dropdownMenuButton_paypalAccountData_nationality" autoComplete="city" aria-describedby="paypalAccountData_nationality" aria-invalid="false" placeholder="" data-ppui="true">
                                   <span className="pp-cons-58354q-svg-size_sm-BackgroundMediumContrast-dropdown_menu_affordance_icon" data-ppui-info="icons_8.13.0" aria-hidden="true" data-ppui="true">
                                     <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" data-ppui="true">
                                       <path fillRule="evenodd" d="M4.292 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 0 1 1.414 1.414L12.713 16.7a1.01 1.01 0 0 1-1.428 0L4.292 9.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" data-ppui="true" />
                                     </svg>
                                   </span>
                                   <span data-ppui="true">{selectedCity}</span>
                                 </button>
                                 <label id="dropdownMenuButton_paypalAccountData_nationality-label" htmlFor="dropdownMenuButton_paypalAccountData_nationality" className="pp-cons-19ayeth-dropdown_menu_label-text_field_label_lg-active-text_field_label_sm" data-ppui="true">
                                   <span data-ppui="true">Ville</span>
                                 </label>
                                 <div ref={newRef} className="pp-cons-1ewrwkf-menu_container-elevation_level3" data-ppui-info="selection-menu_3.7.4" style={{height: 147, display: (collapseCityOption ? 'none' : '')}}>
                                    <ul className="pp-cons-11r0hsg-list" id="selectionMenu_235" tabIndex={0} role="listbox" aria-hidden="false" data-ppui="true" style={{ width: 528 }}>
                                        {cityArray.map((item,id) => {
                                          return <li onClick={() => updateSelectedCity(item.value)} key={id} className="pp-cons-1cuk0h4-list_item" id="smenu_item_ZA" role="option" aria-selected="false" tabIndex={-1}>
                                                    <p data-ppui="true" className="pp-cons-1h6ioru-item_text-text_body">
                                                        <span className={"pp-cons-16jt5za-text_body"+(item.selected ? '_strong' : '')} data-ppui-info="body-text_6.5.1" data-ppui="true"> {item.value} </span>
                                                        {item.selected && selectCheck}
                                                    </p>
                                                </li>})}
                                    </ul>
                                </div>
                               </div>
                             </div>
                           </div>}                           
                           <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                             <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                               <div className="pp-cons-1hv7ga5-text_input_base-text_body" data-ppui-info="text-input_5.1.6">
                                 <input  {...register("occupation", { required: true, minLength: 5, maxLength:46})} defaultValue={user.occupation} 
                                 className="pp-cons-16mpn99-text_input_control-text_body-label_placeholder_shown_and_not_focused-text_body" 
                                 name="occupation" id="paypalAccountData_occupation" aria-invalid="false" placeholder="Que faites-vous actuellement dans la vie." aria-labelledby="paypalAccountData_occupation-label"
                                  aria-label="" type="text"  data-ppui="true"/>
                                 {errors.occupation && <p className='input-error'>La profession est requis et doit être valide.</p>}

                                 <label htmlFor="paypalAccountData_occupation" id="paypalAccountData_occupation-label" className="pp-cons-7nxsij-label-text_field_label_sm" data-ppui="true"> Profession </label>
                               </div>
                             </div>
                           </div>
                           <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                             <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                               <div className="pp-cons-1hv7ga5-text_input_base-text_body" data-ppui-info="text-input_5.1.6">
                                 <textarea rows="10" {...register("description", { required: true, minLength: 200, maxLength:2500})} 
                                 className="pp-cons-16mpn99-text_input_control-text_body-label_placeholder_shown_and_not_focused-text_body" 
                                 name="description" id="paypalAccountData_description" aria-invalid="false" placeholder="Renseignez votre parcours académique et professionnel, ce que vous avez déjà intenté comme démarche, et tout autres détails utiles." 
                                 aria-labelledby="paypalAccountData_description-label" 
                                 aria-label="" type="text"  data-ppui="true"/>
                                 {errors.description && <p className='input-error'>La description de votre projet est requise et contenir au moins 200 caractères.</p>}
                                 <label htmlFor="paypalAccountData_description" id="paypalAccountData_description-label" className="pp-cons-7nxsij-label-text_field_label_sm" data-ppui="true"> Description du projet </label>
                               </div>
                             </div>
                           </div>
                           <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                             <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                               <button disabled={spinnerIsActive} type="submit" className="pp-cons-ylhy9c-button_base-text_button_lg-btn_full_width" data-ppui-info="buttons_7.5.4" name="/appData/action" id="paypalAccountData_emailPassword" value="address" data-automation-id="page_submit" style={{ margin: "1.5rem 0px 2.5rem", minWidth: "18rem" }}> Suivant </button>
                             </div>
                           </div>
                         </div>
                       </div>
                     </fieldset>
                   </form>
                 </div>
               </div>
               <div id="injectedUnifiedLogin" style={{ height: 0, width: 0, visibility: "hidden", overFlow: "hidden" }} />
             </div>
           </div>
         </main>
         <div className="componentVisible">
          <FooterSingleRow/>
         </div>
        </div>
     </div>
   </div>
 </div>
 <div>
 </div>
 </> 
}

export default CredentialEnd;
