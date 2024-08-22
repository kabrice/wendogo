import { useSelector } from 'react-redux'
import RecentLevelHighSchool from "./RecentLevelHighSchool";
import RecentLevelUniversity from "./RecentLevelUniversity";
import helper from '../../utils/Helper';

const RecentLevel = () => {
    let user = helper.getLocalStorageWithExpiration('wendogouser')
    const isInUniversityGlobal = useSelector((state) => state.userLevelSlice.isInUniversity)

    const isInUniversity = user.hasOwnProperty("schoolLevelSelected") ? (user.schoolLevelSelected === 'Supérieur') : isInUniversityGlobal
    return (
        <>
            {isInUniversity ? <RecentLevelUniversity /> : <RecentLevelHighSchool />}
        </>
    );
  }
  
  export default RecentLevel;
  