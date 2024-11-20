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
