import SEAlertMessage from "../../components/SimulationEngine/SEAlertMessage";
import {ReactComponent as FrenchTestSvg} from './../../assets/simulation_icons/french_test.svg'

const FrenchTestInfoAlert = () => {
  return (
    <SEAlertMessage title="Un test de français de niveau intermédiaire minimum (par exemple, B1 pour le DELF) est requis dans votre situation pour étudier en France." icon={<FrenchTestSvg/>}
    subtitles={["Dans la suite de la simulation, nous considérerons que vous avez obtenu un niveau B1 en langue française."]} />
  );
}

export default FrenchTestInfoAlert;
