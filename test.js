import SEReportCard from '../../components/SimulationEngine/SEReportCard';
import SEMarkInput from '../../components/SimulationEngine/SEMarkInput';
import { useState, useEffect, useRef} from 'react';
import { useGetLevelValuesQuery } from '../../store/apis/levelValueApi';
import { activateSpinner, deactivateSpinner } from '../../redux/spinnerslice' 
import { useDispatch, useSelector } from 'react-redux'
import {setStep} from '../../redux/simulationStepSlice';
import helper from '../../utils/Helper';
import { set } from 'lodash';
import {SIMULATION_ENGINE_STEPS} from '../../utils/Constants'
import ButtonLarge from '../../components/ButtonLarge';

const ReportCard3 = () => {
    const dispatch = useDispatch()
    let user = helper.getLocalStorageWithExpiration('wendogouser') 
    const [programDomainObj, setProgramDomainObj] = useState(user?.programDomainObj || null)
    console.log('programDomainObj', programDomainObj?.name)
    const [urlFragment] = useState('/levelvalue/search/');
    const simulationStepGlobal = useSelector((state) => state.simulationStep);
    const titleWhenNoMatch = `Veuillez renseigner une nouvelle matière, le ${user.academicYearHeadDetails3.subjectWeightSystem.name.toLowerCase()}, la note et le rang obtenu.`; 
    const { data, error, isLoading } = useGetLevelValuesQuery({userid : '1', externalLevelValueInput : user?.degreeExactNameValue});
    const [subject1, setSubject1] = useState({reference: 0, label: {value: '', validated: true}, weight: {value: '', validated: true}, 
                                            mark: {value: '', validated: true}, rank: {value: '', validated: true}})
    const [subject2, setSubject2] = useState({reference: 0, label: {value: '', validated: true}, weight: {value: '', validated: true}, 
                                            mark: {value: '', validated: true}, rank: {value: '', validated: true}})     
    const [subject3, setSubject3] = useState({reference: 0, label: {value: '', validated: true}, weight: {value: '', validated: true}, 
                                            mark: {value: '', validated: true}, rank: {value: '', validated: true}})  
     const [subject4, setSubject4] = useState({reference: 0, label: {value: '', validated: true}, weight: {value: '', validated: true}, 
                                            mark: {value: '', validated: true}, rank: {value: '', validated: true}})                                                                                                                                
    const [subjectList1, setSubjectList1] = useState([])
    const [referenceInc1, setReferenceInc1] = useState(0)
    const [subjectList2, setSubjectList2] = useState([])
    const [referenceInc2, setReferenceInc2] = useState(0)
    const [subjectList3, setSubjectList3] = useState([])
    const [referenceInc3, setReferenceInc3] = useState(0)
    const [subjectList4, setSubjectList4] = useState([])
    const [referenceInc4, setReferenceInc4] = useState(0)
    const [isReadMode1, setIsReadMode1] = useState(true)
    const [isReadMode2, setIsReadMode2] = useState(true)
    const [isReadMode3, setIsReadMode3] = useState(true)
    const [isReadMode4, setIsReadMode4] = useState(true)

 
    const updateWendogouser = (simulationStep, programDomainObj) => {
        dispatch(setStep(simulationStep)) 
        let updatedUser = {...user, simulationStep, programDomainObj, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser, false)         
    } 

    const handleContinue = () => {
        console.log('OK')
    }

    return (<>
        {(isReadMode1 && isReadMode2 && isReadMode3 && isReadMode4) && <div className="FieldWrapper">
            <div className="FieldView field-valid">
                <div className="FieldView-flex-container">
                    <label className="Label">{`Veuillez renseigner toutes les matières par ${user.academicYearHeadDetails3.academicYearOrganization.name.toLowerCase()} pour l'année ${user.schoolYearSelected.name}.`}</label>
                </div>
                <div className="DrawerAnimation" />

                {isReadMode1 && <SEReportCard   
                                    header= {`${user.schoolYearSelected.name} - ${user.academicYearHeadDetails3.academicYearOrganization.name} N°1  - ${user.academicYearHeadDetails3.schoolName}`}
                                    subheader={`${user.degreeSelected.name} en ${user.degreeExactNameValue}`}
                                    subjectList = {subjectList1}
                                    subject = {subject1}
                                    setSubject = {setSubject1}
                                    setIsReadMode = {setIsReadMode1}
                                    setSubjectList = {setSubjectList1}  />}  
                {isReadMode2 && <SEReportCard   
                                    header= {`${user.schoolYearSelected.name} - ${user.academicYearHeadDetails3.academicYearOrganization.name} N°1  - ${user.academicYearHeadDetails3.schoolName}`}
                                    subheader={`${user.degreeSelected.name} en ${user.degreeExactNameValue}`}
                                    subjectList = {subjectList2}
                                    subject = {subject2}
                                    setSubject = {setSubject2}
                                    setIsReadMode = {setIsReadMode2}
                                    setSubjectList = {setSubjectList2}  />}     
                {isReadMode3 && <SEReportCard   
                                    header= {`${user.schoolYearSelected.name} - ${user.academicYearHeadDetails3.academicYearOrganization.name} N°1  - ${user.academicYearHeadDetails3.schoolName}`}
                                    subheader={`${user.degreeSelected.name} en ${user.degreeExactNameValue}`}
                                    subjectList = {subjectList3}
                                    subject = {subject3}
                                    setSubject = {setSubject3}
                                    setIsReadMode = {setIsReadMode3}
                                    setSubjectList = {setSubjectList3}  />}     
                {isReadMode4 && <SEReportCard   
                                    header= {`${user.schoolYearSelected.name} - ${user.academicYearHeadDetails3.academicYearOrganization.name} N°1  - ${user.academicYearHeadDetails3.schoolName}`}
                                    subheader={`${user.degreeSelected.name} en ${user.degreeExactNameValue}`}
                                    subjectList = {subjectList4}
                                    subject = {subject4}
                                    setSubject = {setSubject4}
                                    setIsReadMode = {setIsReadMode4}
                                    setSubjectList = {setSubjectList4}  />}                                                                             
                <ButtonLarge  name="Continuer" handleContinue={  handleContinue } />
            </div>
        </div>}
        {/* <SEMarkInput title="Moyenne de l'année scolaire la plus récente" showTip={true} tip="Veuillez renseigner votre moyenne générale de l'année scolaire la plus récente." /> */}
                          
        {(!isReadMode1 || !isReadMode2 || !isReadMode3 || !isReadMode4) && <SEMarkInput title={titleWhenNoMatch} 
                                    tip="Le rang est facultatif. Si inexistant, laissez un vide."
                                    subjectWeightSystem={user.academicYearHeadDetails3.subjectWeightSystem.name}
                                    markSystem={user.academicYearHeadDetails3.markSystem.name}
                                    setIsReadMode = {setIsReadMode1}
                                    urlFragment ={urlFragment}
                                    subject={subject1}
                                    setSubject={setSubject1}
                                    showContinueBtn={1} 
                                    setReferenceInc={setReferenceInc1}
                                    referenceInc={referenceInc1}
                                    setSubjectList={setSubjectList1} />}
        {(!isReadMode1 || !isReadMode2 || !isReadMode3 || !isReadMode4) && <SEMarkInput title={titleWhenNoMatch} 
                                    tip="Le rang est facultatif. Si inexistant, laissez un vide."
                                    subjectWeightSystem={user.academicYearHeadDetails3.subjectWeightSystem.name}
                                    markSystem={user.academicYearHeadDetails3.markSystem.name}
                                    setIsReadMode = {setIsReadMode2}
                                    urlFragment ={urlFragment}
                                    subject={subject2}
                                    setSubject={setSubject2}
                                    showContinueBtn={1} 
                                    setReferenceInc={setReferenceInc2}
                                    referenceInc={referenceInc2}
                                    setSubjectList={setSubjectList2} />}
       {(!isReadMode1 || !isReadMode2 || !isReadMode3 || !isReadMode4) && <SEMarkInput title={titleWhenNoMatch} 
                                    tip="Le rang est facultatif. Si inexistant, laissez un vide."
                                    subjectWeightSystem={user.academicYearHeadDetails3.subjectWeightSystem.name}
                                    markSystem={user.academicYearHeadDetails3.markSystem.name}
                                    setIsReadMode = {setIsReadMode3}
                                    urlFragment ={urlFragment}
                                    subject={subject3}
                                    setSubject={setSubject3}
                                    showContinueBtn={1} 
                                    setReferenceInc={setReferenceInc3}
                                    referenceInc={referenceInc3}
                                    setSubjectList={setSubjectList3} />}       
       {(!isReadMode1 || !isReadMode2 || !isReadMode3 || !isReadMode4) && <SEMarkInput title={titleWhenNoMatch} 
                                    tip="Le rang est facultatif. Si inexistant, laissez un vide."
                                    subjectWeightSystem={user.academicYearHeadDetails3.subjectWeightSystem.name}
                                    markSystem={user.academicYearHeadDetails3.markSystem.name}
                                    setIsReadMode = {setIsReadMode4}
                                    urlFragment ={urlFragment}
                                    subject={subject4}
                                    setSubject={setSubject4}
                                    showContinueBtn={1} 
                                    setReferenceInc={setReferenceInc4}
                                    referenceInc={referenceInc4}
                                    setSubjectList={setSubjectList4} />}                                                                                             
        </>
    );
};

export default ReportCard3;
