import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import  { useForm, Controller }  from  "react-hook-form"
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice'
import { useUpdateCredentialMutation } from '../../store/apis/userApi';
import { useRouter } from 'next/router'
import helper from '../../utils/Helper';
import FooterSingleRow from '../../components/FooterSingleRow';
import { Loader2 } from "lucide-react";

const CredentialStart = () => {

  const user = helper.getLocalStorageWithExpiration('wendogouser')
  const currentDate = helper.getLocaleShortDateString(new Date())
  //const user = JSON.parse(localStorage.getItem('wendogouser'))
  console.log('useruser', user)
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    // use mode to specify the event that triggers each input field 
    mode: "onBlur"
  })
  const spinnerIsActive = useSelector((state) => state.spinner.activateSpinner)
  const [updateCredential] = useUpdateCredentialMutation()

  const newRef = useRef(null)
  
  const handleOutsideClick = (e) => {
      if (newRef.current && !newRef.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
        setCollapseSalutationOption(true)
        //console.log('Outside click CredentialStart')
      }
    };

  const [collapseSalutationOption, setCollapseSalutationOption] = useState(true)
  const toggleSalutationDropdown= () => {
    //console.log('ddd')
    setCollapseSalutationOption(!collapseSalutationOption)
  }
  const selectCheck = (<span className="pp-cons-e5r1zs-svg-size_sm-SelectedMain-selected_icon" data-ppui-info="icons_8.13.0" data-ppui="true">
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" data-ppui="true">
                                                      <path fillRule="evenodd" d="M19.62 6.207a1 1 0 0 1 .185 1.402L11.37 18.603a1.01 1.01 0 0 1-1.525.09l-4.996-5.13a1 1 0 1 1 1.433-1.396l4.198 4.311 7.74-10.086a1 1 0 0 1 1.402-.185z" clipRule="evenodd" data-ppui="true" />
                                                  </svg>
                                                </span>)
  //const salutationArray = 
  const [salutationArray, setSalutationArray] = useState([{value : 'Mr', selected: true},{value : 'Mme', selected: false},{value : 'Mlle', selected: false}])
  const [selectedSalutation, setSelectedSalutation] = useState('Mr')
  const updateSelectedSalutation = (value) => {
    setSelectedSalutation(value)
    setCollapseSalutationOption(!collapseSalutationOption)

    let pos1 = salutationArray.map(val => val.selected).indexOf(true)
    salutationArray[pos1].selected = false
    let pos = salutationArray.map(val => val.value).indexOf(value)
    salutationArray[pos].selected = true
    setSalutationArray(salutationArray)
  }
  const router = useRouter()

  const [displayEmailField, setDisplayEmailField] = useState(true)
  //const newRef = useRef(null)
  const dispatch = useDispatch()

  const toggleEmailField = () => {
    setDisplayEmailField(!displayEmailField)
  }

  async function onSubmitUserInfo (data)  {
    data = {...data, ...{salutation : selectedSalutation, phone : user?.phone}}
    console.log('data onSubmitUserInfo', data)
    try {
      dispatch(activateSpinner())
      const result = await updateCredential(data).unwrap();
      dispatch(deactivateSpinner())
      if(result.success){   
        console.log('👍👍', result)     
        helper.setLocalStorageWithExpiration('wendogouser', result.user, 3*60*60*1000)
        router.push(result.user?.subscription_step)
      }else if (result.errorId){
          const msgToast = () => (
              <div>
                <p>Une erreur est survenue. Nous en sommes désolé. Veuillez nous soumettre le problème 
                  <a href="https://m.me/wendogoHQ" style={{color: "rgb(1, 84, 192)"}}><b> ici.</b></a></p>
                <p>Code Erreur : {result.errorId} </p>
              </div>
            )
          helper.toastError(msgToast)             
      }
    } catch (error) {
      dispatch(deactivateSpinner())
      console.log('error',error);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

  })
 return <>{/*helper.redirectionAtInit(user, '/credentialstart') && */
      <div id="app-element-mountpoint">
        <div dir="ltr">
          <div>
            <div>
              <header className='pp-cons-1djyuxb-container_fluid' style={{display: 'initial'}}>
                  <div className="wendogo-logo" />
              </header>
              <main className="smsChallenge">
                <div>
                  <div className="innerContainer">
                    <div className="componentVisible">
                      <div className="elevationContainer pp-cons-0">
                        <form  onSubmit={handleSubmit(onSubmitUserInfo)} id="PageMainForm" className="signupAppContent" method="POST">
                          <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
                            <div className=" pp-cons-1jdwb3y-container_form" data-ppui-info="grid_3.2.9">
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
                                <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                                  <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                                    <div className="pp-cons-80b3zl-dropdown_menu_base" id="paypalAccountData_nationality" data-ppui-info="dropdown-menu_3.4.3">
                                      <button onClick={() => toggleSalutationDropdown()} className="pp-cons-ih2vqh-dropdown_menu_button-text_field_value_sm-active" type="button" id="dropdownMenuButton_paypalAccountData_nationality" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="dropdownMenuButton_paypalAccountData_nationality-label dropdownMenuButton_paypalAccountData_nationality" autoComplete="country" aria-describedby="paypalAccountData_nationality" aria-invalid="false" placeholder="" data-ppui="true">
                                        <span className="pp-cons-58354q-svg-size_sm-BackgroundMediumContrast-dropdown_menu_affordance_icon" data-ppui-info="icons_8.13.0" aria-hidden="true" data-ppui="true">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" data-ppui="true">
                                            <path fillRule="evenodd" d="M4.292 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 0 1 1.414 1.414L12.713 16.7a1.01 1.01 0 0 1-1.428 0L4.292 9.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" data-ppui="true" />
                                          </svg>
                                        </span>
                                        <span data-ppui="true">{selectedSalutation}</span>
                                        {/* <input type="hidden" name="salutation" value={selectedSalutation} {...register("salutation")} /> */}
                                      </button>
                                      <label id="dropdownMenuButton_paypalAccountData_nationality-label" htmlFor="dropdownMenuButton_paypalAccountData_nationality" className="pp-cons-19ayeth-dropdown_menu_label-text_field_label_lg-active-text_field_label_sm" data-ppui="true">
                                        <span data-ppui="true">Civilité</span>
                                      </label>
                                      <div ref={newRef} className="pp-cons-1ewrwkf-menu_container-elevation_level3" data-ppui-info="selection-menu_3.7.4" style={{height: 147, display: (collapseSalutationOption ? 'none' : '')}}>
                                          <ul className="pp-cons-11r0hsg-list" id="selectionMenu_235" tabIndex={0} role="listbox" aria-hidden="false" data-ppui="true" style={{ width: 528 }}>
                                              {salutationArray.map((item,id) => {
                                                return <li onClick={() => updateSelectedSalutation(item.value)} key={id} className="pp-cons-1cuk0h4-list_item" id="smenu_item_ZA" role="option" aria-selected="false" tabIndex={-1}>
                                                          <p data-ppui="true" className="pp-cons-1h6ioru-item_text-text_body">
                                                              <span className={"pp-cons-16jt5za-text_body"+(item.selected ? '_strong' : '')} data-ppui-info="body-text_6.5.1" data-ppui="true"> {item.value} </span>
                                                              {item.selected && selectCheck}
                                                          </p>
                                                      </li>})}
                                          </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                                  <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                                    <div className="pp-cons-1hv7ga5-text_input_base-text_body" data-ppui-info="text-input_5.1.6">
                                      <input  {...register("firstname", { required: true, minLength: 3, maxLength:46, pattern: /^[a-zA-ZÀ-ÿ-]+(?:\s(?:d[eu']|l[ea']|van\sder\s|de\s)?[a-zA-ZÀ-ÿ-]+)*$/ })} defaultValue={user?.firstname} 
                                      className="pp-cons-16mpn99-text_input_control-text_body-label_placeholder_shown_and_not_focused-text_body" 
                                      name="firstname" id="paypalAccountData_firstName" aria-invalid="false" placeholder=" " aria-labelledby="paypalAccountData_firstName-label"
                                        aria-label="" type="text" autoComplete="given-name" data-ppui="true"/>
                                      {errors.firstname && <p className='input-error'>Le prénom est requis et doit être valide</p>}

                                      <label htmlFor="paypalAccountData_firstName" id="paypalAccountData_firstName-label" className="pp-cons-7nxsij-label-text_field_label_sm" data-ppui="true"> Prénom </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                                  <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                                    <div className="pp-cons-1hv7ga5-text_input_base-text_body" data-ppui-info="text-input_5.1.6">
                                      <input  {...register("lastname", { required: true, minLength: 3, maxLength:46, pattern: /^[a-zA-ZÀ-ÿ-]+(?:\s(?:d[eu']|l[ea']|van\sder\s|de\s)?[a-zA-ZÀ-ÿ-]+)*$/ })} defaultValue={user?.lastname} 
                                      className="pp-cons-16mpn99-text_input_control-text_body-label_placeholder_shown_and_not_focused-text_body" 
                                      name="lastname" id="paypalAccountData_lastName" aria-invalid="false" placeholder=" " aria-labelledby="paypalAccountData_lastName-label" 
                                      aria-label="" type="text" autoComplete="family-name" data-ppui="true"/>
                                      {errors.lastname && <p className='input-error'>Le nom est requis et doit être valide</p>}
                                      <label htmlFor="paypalAccountData_lastName" id="paypalAccountData_lastName-label" className="pp-cons-7nxsij-label-text_field_label_sm" data-ppui="true"> Nom </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                                  <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                                    <div className="pp-cons-1hv7ga5-text_input_base-text_body" data-ppui-info="text-input_5.1.6">
                                      <input  {...register("birthdate", { required: true, max:currentDate, min:"1901-01-01" })} defaultValue={user?.birthdate} 
                                      className="pp-cons-16mpn99-text_input_control-text_body-label_placeholder_shown_and_not_focused-text_body" 
                                      name="birthdate" id="paypalAccountData_birthdate" aria-invalid="false"
                                      aria-label="" type="date" autoComplete="bday" data-ppui="true" aria-labelledby="paypalAccountData_birthdate-label" />
                                      {errors.birthdate && <p className='input-error'>La date de naissance est requise et doit être valide</p>}
                                      <label htmlFor="paypalAccountData_birthdate" id="paypalAccountData_birthdate-label" className="pp-cons-7nxsij-label-text_field_label_sm" data-ppui="true"> Date de naissance </label>
                                    </div>
                                  </div>
                                </div>
                                { displayEmailField &&
                                <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                                  <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                                    <div className="pp-cons-1hv7ga5-text_input_base-text_body" data-ppui-info="text-input_5.1.6">
                                      <input className="pp-cons-16mpn99-text_input_control-text_body-label_placeholder_shown_and_not_focused-text_body" name="email" 
                                              id="paypalAccountData_dob" aria-invalid="false" placeholder=" " aria-labelledby="paypalAccountData_dob-label" aria-label=""
                                              type="email" autoComplete="email" mask="11/11/1111" data-ppui="true" {...register("email", { required: true, minLength: 8, maxLength:46, pattern: /\S+@\S+\.\S+/ })}
                                              defaultValue={user?.email}/>
                                              {errors.email && <p className='input-error'>L'email est requis et doit être valide</p>}
                                      <label htmlFor="paypalAccountData_dob" id="paypalAccountData_dob-label" className="pp-cons-7nxsij-label-text_field_label_sm" data-ppui="true"> Adresse email </label>
                                    </div>
                                  </div>
                                </div>}
                                <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9">
                                  <div className=" pp-cons-1aqxtsc-col_form_full" align="center" data-ppui="true">
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                      <div className="checkbox-tooltip-container" style={{ textAlign: "left" }}>
                                        <div className="pp-cons-11m2iee-checkbox_base" data-id="checkbox" data-ppui-info="checkbox_4.5.1">
                                          <input type="checkbox" onClick={() => toggleEmailField()} id="paypalAccountData_termsAgree" name="doesntHaveEmail" data-automation-id="terms_checkbox" 
                                                data-ppui="true" className="pp-cons-1oy34km-checkbox_input" {...register("doesntHaveEmail")} />
                                          <label htmlFor="paypalAccountData_termsAgree" data-ppui="true" className="pp-cons-12v4qsp-label-text_body">
                                            <span data-ppui="true" className="pp-cons-bzuo57-checkbox_items">
                                              <span data-ppui="true" className="pp-cons-109pikv-checkmark_container">
                                                <span  className="pp-cons-1bt5b0y-svg-size_xs-check_icon" data-ppui-info="icons_8.13.0" data-ppui="true">
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18" width="1em" height="1em" data-ppui="true">
                                                    <path fillRule="evenodd" d="M7.69 11.474l5.517-7.19a1 1 0 0 1 1.586 1.218l-6.22 8.107a1 1 0 0 1-1.51.089l-3.35-3.44a1 1 0 1 1 1.433-1.396l2.544 2.612z" clipRule="evenodd" data-ppui="true" />
                                                  </svg>
                                                </span>
                                              </span>
                                              <span data-ppui="true" className="pp-cons-bzuo57-checkbox_items">
                                                <span data-ppui="true" className="pp-cons-1nvqybl-item_text">
                                                  <span className="pp-cons-2f2zb4-text_body" data-ppui-info="body-text_6.5.1" data-ppui="true">
                                                    <div className="pp-cons-151vsl0-text_caption" data-ppui-info="caption-text_6.5.1">
                                                      <span className="inherit_stylesV2"> Je n'ai pas d'adresse email </span>
                                                    </div>
                                                  </span>
                                                </span>
                                              </span>
                                            </span>
                                          </label>
                                        </div>
                                      </div>
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
      </div>}
 </> 
}

export default CredentialStart;
