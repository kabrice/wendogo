import SEAlertMessage from "../../components/SimulationEngine/SEAlertMessage";
import {ReactComponent as IconEconomy} from './../../assets/simulation_icons/icon_economy.svg'
import helper from '../../utils/Helper';

const CouldPayTuitionWarningAlert = () => {

  let user = helper.getLocalStorageWithExpiration('wendogouser')
  let couldPayTuition = user?.couldPayTuition

  return (!couldPayTuition &&
    <SEAlertMessage title="Notre simulateur ne pourra pas vous assister." icon={<IconEconomy/>}
    subtitles={[`Des ressources financières suffisantes sont cruciales pour étudier en France. Elles permettent de couvrir les frais 
                  de scolarité, le coût de la vie, l'hébergement, les assurances, et autres dépenses essentielles. 
                  Un financement adéquat est requis pour obtenir un visa étudiant et prouve que l'étudiant peut subvenir 
                  à ses besoins pendant toute la durée de ses études.`]} isError={true}
    showContinueBtn={false}/>
  );
}

export default CouldPayTuitionWarningAlert;
