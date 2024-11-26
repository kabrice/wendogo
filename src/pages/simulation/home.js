'use client';

import Footer from '../../components/Footer';
import HeaderMenuLoginBar from '../../components/HeaderMenuLoginBar'; 
import _ from 'lodash';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice' 
import {useAddUserMutation, useUpdateUserMutation} from '../../store/apis/userApi'
import Sh1 from '../../assets/simulation_icons/sh1.svg';
import Sh2 from '../../assets/simulation_icons/sh2.svg';
import Sh3 from '../../assets/simulation_icons/sh3.svg';
import Sh4 from '../../assets/simulation_icons/sh4.svg';
import Sh5 from '../../assets/simulation_icons/sh5.svg';
import Sh6 from '../../assets/simulation_icons/sh6.svg';
import Sh7 from '../../assets/simulation_icons/sh7.svg';
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react'; 
import Link from 'next/link'
import helper from '../../utils/Helper';
import { REST_API_PARAMS } from '../../utils/Constants';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Loader2 } from "lucide-react";
import { setUser } from '../../redux/userSlice'; 
import { IPINFO_URL } from '../../utils/Constants';

const KeepInTouch = dynamic(() => import('../ressources/KeepInTouch'), {
  loading: () => <div className="flex items-center justify-center min-h-[200px]">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
});

export async function getServerSideProps() {
  let isErrorHomePage = false;
  try {
      const response = await fetch(`${REST_API_PARAMS.baseUrl}/leadstatus`);
      const leadStatus = await response.json();
      return { props: { leadStatus, isErrorHomePage } };
  } catch (error) {
      console.error('Error fetching leadstatus levels:', error);
      isErrorHomePage = true;
      return { props: { leadStatus: [], isErrorHomePage } };
  }
}

const SimulationHome = ({ leadStatus=[], isErrorHomePage=false }) => {
    //console.log('leadStatus:', leadStatus);
    const [isErrorPage, setIsErrorPage] = useState(isErrorHomePage);
    const [isReady, setIsReady] = useState(false);
    //et user = helper.getLocalStorageWithExpiration('wendogouser')
    const router = useRouter();
    const dispatch = useDispatch()
    //const { data, error, isLoading } = useLeadstatusQuery();
    
    const [sortedArray, setSortedArray] = useState([]);
    const [iconComponents] = useState([<Sh1/>, <Sh2/>, <Sh3/>, <Sh4/>, <Sh5/>, <Sh6/>, <Sh7/>]); 
    const [isKeepInTouch, setIsKeepInTouch] = useState(false);
    const user = useSelector((state) => state.user);
    const [addUser] = useAddUserMutation();
    const [updateUser] = useUpdateUserMutation(); 
    const [userCountry, setUserCountry] = useState(null);


    useEffect(() => {
      const getCountry = async () => {
        try {
          const response = await fetch(IPINFO_URL);
          const data = await response.json();
          setUserCountry(data.country || 'CM');
        } catch (error) {
          console.warn('Failed to get country:', error);
          setUserCountry('CM');
        }
      };

      if (!user?.country) {
        getCountry();
      }
    }, [user?.country]);

    useEffect(() => {
      dispatch(deactivateSpinner());
      
      if(!user){
        return;
      }
       
    }, [dispatch]);

    // Initialize data loading
    useEffect(() => {
      const initializeData = () => {
        try { 
          if (leadStatus) {
            dispatch(deactivateSpinner())
            setIsErrorPage(false)
            setSortedArray(_.sortBy(leadStatus, 'order'));
            setIsReady(true);
          }
        } catch (err) {
          console.error('Initialization error:', err);
          setIsErrorPage(true);
        }
      };

      initializeData();
    }, [leadStatus, dispatch]);

    const handleUserUpdate = async (leadstatusId) => {
      if(leadstatusId === 'lst00001'){
        setIsKeepInTouch(true)
        return;
      }
      
      try {
        dispatch(activateSpinner())
        
        const userToProcess = {
          userId: user?.userId ? user?.userId : null,
          lastname: user?.lastname ? user?.lastname :'guest',
          phone: user?.phone ? user?.phone : generateRandomString(),
          country: user?.country ? user?.country : userCountry,
          lead_status_id: leadstatusId,
          subscription_step: '/simulation/country/selection',
          simulationStep: user?.simulationStep ? user?.simulationStep : 1,
          date: new Date().toISOString(),
        }
        console.log('XXXupdatedUser userToProcess userToProcess', userToProcess, user?.userId );
        const response = await (user?.userId ? updateUser(userToProcess) : addUser(userToProcess));
        console.log('XXXupdatedUser response 11', response);
        if(response.data.status){  
          const updatedUser = {
            ...user,
            ...userToProcess,
            userId: response.data.user_id,
          }
          console.log('XXXupdatedUser:', updatedUser);
          dispatch(setUser(updatedUser));
          helper.setLocalStorageWithExpiration('wendogouser', updatedUser);
          //router.push('/simulation/country/selection');
          return true;
        }
        console.log('XXXupdatedUser response 22', response);
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
            <div className="flex items-center justify-center min-h-[200px]">
                  <Loader2 className="w-8 h-8 animate-spin" />
              </div>
          <Footer />
        </div>
      );
    }

    return (
      <div>     
        <HeaderMenuLoginBar/>
        {/* {'eee '+isErrorPage+ ' '+leadStatus.length} */}
        {(isErrorPage || leadStatus.length<1) ? (
          <main className="styles__Main-sc-kz84w6-0 gEFmYD" style={{ paddingTop: 280 }}>
            <div className="styles__Wrapper-sc-gk465i-0 fiWVzr">
              <div className="styles__Hero-sc-s3dlnp-0 gMynSv">
                <div className="styles__Title-sc-s3dlnp-2 eWHDTF">
                  <h1 size="large" className="styles__HeadingBridge-sc-6txi54-0 hzNvHf">
                              Désolé, une erreur s'est produite. Veuillez réessayer plus tard ou nous contacter.
                            </h1>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                      <button onClick={()=> router.reload()} className="CTA button primary xlarge userValidation" style={{ width: '15.3%', height: 20, margin: '10px' }} > 
                        Recharger 
                      </button> 
                      <a href="mailto:hello@wendogo.com" className="CTA button primary xlarge userValidation" style={{ width: '21.7%', height: 20, margin: '10px' }}>
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
                    <a 
                      key={item.id}
                      href="/simulation/country/selection"
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          const success = await handleUserUpdate(item.id);
                          if (success) {
                            router.push('/simulation/country/selection');
                          }
                        } catch (error) {
                          console.error('Error in navigation:', error);
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
                    </a>
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
