'use client';

import { useSelector } from 'react-redux'
import RecentLevelHighSchool from "./RecentLevelHighSchool";
import RecentLevelUniversity from "./RecentLevelUniversity"; 

const RecentLevel = ({universityLevels, degrees, isErrorPage}) => {
    //let user = helper.getLocalStorageWithExpiration('wendogouser')
    const isInUniversityGlobal = useSelector((state) => state.university.active)
    console.log('RecentLevelxxx ', universityLevels, degrees, isErrorPage, isInUniversityGlobal)
    //const isInUniversity = user?.hasOwnProperty("schoolLevelSelected") ? (user?.schoolLevelSelected === 'Supérieur') : isInUniversityGlobal
    return (
        <>
            {isInUniversityGlobal ? <RecentLevelUniversity  universityLevels={universityLevels} isErrorPage={isErrorPage} /> : <RecentLevelHighSchool degrees={degrees} isErrorPage={isErrorPage} />}
        </>
    );
  }
  
  export default RecentLevel;
  