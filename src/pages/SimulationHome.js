import Footer from '../components/Footer';
import HeaderMenuLoginBar from '../components/HeaderMenuLoginBar';
import {useLeadstatusQuery} from '../store/apis/leadstatusApi';
import _ from 'lodash';
import { activateSpinner, deactivateSpinner } from '../redux/spinnerslice' 
import {useAddUserMutation, useUpdateUserMutation} from '../store/apis/userApi'
import {ReactComponent as Sh1} from '../assets/simulation_icons/sh1.svg';
import {ReactComponent as Sh2} from '../assets/simulation_icons/sh2.svg';
import {ReactComponent as Sh3} from '../assets/simulation_icons/sh3.svg';
import {ReactComponent as Sh4} from '../assets/simulation_icons/sh4.svg';
import {ReactComponent as Sh5} from '../assets/simulation_icons/sh5.svg';
import {ReactComponent as Sh6} from '../assets/simulation_icons/sh6.svg';
import {ReactComponent as Sh7} from '../assets/simulation_icons/sh7.svg';
import { useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import useGeoLocation from "react-ipgeolocation"
import { Link } from "react-router-dom"
import helper from '../utils/Helper';
import KeepInTouch from './ressources/KeepInTouch';

function SimulationHome(){
    const [isReady, setIsReady] = useState(false);
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    
    const dispatch = useDispatch()
    const { data, error, isLoading } = useLeadstatusQuery();
    
    const [sortedArray, setSortedArray] = useState([]);
    const [iconComponents] = useState([<Sh1/>, <Sh2/>, <Sh3/>, <Sh4/>, <Sh5/>, <Sh6/>, <Sh7/>]); 
    const [isErrorPage, setIsErrorPage] = useState(false);
    const [isKeepInTouch, setIsKeepInTouch] = useState(false);

    const [guestUser, setGuestUser] = useState(user);
    const [addUser] = useAddUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const location = useGeoLocation();

    // Initialize data loading
    useEffect(() => {
      const initializeData = async () => {
        try {
          if(isLoading){
            dispatch(activateSpinner())
            return;
          }
      
          if(error){
            dispatch(deactivateSpinner()) 
            setIsErrorPage(true)
            return;
          }

          if (data) {
            dispatch(deactivateSpinner())
            setIsErrorPage(false)
            setSortedArray(_.sortBy(data, 'order'));
            setIsReady(true);
          }
        } catch (err) {
          console.error('Initialization error:', err);
          setIsErrorPage(true);
        }
      };

      initializeData();
    }, [data, error, isLoading, dispatch]);

    const handleUserUpdate = async (leadstatusId) => {
      if(leadstatusId === 'lst00001'){
        setIsKeepInTouch(true)
        return;
      }

      try {
        dispatch(activateSpinner())
        
        const userData = guestUser ? {
          ...guestUser,
          lead_status_id: leadstatusId,
          subscription_step: '/simulation/select/country',
          simulationStep: user?.simulationStep ? user.simulationStep : 1,
          date: new Date().toISOString(),
        } : {
          lastname: user?.lastname ? user.lastname :'guest',
          phone: user?.phone ? user.phone : generateRandomString(),
          country: user?.country ? user.country : location.country,
          lead_status_id: leadstatusId,
          subscription_step: '/simulation/select/country',
          simulationStep: user?.simulationStep ? user.simulationStep : 1,
          date: new Date().toISOString(),
        };

        const response = await (guestUser ? updateUser(userData) : addUser(userData));
        
        if(response.data.status){ 
          setGuestUser(userData);
          helper.setLocalStorageWithExpiration('wendogouser', userData);
          return true;
        }
        return false;
      } catch (error) {
        helper.triggerToastError(error);
        return false;
      } finally {
        dispatch(deactivateSpinner());
      }
    };

    function generateRandomString() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array(8).fill(0).map(() => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    }

    // Show loading state that react-snap can handle
    if (!isReady && !isErrorPage) {
      return (
        <div>
          <HeaderMenuLoginBar />
          <div className="loading-state">Chargement...</div>
          <Footer />
        </div>
      );
    }

    return (
      <div>     
        <HeaderMenuLoginBar/>
        {isErrorPage ? (
          <main className="styles__Main-sc-kz84w6-0 gEFmYD" style={{ paddingTop: 280 }}>
            <div className="styles__Wrapper-sc-gk465i-0 fiWVzr">
              <div className="styles__Hero-sc-s3dlnp-0 gMynSv">
                <div className="styles__Title-sc-s3dlnp-2 eWHDTF">
                  <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf">
                    Désolé, une erreur s'est produite. Veuillez réessayer plus tard ou nous contacter.
                  </h1>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                    <Link
                      to={window.location.pathname}
                      className="CTA button primary xlarge userValidation"
                      style={{ width: '15.3%', height: 20, margin: '10px' }}
                    >
                      Recharger
                    </Link>
                    <a
                      href="mailto:hello@wendogo.com"
                      className="CTA button primary xlarge userValidation"
                      style={{ width: '21.7%', height: 20, margin: '10px' }}
                    >
                      Nous contacter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : (
          isKeepInTouch ? (
            <KeepInTouch 
              setIsError={setIsErrorPage} 
              typeRequest='FLIGHT'
              setIsKeepInTouch={setIsKeepInTouch} 
              title="Notre planificateur de vol arrive bientôt ! En attendant, nous vous accompagnons personnellement"
            />
          ) : (
            <div className="View-sc-hqj7z4-7 cWSjbp">
              <main className="Content-sc-hqj7z4-1 DNgtn">
                <header className="Header-sc-hqj7z4-3 boexHc">
                  <h1 className="Title-sc-hqj7z4-6 kcyLNv">Bienvenue chez Wendogo</h1>
                  <p>Où vous en êtes dans votre projet&nbsp;:</p>
                </header>
                <ul className="Component-sc-14ytia7-5 iSJdAc Choices-sc-hqj7z4-0 cezjjJ">
                  {sortedArray.length > 1 && sortedArray.map((item, id) => (
                    <Link 
                      key={item.id}
                      to="/simulation/select/country"
                      onClick={async (e) => {
                        e.preventDefault();
                        const success = await handleUserUpdate(item.id);
                        if (success) {
                          window.location.href = '/simulation/select/country';
                        }
                      }}
                      className="Choice-sc-14ytia7-1 OvYpW"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div className="ChoiceBullet-sc-14ytia7-2 bpzCcl">
                        {iconComponents[id]}
                      </div>
                      <div className="ChoiceContent-sc-14ytia7-3 jyyHeZ">
                        <p>
                          <strong>{item.value}</strong>
                        </p>
                        {item.description && (
                          <p className="ChoiceDescription-sc-14ytia7-4 haoDem">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <button 
                        tabIndex={-1} 
                        type="button" 
                        className="Container-sc-9kce0i-0 cVhzzT ButtonSquare-sc-14ytia7-0 bmclvb"
                      >
                        <svg viewBox="0 0 24 24" className="Arrow-sc-9kce0i-1 btiHBj">
                          <defs>
                            <symbol xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" id="260b3914" className="ArrowSymbol-sc-9kce0i-5 dyjPO">
                              <path d="m15.3,11.17l-2.51-2.49,1.18-1.18,4.53,4.5-4.53,4.5-1.18-1.18,2.51-2.49H5.5v-1.66h9.8Z" />
                            </symbol>
                          </defs>
                          <use xlinkHref="#260b3914" x={-16} y={0} className="ArrowInstance-sc-9kce0i-2 ArrowInstance1-sc-9kce0i-3 RwYBr gnpvVW" />
                          <use xlinkHref="#260b3914" x={0} y={0} className="ArrowInstance-sc-9kce0i-2 ArrowInstance2-sc-9kce0i-4 RwYBr bGftjK" />
                        </svg>
                      </button>
                    </Link>
                  ))}
                </ul>
              </main>
            </div>
          )
        )}
        <Footer/>                    
      </div>
    );
}

export default SimulationHome;
