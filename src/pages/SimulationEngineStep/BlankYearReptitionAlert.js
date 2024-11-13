import SEAlertMessage from "../../components/SimulationEngine/SEAlertMessage";
import SadEmoticonSvg from './../../assets/simulation_icons/sad_emoticon.svg';
import { useSelector } from 'react-redux';

const BlankYearReptitionAlert = () => {
    const user = useSelector((state) => state.user);
    const blankYearRepetitionNumber = user?.blankYearRepetitionNumber || 0;

    // Only render the alert if blankYearRepetitionNumber is 2 or more
    if (blankYearRepetitionNumber < 2) {
        return null;
    }

    return (
        <SEAlertMessage 
            title="Notre simulateur ne pourra pas vous assister. Campus France rend le traitement de ce cas très difficile." 
            icon={<SadEmoticonSvg />}
            subtitles={[
                "Ne sont pas éligibles pour la procédure Campus France les candidats ne pouvant justifier d'année d’étude validée ou de contrat de travail de plus d’un an."
            ]}
            isError={true}
            showContinueBtn={false}
        />
    );
};

export default BlankYearReptitionAlert;
