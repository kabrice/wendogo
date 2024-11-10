import SEAlertMessage from "../../components/SimulationEngine/SEAlertMessage";
import {ReactComponent as SadEmoticonSvg} from './../../assets/simulation_icons/sad_emoticon.svg'
import helper from '../../utils/Helper';

const CampusFranceInegibilityAlert = () => {

  let user = helper.getLocalStorageWithExpiration('wendogouser')
  let isIneligibleForCampusFrance = user?.isIneligibleForCampusFrance

  return (isIneligibleForCampusFrance &&
    <SEAlertMessage title="Notre simulateur ne pourra pas vous assister." icon={<SadEmoticonSvg/>}
    subtitles={[`Votre profil ne répond pas aux critères d'éligibilité fixés par Campus France.`]} isError={true}
    showContinueBtn={false}/>
  );
}

export default CampusFranceInegibilityAlert;
