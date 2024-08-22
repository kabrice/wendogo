import SEAlertMessage from "../../components/SimulationEngine/SEAlertMessage";
import {ReactComponent as SadEmoticonSvg} from './../../assets/simulation_icons/sad_emoticon.svg'
import helper from '../../utils/Helper';

const BlankYearReptitionAlert = () => {

    let user = helper.getLocalStorageWithExpiration('wendogouser')
    let blankYearRepetitionNumber = user.blankYearRepetitionNumber
  
    return (blankYearRepetitionNumber >= 2 &&
      <SEAlertMessage title="Notre simulateur ne pourra pas vous assister. Campus France rend le traitement de ce cas très difficile." icon={<SadEmoticonSvg/>}
      subtitles={["Ne sont pas éligibles pour la procédure Campus France les candidats ne pouvant justifier d'année d’étude validée ou de contrat de travail de plus d’un an."]} isError={true}
      showContinueBtn={false}/>
    );

}

export default BlankYearReptitionAlert;
