import React from 'react';
import WendogoLogo from '../assets/wendogo_logo.svg'
import ParisCity from '../assets/AdobeStock_Paris.jpeg'
import OptimizedImage from './OptimizedImage';
import Image from 'next/image';
 

const Footer = () => {
    return (
<div className="Footer__Container-sc-1adny8q-0 fThLJG styles__Footer-sc-kz84w6-4 icxpqI">
                  <Image src={ParisCity} alt="ParisCity" className="kldsmk" /> 
                  <hr className="Divider-sc-1qii385-0 Footer__Divider-sc-1adny8q-2 iyJAir jUFmLt" />
                  <div className="Footer__Legal-sc-1adny8q-3 AgRYh">
                    {/* <Image src={WendogoLogo} alt="WendogoLogo" className="dssdsd" /> */}
                    <WendogoLogo className="dssdsd"/>
                    <div data-nosnippet="true">
                      <p className="LegalSocial__Disclaimer-sc-v4d14j-4 kiQXRg"> Wendogo Consulting  est une société par actions simplifiée, immatriculée à l'ORIAS en tant 
                                  que conseil en systemes et logiciels informatiques sous le numéro 497 933 408, dont le siège social est situé 50 avenue des Champs-Elysees 75008 Paris. Un contrat vous engage et doit être respecté. Vérifiez vos capacités financières avant de vous engager. </p>
                    </div>
                    <ul className="LegalSocial__SocialLinks-sc-v4d14j-2 bwSQCq">
                      <li>
                        <a aria-label="Wendogo sur Instagram" href="https://www.instagram.com/WendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR">
                          <svg height={46} viewBox="0 0 46 46" width={46} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                            <path d="M23,16.44c2.14,0,2.39,0,3.23,0a4.09,4.09,0,0,1,1.49.28,2.56,2.56,0,0,1,1.51,1.51,4.32,4.32,0,0,1,.28,1.49c0,.84,0,1.09,0,3.23s0,2.39,0,3.23a4,4,0,0,1-.28,1.49,2.42,2.42,0,0,1-.59.92,2.57,2.57,0,0,1-.92.6,4.39,4.39,0,0,1-1.49.27c-.84,0-1.09,0-3.23,0s-2.39,0-3.23,0a4.28,4.28,0,0,1-1.49-.27,2.67,2.67,0,0,1-1.52-1.52,4.28,4.28,0,0,1-.27-1.49c0-.84,0-1.09,0-3.23s0-2.39,0-3.23a4.39,4.39,0,0,1,.27-1.49,2.57,2.57,0,0,1,.6-.92,2.42,2.42,0,0,1,.92-.59,4.21,4.21,0,0,1,1.49-.28C20.61,16.45,20.86,16.44,23,16.44ZM23,15c-2.17,0-2.45,0-3.3.05a5.85,5.85,0,0,0-1.94.37,3.94,3.94,0,0,0-1.42.92,4.17,4.17,0,0,0-.92,1.42,5.85,5.85,0,0,0-.37,1.94c0,.85-.05,1.13-.05,3.3s0,2.44.05,3.3a5.85,5.85,0,0,0,.37,1.94,3.94,3.94,0,0,0,.92,1.42,4.17,4.17,0,0,0,1.42.92A5.85,5.85,0,0,0,19.7,31c.86,0,1.13.05,3.3.05s2.45,0,3.3-.05a5.85,5.85,0,0,0,1.94-.37,3.86,3.86,0,0,0,1.42-.92,4,4,0,0,0,.92-1.42A5.82,5.82,0,0,0,31,26.3c0-.86,0-1.13,0-3.3s0-2.45,0-3.3a5.82,5.82,0,0,0-.38-1.94,4,4,0,0,0-2.34-2.34A5.77,5.77,0,0,0,26.3,15C25.44,15,25.17,15,23,15Z" />
                            <path d="M23,18.89A4.11,4.11,0,1,0,27.11,23,4.11,4.11,0,0,0,23,18.89Zm0,6.78A2.67,2.67,0,1,1,25.67,23,2.68,2.68,0,0,1,23,25.67Z" />
                            <path d="M27.27,19.69a1,1,0,1,0-1-1A1,1,0,0,0,27.27,19.69Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a aria-label="Wendogo sur Facebook" href="https://www.facebook.com/wendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR">
                          <svg height={46} viewBox="0 0 46 46" width={46} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                            <path d="M23.05,15a8,8,0,0,1,1.26,16V25.38h1.87l.36-2.33H24.31V21.54a1.17,1.17,0,0,1,1.3-1.26h1v-2a12.14,12.14,0,0,0-1.8-.16h0a2.84,2.84,0,0,0-3,3.14v1.77h-2v2.33h2V31a8,8,0,0,1,1.26-16Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a aria-label="Wendogo sur Tiktok" href="https://www.tiktok.com/@WendogoHQ/" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR">
                          <svg height={16} viewBox="0 0 46 46" width={46} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                            <path d="M40.2715758,9.83775879 C39.9133631,9.67729534 39.5646438,9.5013895 39.2267272,9.31070178 C38.2440792,8.74766606 37.3431304,8.08424036 36.5432905,7.33471711 C34.542046,5.35010787 33.7946199,3.33675006 33.5193106,1.92711211 L33.5303671,1.92711211 C33.3003899,0.757045533 33.3954766,0 33.4098502,0 L24.2947896,0 L24.2947896,30.5482247 C24.2947896,30.9583709 24.2947896,31.3637257 24.2748878,31.764289 C24.2748878,31.8141198 24.2693595,31.8601175 24.2660425,31.9137815 C24.2660425,31.9358221 24.2660425,31.9588209 24.2605142,31.9818198 C24.2605142,31.9875695 24.2605142,31.9933192 24.2605142,31.9990689 C24.0654057,34.2248215 22.605661,36.2206495 20.3663799,37.3233031 C19.2170949,37.8899902 17.9172283,38.1872478 16.5949738,38.18576 C12.3481339,38.18576 8.90621453,35.1844099 8.90621453,31.4777616 C8.90621453,27.7711134 12.3481339,24.7697632 16.5949738,24.7697632 C17.3988805,24.7691165 18.1978387,24.8787594 18.9621917,25.094622 L18.9732483,17.0507736 C14.2821103,16.5255773 9.5513622,17.7250543 5.92646098,20.3587751 C4.35539052,21.5418752 3.03458517,22.9535222 2.02348138,24.5301919 C1.63871172,25.1051631 0.186980214,27.4155895 0.0111802824,31.1653606 C-0.099385712,33.2937126 0.638089471,35.4987275 0.989689333,36.410057 L0.989689333,36.4292227 C1.21082132,36.9658626 2.06770778,38.7971462 3.46415629,40.3409441 C4.5902012,41.5793024 5.92058651,42.6671347 7.41246795,43.5694079 L7.41246795,43.5502422 L7.43458115,43.5694079 C11.84727,46.1682781 16.7398152,45.9977033 16.7398152,45.9977033 C17.5867508,45.9679965 20.4238742,45.9977033 23.6457672,44.674311 C27.2192602,43.207176 29.2536745,41.0213268 29.2536745,41.0213268 C30.5533638,39.7152599 31.5868296,38.2268318 32.3097186,36.6199215 C33.1345409,34.7407237 33.4098502,32.4868362 33.4098502,31.5860479 L33.4098502,15.3795238 C33.5204162,15.4370209 34.9931553,16.2812704 34.9931553,16.2812704 C34.9931553,16.2812704 37.1149167,17.4599615 40.4252626,18.2275482 C42.8002201,18.7737709 46,18.8887652 46,18.8887652 L46,11.0461568 C44.8788608,11.1515682 42.602307,10.8449168 40.2715758,9.83775879 Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a aria-label="Wendogo sur YouTube" href="https://www.youtube.com/@WendogoHQ" rel="noreferrer noopener" target="_blank" className="LegalSocial__SocialLink-sc-v4d14j-3 GeNZR">
                          <svg height={46} viewBox="0 0 46 46" width={46} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="LegalSocial__Picto-sc-v4d14j-0 llOyxT">
                            <path d="M31.63,18.88A2.19,2.19,0,0,0,30,17.37,54.83,54.83,0,0,0,23,17a57.93,57.93,0,0,0-7,.35,2.25,2.25,0,0,0-1.59,1.53A21.58,21.58,0,0,0,14,23a21.47,21.47,0,0,0,.37,4.12A2.19,2.19,0,0,0,16,28.63,54.91,54.91,0,0,0,23,29a57.93,57.93,0,0,0,7-.35,2.23,2.23,0,0,0,1.59-1.51A21.67,21.67,0,0,0,32,23,20.83,20.83,0,0,0,31.63,18.88ZM21.21,25.57V20.43L25.89,23Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <ul className="Menus__Container-sc-1cdqyiq-0 kLPxq Footer__FooterMenus-sc-1adny8q-4 mlIQG">
                    <div className="Menus__MenuContainer-sc-1cdqyiq-1 dawptZ">
                      <div className="Menus__MenuTitle-sc-1cdqyiq-2 ekhzHX"> À propos de Wendogo </div>
                      <ul className="Menus__MenuItems-sc-1cdqyiq-3 jdtBKN">
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <span tabIndex={0} className="Bridge__Component-sc-18zyewx-0 fvmjWl Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> <a href="/wendogo-mission"> Pourquoi passer par Wendogo ?</a> </span>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <span tabIndex={0} className="Bridge__Component-sc-18zyewx-0 fvmjWl Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> <a href="/about-us"> Qui sommes nous ?</a> </span>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <span tabIndex={0} className="Bridge__Component-sc-18zyewx-0 fvmjWl Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> <a href="/contact"> Contact</a> </span>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <span tabIndex={0} className="Bridge__Component-sc-18zyewx-0 fvmjWl Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Cookies </span>
                        </li>
                      </ul>
                    </div>
                    <div className="Menus__MenuContainer-sc-1cdqyiq-1 dawptZ">
                      <div className="Menus__MenuTitle-sc-1cdqyiq-2 ekhzHX">Fondamentaux</div>
                      <ul className="Menus__MenuItems-sc-1cdqyiq-3 jdtBKN">
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/wendogo-privacy" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Respect de la vie privée </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/legal-notice" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT">Mentions légales </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/cgu" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> CGU / CGV </a>
                        </li>
                      </ul>
                    </div>
                    <div className="Menus__MenuContainer-sc-1cdqyiq-1 dawptZ">
                      <div className="Menus__MenuTitle-sc-1cdqyiq-2 ekhzHX"> Les ressources Wendogo </div>
                      <ul className="Menus__MenuItems-sc-1cdqyiq-3 jdtBKN">
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/work-permit-steps" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT"> Permis de travail - Canada </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                          <a href="/scholarship-program-france" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT">Programme de Bourse d'étude </a>
                        </li>
                        <li className="Menus__MenuItem-sc-1cdqyiq-4 iXcfDl">
                        <a href="/study-in-france" className="Menus__MenuItemLink-sc-1cdqyiq-5 dDJQzT">  Etudier en France </a>
                        </li>
                      </ul>
                    </div>
                  </ul>
                </div>
    )
};

export default Footer;
