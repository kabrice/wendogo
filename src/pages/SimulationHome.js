
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
import { useNavigate } from "react-router-dom"
import helper from '../utils/Helper';

/**
 * Represents the SimulationHome component. Users can select their project status.
 * 
 * @returns {JSX.Element} The JSX element representing the SimulationHome component.
 */
function SimulationHome(){

    let user = helper.getLocalStorageWithExpiration('wendogouser')
    console.log('user', user)

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    const { data, error, isLoading } = useLeadstatusQuery();
    
    const [sortedArray, setSortedArray] = useState([]);
    const [iconComponents] = useState([<Sh1/>, <Sh2/>, <Sh3/>, <Sh4/>, <Sh5/>, <Sh6/>, <Sh7/>]); 

    const [guestUser, setGuestUser] = useState(user);
    const [addUser] = useAddUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const location = useGeoLocation();

    useEffect(() => {

      if(isLoading){
        console.log('😅isLoading', isLoading)
        dispatch(activateSpinner())
      }
  
      if(error){
        console.log('😅error', error)
        document.location.href='/error'
      }

      if (data) {
        dispatch(deactivateSpinner())
        setSortedArray(_.sortBy(data, 'order'));
        console.log('data ', data);
      }

    }, [data, error, isLoading ]);

    // const goToSimulationCountrySelection = () => {

    //   navigate('/simulation/select/country')
    // }
    function generateRandomString() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    }

    /**
     * On gère le cas où l'utilisateur est déjà enregistré en bdd, on met à jour son lead_status_id avant de le rediriger vers la page de sélection de pays
     * 
     * @param {number} leadstatusId - The ID of the lead status.
     * @throws {Error} - If an error occurs during the navigation process.
     */
    async function goToSimulationCountrySelection(leadstatusId){
      let responseStatus = false
      //let user = helper.getLocalStorageWithExpiration('wendogouser')
      try {
        dispatch(activateSpinner())
        //console.log('😅wendogouser', helper.getLocalStorageWithExpiration('wendogouser'))
        
        if(guestUser){
          user = {
            ...guestUser,
            lead_status_id: leadstatusId,
            subscription_step: '/simulation/select/country',
            simulationStep: 1,
            date: new Date().toISOString(),
          }
          const response = await updateUser(user)
          console.log('result🖐🖐', response)
          responseStatus = response.data.status
        }else{
          user = {
            lastname: 'guest',
            phone: generateRandomString(),
            country: location.country,
            lead_status_id: leadstatusId,
            subscription_step: '/simulation/select/country',
            simulationStep: 1,
            date: new Date().toISOString(),
          }

          const response = await addUser(user)
          console.log('result🖐🖐', response)
          responseStatus = response.data.status
        }
        dispatch(deactivateSpinner())
        if(responseStatus){
          console.log('😅😅user', user)
          setGuestUser(user)
          helper.setLocalStorageWithExpiration('wendogouser', user, false)
          navigate('/simulation/select/country')
        }
      } catch (error) {
        helper.triggerToastError(error)
      }

    }

    return <div>     
              <HeaderMenuLoginBar/>
              <div className="View-sc-hqj7z4-7 cWSjbp">
                <main className="Content-sc-hqj7z4-1 DNgtn">
                  <header className="Header-sc-hqj7z4-3 boexHc">
                    <h1 className="Title-sc-hqj7z4-6 kcyLNv">Bienvenue chez Wendogo</h1>
                    <p>Où vous en êtes dans votre projet&nbsp;:</p>
                  </header>
                  <ul className="Component-sc-14ytia7-5 iSJdAc Choices-sc-hqj7z4-0 cezjjJ">
                   
                    {sortedArray.length>1 && sortedArray.map((item, id) => {
                        return  <li  role="button" key={item.id}  className="Choice-sc-14ytia7-1 OvYpW" onClick={() => goToSimulationCountrySelection(item.id)}>
                                  <div className="ChoiceBullet-sc-14ytia7-2 bpzCcl">
                                    {iconComponents[id]}
                                  </div>
                                  <div className="ChoiceContent-sc-14ytia7-3 jyyHeZ">
                                    <p>
                                      <strong>{item.value}</strong>
                                    </p>
                                    {item.description && <p className="ChoiceDescription-sc-14ytia7-4 haoDem"> {item.description} </p>}
                                  </div>
                                  <button tabIndex={-1} type="button" className="Container-sc-9kce0i-0 cVhzzT ButtonSquare-sc-14ytia7-0 bmclvb">
                                    <svg viewBox="0 0 24 24" className="Arrow-sc-9kce0i-1 btiHBj">
                                      <defs>
                                        <symbol xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" id="260b3914" className="ArrowSymbol-sc-9kce0i-5 dyjPO">
                                          <path d="m15.3,11.17l-2.51-2.49,1.18-1.18,4.53,4.5-4.53,4.5-1.18-1.18,2.51-2.49H5.5v-1.66h9.8Z" />
                                        </symbol>
                                      </defs>
                                      <use xlinkHref="#260b3914" x={-16} y={0} className="ArrowInstance-sc-9kce0i-2 ArrowInstance1-sc-9kce0i-3 RwYBr gnpvVW" />
                                      <use xlinkHref="#260b3914" x={0} y={0} className="ArrowInstance-sc-9kce0i-2 ArrowInstance2-sc-9kce0i-4 RwYBr bGftjK" />
                                    </svg>
                                    <span className="LoaderSC-sc-1dsx085-0 iDVKJa Loader-sc-9kce0i-6 cLjXgV">
                                      <svg xmlns="http://www.w3.org/2000/svg" height={0} width={0}>
                                        <defs>
                                          <clipPath id="9e21639c" clipPathUnits="objectBoundingBox">
                                            <path d="m0,1V0h1v.46s-.01.04-.04.04-.04-.01-.05-.04c-.02-.23-.22-.4-.45-.38S.06.31.09.54c.02.23.22.4.45.38.2-.02.35-.17.38-.37,0-.02.02-.04.05-.04.02,0,.04.02.04.05v.44s-1,0-1,0Z" />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </span>
                                  </button>
                                </li>}) }
                  </ul>
                </main>
              </div>
              <Footer/>                    
          </div>

}

export default SimulationHome
