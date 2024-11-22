'use client';

import Footer from '../components/Footer';
import HeaderMenuBar from '../components/HeaderMenuBar';

function Error(){
    
    return <div >
            <HeaderMenuBar/>
            <main className="styles__Main-sc-kz84w6-0 gEFmYD"  style={{paddingTop: 280}}>
                <div className="styles__Wrapper-sc-gk465i-0 fiWVzr">
                    <div className="styles__Hero-sc-s3dlnp-0 gMynSv">
                    <div className="styles__Title-sc-s3dlnp-2 eWHDTF">
                        <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf">
                            Désolé, une erreur s'est produite. Veuillez réessayer plus tard ou nous contacter.
                        </h1>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                            <button
                                onClick={() => window.location.reload()}
                                style={{ width: '15.3%', height: 20, margin: '10px' }}
                                className="CTA button primary xlarge userValidation"
                                title=""
                                data-trackingprefix=""
                                data-testid="DaisyFieldView-continuer-VEH_DTL_POSSESSION"
                            >
                                Recharger
                            </button>
                            <button
                                onClick={() => window.location.href = 'mailto:hello@wendogo.com'}
                                style={{ width: '21.7%', height: 20, margin: '10px' }}
                                className="CTA button primary xlarge userValidation"
                                title=""
                                data-trackingprefix=""
                                data-testid="DaisyFieldView-continuer-VEH_DTL_POSSESSION"
                            >
                                Nous contacter
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
            <div>
            <Footer/> 
            </div>                   
          </div>

}

export default Error
