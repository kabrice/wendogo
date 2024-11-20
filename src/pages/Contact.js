'use client';

import Head from 'next/head'; 
import SocialMediaLogo from '../assets/optimized/social_media_logo.webp'
import Footer from '../components/Footer';
import HeaderMenuBar from '../components/HeaderMenuBar';
import CoffeeCup from '../assets/optimized/coffeecup.webp'
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Image from 'next/image';

function Contact(){ 

    
    return <div >
            <Head>
              <meta property="og:url"           content="https://wendogo.com/contact" />
              <meta property="og:type"          content="article" />
              <meta property="og:title"         content="Contact - Wendogo" />
              <meta property="og:description"   content="Contactez nous ici." />
              <meta property="og:image"         content={SocialMediaLogo} /> 
              <title>Contact - Wendogo</title>
              <meta name="description"          content="Contactez nous ici."/>
            </Head>
            <HeaderMenuBar/>
            <main className="styles__Main-sc-kz84w6-0 gEFmYD gEFmYD1" style={{paddingTop: 80}}>
                      <div className="styles__Wrapper-sc-gk465i-0 cddtql">
                        <header className="styles__Header-sc-1wbd6gj-1 ClCQj">
                          <div className="styles__Hero-sc-s3dlnp-0 gMynSv">
                            <div className="styles__Title-sc-s3dlnp-2 eWHDTF">
                              <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf"> Contactez l’équipe Wendogo </h1>
                            </div>
                          </div>
                        </header>
                      </div>
                      <div className="styles__Wrapper-sc-gk465i-0 fiWVzr">
                        <div className="styles__Content-sc-1wbd6gj-0 dbnlxV">
                          <picture>
                            <Image alt="Contact" loading="lazy" src={CoffeeCup} width={320} className="styles__HeaderImage-sc-1wbd6gj-2 fqPObL" />
                          </picture>
                          <div className="styles__Information-sc-1wbd6gj-5 gJwSMu">
                            <p> Nous sommes disponibles :<br /> De lundi à dimanche 24h/24. </p>
                            <a href="mailto:hello@wendogo.com" rel="nofollow" target="blank">
                              <h3 size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">
                                <span className="styles__Title-sc-1wbd6gj-3 jatQYR">
                                  <span className="styles__Icon-sc-goa033-0 blmSsR" /> Par email </span>
                              </h3>
                              <p className="styles__Link-sc-1wbd6gj-4 hAcmtb">hello@wendogo.com</p>
                            </a>
                            <h3 size="large" format="default" className="styles__SubHeading-sc-xwwv8k-0 PVMuW">
                              <span className="styles__Title-sc-1wbd6gj-3 jatQYR">
                                <span className="styles__Icon-sc-goa033-0 blmRjo" /> Par chat </span>
                            </h3>
                            <p className="styles__Link-sc-1wbd6gj-4 hAcmtb"> <a href="https://m.me/wendogoHQ" >Écrivez nous, nous vous répondons en quelques minutes</a> </p>
                            <h3 format="default" size="medium" className="styles__SubHeading-sc-xwwv8k-0 cDPnHw">
                              <a href="https://wa.me/+33668156073" rel="nofollow">
                                <span className="styles__Title-sc-1wbd6gj-3 jatQYR">
                                  <span className="styles__Icon-sc-goa033-0 blniyO" /> WHATSAPP <br/>+33 6 68 15 60 73</span>
                              </a>
                            </h3>
                          </div>
                        </div>
                      </div>
                      <FloatingWhatsApp phoneNumber="330745493086" accountName="Wendogo" avatar={SocialMediaLogo} statusMessage="Répond en général dans l'heure" 
                        chatMessage={'Salut toi 🤝 \nSi tu as une question, suis ces étapes pour obtenir une assistance rapide :\n1. Présente toi\n2. Indique l\'objet de ton message \n3. Décris clairement ton problème 😉'}
                        placeholder={"Racontes nous ce qui te préoccupe"} chatboxHeight={500} CSSProperties={{color:'#001435'}}/>
                    </main> 

            <Footer/>                    
          </div>

}

export default Contact
