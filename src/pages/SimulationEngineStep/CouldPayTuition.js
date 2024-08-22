import React, { useState } from 'react';
import SEYesNo from '../../components/SimulationEngine/SEYesNo';
import {ReactComponent as QuestionMark} from './../../assets/simulation_icons/question_mark.svg'
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'


const CouldPayTuition = () => {

    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    //console.log('user xxx', user)
    const [couldPayTuition, setCouldPayTuition] = useState(user?.couldPayTuition)
    const handleCouldPayTuition = (val) => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION, val)
        setCouldPayTuition(val);
    };

    const FIRST_PARAGRAPHS = [`Il est important de noter que les conditions de prise en charge varient d'un pays à l'autre. 
                                Par exemple, la prise en charge financière par un garant n'est pas acceptée au Cameroun, mais elle l'est au Sénégal et au Maroc. 
                                Ces spécificités s'appliquent également à l'hébergement par un garant, où il faut souvent être mineur pour en bénéficier.`,
                                `Cependant voici quelques généralités à savoir : `
                            ]

    const PARAGRAPHS = [`Salaire minimum du garant : Le garant doit avoir un salaire minimum de 1800 euros par mois.
                         En effet, le consulat exige que le garant gagne trois fois le montant minimum requis pour subvenir aux besoins de l'étudiant, soit 615 euros par mois.`,

                        `Justification des revenus : Tant que le garant peut justifier de ses revenus (fiches de paie, attestation de travail, 
                        dernier avis d’imposition, etc.), le fait d'avoir des enfants ne le disqualifie pas.`,

                        `Optimisation de la validité du garant : Il est recommandé que votre garant soit l'un de vos parents biologiques ou adoptifs, 
                         vos frères et sœurs directs, vos grands-parents, ou vos oncles et tantes directs. Vous avez également la possibilité de cumuler plusieurs garants.`,

                        `Montant du soutien financier : Le garant est censé vous envoyer 615 euros par mois. Cependant, si votre garant vit en France, 
                         vous avez la possibilité de travailler et de soutenir financièrement votre garant. Mais attention, lors du renouvellement de votre visa, vous devrez présenter une preuve de soutien financier.`,

                        `Localisation du garant : Le garant peut vivre n'importe où dans le monde, peu importe qu'il soit dans le même pays que vous ou non.`]
 
    const updateWendogouser = (simulationStep, couldPayTuition) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, couldPayTuition, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        if(couldPayTuition){
            updateWendogouser(SIMULATION_ENGINE_STEPS.RESIDENT_COUNTRY, couldPayTuition)
        }else{
            updateWendogouser(SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION_WARNING, couldPayTuition)
        }
    }

    return (<SEYesNo title="Les coûts des études en France sont élevés. Êtes-vous en mesure de mobiliser au moins 8 000 € (environ 5,25 millions de FCFA) pour votre projet ? " 
                    tip="Ici on suppose que vous n'êtes pas ressortissant de l'Union Européenne, et que vous n'êtes pas boursier du gouvernement français. A défaut, cliquer sur «Oui»"
                    yes={couldPayTuition} handleYes={handleCouldPayTuition} modalFirstParagraphs={FIRST_PARAGRAPHS}
                    modalTitle = "Je ne peux pas mobiliser cette somme, mais j'ai un garant qui peut me soutenir financièrement." 
                    modalParagraphs={PARAGRAPHS} modalIcon={<QuestionMark className="FrancoisImg image"/>} 
                    modalIsLiTag={true} displayQuestionTooltip={true} 
                    specialTextModal="* Le simulateur Wendogo ne prend pas encore en compte les critères relatifs au garant. Cependant, si vous êtes certain d'avoir un garant qui remplit toutes ces conditions pour votre pays, cliquez sur «Oui»."
                    handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION} />);
}

export default CouldPayTuition;
