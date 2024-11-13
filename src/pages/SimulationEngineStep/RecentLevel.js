import { useSelector } from 'react-redux'
import RecentLevelHighSchool from "./RecentLevelHighSchool";
import RecentLevelUniversity from "./RecentLevelUniversity";
import helper from '../../utils/Helper';
import { setUser } from '../../redux/userSlice';

const RecentLevel = ({universityLevels, degrees, isErrorPage}) => {
    //let user = helper.getLocalStorageWithExpiration('wendogouser')
    const isInUniversityGlobal = useSelector((state) => state.university.active)
    console.log('RecentLevelxxx ', universityLevels, degrees, isErrorPage)
    //const isInUniversity = user?.hasOwnProperty("schoolLevelSelected") ? (user?.schoolLevelSelected === 'Supérieur') : isInUniversityGlobal
    return (
        <>
            {isInUniversityGlobal ? <RecentLevelUniversity  universityLevels={universityLevels} isErrorPage={isErrorPage} /> : <RecentLevelHighSchool degrees={degrees} isErrorPage={isErrorPage} />}
        </>
    );
  }
  
  export default RecentLevel;
  