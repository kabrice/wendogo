import SEAlertMessage from "../../components/SimulationEngine/SEAlertMessage";
import {ReactComponent as SadEmoticonSvg} from './../../assets/simulation_icons/sad_emoticon.svg'
import helper from '../../utils/Helper';

const ClassRepetitionWarningAlert = () => {

  let user = helper.getLocalStorageWithExpiration('wendogouser')
  let classRepetitionNumber = user.classRepetitionNumber

  return (classRepetitionNumber > 2 &&
    <SEAlertMessage title="Notre simulateur ne pourra pas vous assister. Campus France rend le traitement de ce cas très difficile." icon={<SadEmoticonSvg/>}
    subtitles={["Ne sont pas éligibles pour la procédure Campus France les candidats ayant redoublé au moins deux années dans un même cycle."]} isError={true}
    showContinueBtn={false}/>
  );
}

export default ClassRepetitionWarningAlert;
