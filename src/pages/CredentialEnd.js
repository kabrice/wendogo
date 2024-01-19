import React, { useState, useEffect, useRef } from 'react';
import { useCountriesQuery } from '../store/apis/userApi';
import { useSelector, useDispatch } from 'react-redux'
import  { useForm, Controller }  from  "react-hook-form"
import { activateSpinner, deactivateSpinner } from '../redux/spinnerslice'
import { useUpdateCredentialMutation } from '../store/apis/userApi';
import { useUpdateSubscriptionStepMutation } from '../store/apis/userApi';
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
  const user = helper.getLocalStorageWithExpiration('wendogouser')

  const {data} = useCountriesQuery(user.country)
  //let countries = data.countries
  //console.log('countries', user.country,  data?.countries)
  const { register, handleSubmit, formState: { errors } } = useForm({
    // use mode to specify the event that triggers each input field 
    mode: "onBlur"
  })
  const spinnerIsActive = useSelector((state) => state.spinner.activateSpinner)
  const [updateCredential] = useUpdateCredentialMutation()
  const [updateSubscriptionStep] = useUpdateSubscriptionStepMutation()

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
  
  const [descriptionValueCount, setDescriptionValueCount] = useState(null)

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

  //const newRef = useRef(null)
  const dispatch = useDispatch()


  async function onSubmitUserInfo (data)  {
    //Todo : Build countryList from server side
    const countryList = {
      "Afghanistan": "AF",
      "Afrique du Sud": "ZA",
      "Algérie": "DZ",
      "Allemagne": "DE",
      "Andorre": "AD",
      "Angola": "AO",
      "Anguilla": "AI",
      "Antarctique": "AQ",
      "Antigua-et-Barbuda": "AG",
      "Arabie Saoudite": "SA",
      "Argentine": "AR",
      "Arménie": "AM",
      "Aruba": "AW",
      "Australie": "AU",
      "Autriche": "AT",
      "Azerbaïdjan": "AZ",
      "Bahamas": "BS",
      "Bahreïn": "BH",
      "Bangladesh": "BD",
      "Barbade": "BB",
      "Belgique": "BE",
      "Belize": "BZ",
      "Bénin": "BJ",
      "Bermudes": "BM",
      "Bhoutan": "BT",
      "Biélorussie": "BY",
      "Bolivie": "BO",
      "Bonaire, Saint-Eustache et Saba": "BQ",
      "Bosnie-Herzégovine": "BA",
      "Botswana": "BW",
      "Brésil": "BR",
      "Brunei": "BN",
      "Bulgarie": "BG",
      "Burkina Faso": "BF",
      "Burundi": "BI",
      "Cambodge": "KH",
      "Cameroun": "CM",
      "Canada": "CA",
      "Cap Vert": "CV",
      "Chili": "CL",
      "Chine": "CN",
      "Chypre": "CY",
      "Colombie": "CO",
      "Comores": "KM",
      "Congo": "CG",
      "Congo (Rép. dém.)": "CD",
      "Corée du Nord": "KP",
      "Corée du Sud": "KR",
      "Costa Rica": "CR",
      "Côte d'Ivoire": "CI",
      "Croatie": "HR",
      "Cuba": "CU",
      "Curaçao": "CW",
      "Danemark": "DK",
      "Djibouti": "DJ",
      "Dominique": "DM",
      "Égypte": "EG",
      "Émirats arabes unis": "AE",
      "Équateur": "EC",
      "Érythrée": "ER",
      "Espagne": "ES",
      "Estonie": "EE",
      "États-Unis": "US",
      "Éthiopie": "ET",
      "Fidji": "FJ",
      "Finlande": "FI",
      "France": "FR",
      "Gabon": "GA",
      "Gambie": "GM",
      "Géorgie": "GE",
      "Ghana": "GH",
      "Gibraltar": "GI",
      "Grèce": "GR",
      "Grenade": "GD",
      "Groenland": "GL",
      "Guadeloupe": "GP",
      "Guam": "GU",
      "Guatemala": "GT",
      "Guayane": "GF",
      "Guernesey": "GG",
      "Guinée": "GN",
      "Guinée-Bissau": "GW",
      "Guinée-Équatoriale": "GQ",
      "Guyane": "GY",
      "Haïti": "HT",
      "Honduras": "HN",
      "Hong Kong": "HK",
      "Hongrie": "HU",
      "Île Bouvet": "BV",
      "Île Christmas": "CX",
      "Île de Man": "IM",
      "Île de Norfolk": "NF",
      "Île Maurice": "MU",
      "Îles Caïmans": "KY",
      "Îles Cocos": "CC",
      "Îles Cook": "CK",
      "Îles Féroé": "FO",
      "Îles Heard-et-MacDonald": "HM",
      "Îles Malouines": "FK",
      "Îles Mariannes du Nord": "MP",
      "Îles Marshall": "MH",
      "Îles mineures éloignées des États-Unis": "UM",
      "Îles Pitcairn": "PN",
      "Îles Salomon": "SB",
      "Îles Turques-et-Caïques": "TC",
      "Îles Vierges britanniques": "VG",
      "Îles Vierges des États-Unis": "VI",
      "Inde": "IN",
      "Indonésie": "ID",
      "Irak": "IQ",
      "Iran": "IR",
      "Irlande": "IE",
      "Islande": "IS",
      "Israël": "IL",
      "Italie": "IT",
      "Jamaïque": "JM",
      "Japon": "JP",
      "Jersey": "JE",
      "Jordanie": "JO",
      "Kazakhstan": "KZ",
      "Kenya": "KE",
      "Kirghizistan": "KG",
      "Kiribati": "KI",
      "Koweït": "KW",
      "Laos": "LA",
      "Lesotho": "LS",
      "Lettonie": "LV",
      "Liban": "LB",
      "Liberia": "LR",
      "Libye": "LY",
      "Liechtenstein": "LI",
      "Lituanie": "LT",
      "Luxembourg": "LU",
      "Macao": "MO",
      "Macédoine du Nord": "MK",
      "Madagascar": "MG",
      "Malaisie": "MY",
      "Malawi": "MW",
      "Maldives": "MV",
      "Mali": "ML",
      "Malte": "MT",
      "Maroc": "MA",
      "Martinique": "MQ",
      "Mauritanie": "MR",
      "Mayotte": "YT",
      "Mexique": "MX",
      "Micronésie": "FM",
      "Moldavie": "MD",
      "Monaco": "MC",
      "Mongolie": "MN",
      "Monténégro": "ME",
      "Montserrat": "MS",
      "Mozambique": "MZ",
      "Myanmar": "MM",
      "Namibie": "NA",
      "Nauru": "NR",
      "Népal": "NP",
      "Nicaragua": "NI",
      "Niger": "NE",
      "Nigéria": "NG",
      "Niue": "NU",
      "Norvège": "NO",
      "Nouvelle-Calédonie": "NC",
      "Nouvelle-Zélande": "NZ",
      "Oman": "OM",
      "Ouzbékistan": "UZ",
      "Pakistan": "PK",
      "Palaos": "PW",
      "Palestine": "PS",
      "Panama": "PA",
      "Papouasie-Nouvelle-Guinée": "PG",
      "Paraguay": "PY",
      "Pays-Bas": "NL",
      "Pérou": "PE",
      "Philippines": "PH",
      "Pologne": "PL",
      "Polynésie française": "PF",
      "Porto Rico": "PR",
      "Portugal": "PT",
      "Qatar": "QA",
      "République centrafricaine": "CF",
      "République dominicaine": "DO",
      "République tchèque": "CZ",
      "Réunion": "RE",
      "Roumanie": "RO",
      "Royaume-Uni": "GB",
      "Russie": "RU",
      "Rwanda": "RW",
      "Sahara Occidental": "EH",
      "Saint Martin (partie néerlandaise)": "SX",
      "Saint-Barthélemy": "BL",
      "Saint-Christophe-et-Niévès": "KN",
      "Saint-Lucie": "LC",
      "Saint-Marin": "SM",
      "Saint-Martin": "MF",
      "Saint-Pierre-et-Miquelon": "PM",
      "Saint-Vincent-et-les-Grenadines": "VC",
      "Sainte-Hélène": "SH",
      "Salvador": "SV",
      "Samoa": "WS",
      "Samoa américaines": "AS",
      "Sao Tomé-et-Principe": "ST",
      "Sénégal": "SN",
      "Serbie": "RS",
      "Seychelles": "SC",
      "Sierra Leone": "SL",
      "Singapour": "SG",
      "Slovaquie": "SK",
      "Slovénie": "SI",
      "Somalie": "SO",
      "Soudan": "SD",
      "Soudan du Sud": "SS",
      "Sri Lanka": "LK",
      "Suède": "SE",
      "Suisse": "CH",
      "Surinam": "SR",
      "Svalbard et Jan Mayen": "SJ",
      "Swaziland": "SZ",
      "Syrie": "SY",
      "Tadjikistan": "TJ",
      "Taïwan": "TW",
      "Tanzanie": "TZ",
      "Tchad": "TD",
      "Terres australes et antarctiques françaises": "TF",
      "Territoire britannique de l'océan Indien": "IO",
      "Thaïlande": "TH",
      "Timor oriental": "TL",
      "Togo": "TG",
      "Tokelau": "TK",
      "Tonga": "TO",
      "Trinité et Tobago": "TT",
      "Tunisie": "TN",
      "Turkménistan": "TM",
      "Turquie": "TR",
      "Tuvalu": "TV",
      "Uganda": "UG",
      "Ukraine": "UA",
      "Uruguay": "UY",
      "Vanuatu": "VU",
      "Venezuela": "VE",
      "Viêt Nam": "VN",
      "voir Saint": "BL",
      "Wallis-et-Futuna": "WF",
      "Yémen": "YE",
      "Zambie": "ZM",
      "Zimbabwe": "ZW"
    }
  
    data = {...data, ...{country : countryList[selectedCountry], city : selectedCity, phone : user.phone}}
    user.occupation = data.occupation
    user.description = data.description
    helper.setLocalStorageWithExpiration('wendogouser', user, 3*60*60*1000)
    console.log('data onSubmitUserInfo', data)
    try {
      dispatch(activateSpinner())
      const result = await updateCredential(data).unwrap();
      dispatch(deactivateSpinner())
      if(result.success){   
        console.log('credentialend 👍👍', result)  
        helper.setLocalStorageWithExpiration('wendogouser', result.user, 5*60*1000)   
        navigate(result?.user?.subscription_step)
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
  async function goToCredentialStartPage()  {
    try {
      dispatch(activateSpinner())
      const result = await updateSubscriptionStep({subscriptionStep : '/credentialstart', phone : user.phone}).unwrap();
      dispatch(deactivateSpinner())
      if(result.success){   
        helper.setLocalStorageWithExpiration('wendogouser', result.user, 10*60*1000)
        navigate(result?.user?.subscription_step)
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
 return   <>{helper.redirectionAtInit(user, '/credentialend') &&  <>
            <div id="app-element-mountpoint">
              <div dir="ltr">
                <div>
                  <div>
                    <header className='pp-cons-1djyuxb-container_fluid' style={{ maxWidth: '50rem'}}>
                      <div className='headerRowDefault pp-cons-12vsk8k-row-no_gutter'>
                        <div className="countrySelectorLeftAlign pp-cons-lcrspw-col_auto" align="left" style={{ paddingLeft: "0.25rem", paddingRight: "0.25rem", minWidth: "6.3rem" }} data-ppui="true">
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <button data-ppui-info="icon-button_3.4.3" onClick={() => goToCredentialStartPage()} className="iconButtonHover pp-cons-1686jie-icon-button_base-tertiary" type="button" id="paypalAccountData_backButton" href="#" aria-label="Retour">
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
                                            <textarea rows="10" {...register("description", { required: true, minLength: 200, maxLength:2500})} defaultValue={user.description}
                                            className="pp-cons-16mpn99-text_input_control-text_body-label_placeholder_shown_and_not_focused-text_body" 
                                            name="description" id="paypalAccountData_description" aria-invalid="false" placeholder="IMPORTANT : Décrivez ici votre parcours académique et professionnel, ce que vous avez déjà intenté comme démarche, toutes questions sur l'immagration ou demande de visa; et tout autres détails utiles." 
                                            aria-labelledby="paypalAccountData_description-label" 
                                            aria-label="" type="text"  data-ppui="true" onChange={e => setDescriptionValueCount(e.target.value.length)}/>
                                            {descriptionValueCount && <p>{descriptionValueCount} caractère{descriptionValueCount>1 && 's'}</p>}
                                            {errors.description && <p className='input-error'>La description de votre projet est requise et contenir et respecter la limite de 200 à 2500 caractères.</p>}
                                            {descriptionValueCount <1 && <label htmlFor="paypalAccountData_description" id="paypalAccountData_description-label" className="pp-cons-7nxsij-label-text_field_label_sm" data-ppui="true"> Description du projet de voyage*</label>}
                                            {!descriptionValueCount && <i>(*) Cliquer dans la zone de texte pour plus de détails</i>}            
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
            </> }</>
}

export default CredentialEnd;
