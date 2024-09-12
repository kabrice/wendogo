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
    console.log('CouldPayTuition user xxx',simulationStepGlobal, user)
    const [couldPayTuition, setCouldPayTuition] = useState(user?.couldPayTuition)

    const handleCouldPayTuition = (val) => { 
        setCouldPayTuition(val);
        updateWendogouser(SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION, val)
    };

    const FIRST_PARAGRAPHS = [`Êtes-vous en train de préparer votre demande de visa et souhaitez-vous plus d'informations sur la partie relative au garant financier ? 
        <p>Tout d'abord, vous devez savoir que la raison la plus courante de refus de visa est la raison n°2 :</p>
        <p><strong>Vous n'avez pas fourni de preuve démontrant que vous disposez de ressources suffisantes pour couvrir les dépenses de toute nature durant votre séjour en France, ou que vous n'êtes pas en mesure d'acquérir légalement ces moyens.</strong></p>
        <p>Cette raison est utilisée lorsque l'étudiant ne présente pas suffisamment d'éléments prouvant de manière incontestable qu'il/elle disposera des ressources nécessaires (supérieures ou égales à 615 €/mois) pour au moins un an.</p>
        <p>En effet, la vie étudiante en France est coûteuse, et le consulat/ambassade ne prendra pas le risque de permettre l'entrée en France d'étudiants qui ne pourront pas étudier dans les meilleures conditions.</p>
        <p>Quelques conditions sur le garant :</p>`,
                            ]

    const PARAGRAPHS = [`Salaire minimum du garant : Le garant doit avoir un revenu minimum de 1900 euros net par mois après deduction des parts.
                         En effet, le consulat exige que le garant gagne trois fois le montant minimum requis pour subvenir aux besoins de l'étudiant, soit 615 euros par mois.`,

                        `Justification des revenus : Tant que le garant peut justifier de ses revenus (fiches de paie, attestation de travail, 
                        dernier avis d’imposition, etc.), le fait d'avoir des enfants ne le disqualifie pas.`,

                        `Optimisation de la validité du garant : Il est recommandé que votre garant soit l'un de vos parents biologiques ou adoptifs, 
                         vos frères et sœurs directs, vos grands-parents, ou vos oncles et tantes directs. Vous avez également la possibilité de cumuler plusieurs garants.`,

                        `Montant du soutien financier : Le garant est censé vous envoyer 615 euros par mois. Cependant, si votre garant vit en France, 
                         vous avez la possibilité de travailler et de soutenir financièrement votre garant. Mais attention, lors du renouvellement de votre visa, vous devrez présenter une preuve de soutien financier.`,

                        `Localisation du garant : Le garant peut vivre n'importe où dans le monde, peu importe qu'il soit dans le même pays que vous ou non.`,

                        `Distance de l'hébergement : Si votre garant vous héberge, il doit fournir une attestation d'hébergement. A noter que la distance entre le lieu d'hébergement et l'établissement d'enseignement ne doit pas excéder 65km.`,]
 
    const updateWendogouser = (simulationStep, couldPayTuition) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, couldPayTuition, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    }

    const handleContinue = () => {
        updateWendogouser(SIMULATION_ENGINE_STEPS.RESIDENT_COUNTRY, couldPayTuition)
    }

    return (<SEYesNo title="Les études en France sont onéreuses. Disposeriez-vous d'un garant financier ou d'une somme d'au moins 8 000 € pour mener à bien ce projet?" 
                    tip="Ici on suppose que vous n'êtes pas ressortissant de l'Union Européenne, et que vous n'êtes pas boursier du gouvernement français. A défaut, cliquer sur «Oui»"
                    yes={couldPayTuition} handleYes={handleCouldPayTuition} modalFirstParagraphs={FIRST_PARAGRAPHS}
                    modalTitle = "Je ne peux pas mobiliser cette somme, mais j'ai un garant qui peut me soutenir financièrement." 
                    modalParagraphs={PARAGRAPHS} modalIcon={<QuestionMark className="FrancoisImg image"/>} 
                    modalIsLiTag={true} displayQuestionTooltip={true} 
                    specialTextModal="* Le simulateur Wendogo ne prend pas encore en compte les critères relatifs au garant. Cependant, si vous êtes certain d'avoir un garant qui remplit toutes ces conditions pour votre pays, cliquez sur «Oui»."
                    handleContinue={handleContinue} showContinueBtn={simulationStepGlobal === SIMULATION_ENGINE_STEPS.COULD_PAY_TUITION}
                    id="COULD_PAY_TUITION" />);
}

export default CouldPayTuition;
