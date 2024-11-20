import {  toast } from 'react-toastify';
import {ERROR_TEXT} from './Constants.js'
import _ from 'lodash'
import { get } from 'lodash';
//import { useRouter } from 'next/router';


const EXPIRATION_TIMES = {
  ONE_HOUR: 60*60*1000,
  ONE_DAY: 24*60*60*1000,
  ONE_WEEK: 7*24*60*60*1000
};

const helper = {
    toastSuccess: function(message){
        toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            }); 
    },
    toastError: function(message){
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            }); 
    },
    toastInfo: function(message){
        toast.info(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            }); 
    },
    setLocalStorageWithExpiration: function(key, value, customExpirationTime = null) {
      if (typeof window !== "undefined") {
        const defaultExpiration = EXPIRATION_TIMES.ONE_DAY;
        
        let result = {
            data: value,
            expireTime: Date.now() + (customExpirationTime || defaultExpiration)
        };
        
        localStorage.setItem(key, JSON.stringify(result));
      }
    },
    getLocalStorageWithExpiration(key) {
      if (typeof window !== "undefined") { 
        // get the parsed value of the given key
        let result = JSON.parse(localStorage.getItem(key));
        
        // if the key has value
        if(result){ 
            
            // if the entry is expired
            // remove the entry and return null
            if(result.expireTime && result.expireTime <= Date.now()){
                window.localStorage.removeItem(key);
                return null;
            }  
            
            // else return the value
            return result.data;
        }
        
        // if the key does not have value
        return null;
      }
    },
   /* redirectionAtInit(router, user, currentPagePath, redirectPath='/simulation/home'){ 
      console.log('redirectionAtInit xxxxx ', {router, user, currentPagePath, redirectPath})
      if(!user || !(user?.subscription_step)?.startsWith(currentPagePath)){
          console.log('redirectionAtInit ERROR')
          if (typeof window !== 'undefined') {
              // Client-side navigation
              if (router && router.push) {
                  router.push(redirectPath);
              } else {
                  window.location.href = redirectPath;
              }
          }
          return false;
      }
      return true;
    },*/
    redirectionAtInit(router, user, currentPagePath, redirectPath='/simulation/home'){ 
      if (!user) {
        if (typeof window !== 'undefined') {
          router.push(redirectPath);
        }
        return false;
      }
    
      // Only redirect if we're not already heading to a new subscription_step
      if (!user.subscription_step?.startsWith(currentPagePath) && 
          !user.subscription_step?.includes('/simulation/engine')) {
        if (typeof window !== 'undefined') {
          router.push(redirectPath);
        }
        return false;
      }
    
      return true;
    },
    loadFacebookSDK: function(){
        let script1 = document.createElement("script");
        script1.setAttribute("crossOrigin","anonymous");
        script1.nonce = "8E3Mm15A"
        script1.src = "https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v17.0&appId=1711396672460430&autoLogAppEvents=1";
        script1.setAttribute("nonce","8E3Mm15A");
        script1.type = "text/javascript";
        document.body.append(script1);
  
        window.fbAsyncInit = () => {
          window.FB.init({
              appId            : '1711396672460430',
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v11.0'
          });
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
          fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
    },
    getLocaleShortDateString(d) {
        var f={"ar-SA":"dd/MM/yy","bg-BG":"dd.M.yyyy","ca-ES":"dd/MM/yyyy","zh-TW":"yyyy/M/d","cs-CZ":"d.M.yyyy","da-DK":"dd-MM-yyyy","de-DE":"dd.MM.yyyy","el-GR":"d/M/yyyy","en-US":"M/d/yyyy","fi-FI":"d.M.yyyy","fr-FR":"dd/MM/yyyy","he-IL":"dd/MM/yyyy","hu-HU":"yyyy. MM. dd.","is-IS":"d.M.yyyy","it-IT":"dd/MM/yyyy","ja-JP":"yyyy/MM/dd","ko-KR":"yyyy-MM-dd","nl-NL":"d-M-yyyy","nb-NO":"dd.MM.yyyy","pl-PL":"yyyy-MM-dd","pt-BR":"d/M/yyyy","ro-RO":"dd.MM.yyyy","ru-RU":"dd.MM.yyyy","hr-HR":"d.M.yyyy","sk-SK":"d. M. yyyy","sq-AL":"yyyy-MM-dd","sv-SE":"yyyy-MM-dd","th-TH":"d/M/yyyy","tr-TR":"dd.MM.yyyy","ur-PK":"dd/MM/yyyy","id-ID":"dd/MM/yyyy","uk-UA":"dd.MM.yyyy","be-BY":"dd.MM.yyyy","sl-SI":"d.M.yyyy","et-EE":"d.MM.yyyy","lv-LV":"yyyy.MM.dd.","lt-LT":"yyyy.MM.dd","fa-IR":"MM/dd/yyyy","vi-VN":"dd/MM/yyyy","hy-AM":"dd.MM.yyyy","az-Latn-AZ":"dd.MM.yyyy","eu-ES":"yyyy/MM/dd","mk-MK":"dd.MM.yyyy","af-ZA":"yyyy/MM/dd","ka-GE":"dd.MM.yyyy","fo-FO":"dd-MM-yyyy","hi-IN":"dd-MM-yyyy","ms-MY":"dd/MM/yyyy","kk-KZ":"dd.MM.yyyy","ky-KG":"dd.MM.yy","sw-KE":"M/d/yyyy","uz-Latn-UZ":"dd/MM yyyy","tt-RU":"dd.MM.yyyy","pa-IN":"dd-MM-yy","gu-IN":"dd-MM-yy","ta-IN":"dd-MM-yyyy","te-IN":"dd-MM-yy","kn-IN":"dd-MM-yy","mr-IN":"dd-MM-yyyy","sa-IN":"dd-MM-yyyy","mn-MN":"yy.MM.dd","gl-ES":"dd/MM/yy","kok-IN":"dd-MM-yyyy","syr-SY":"dd/MM/yyyy","dv-MV":"dd/MM/yy","ar-IQ":"dd/MM/yyyy","zh-CN":"yyyy/M/d","de-CH":"dd.MM.yyyy","en-GB":"dd/MM/yyyy","es-MX":"dd/MM/yyyy","fr-BE":"d/MM/yyyy","it-CH":"dd.MM.yyyy","nl-BE":"d/MM/yyyy","nn-NO":"dd.MM.yyyy","pt-PT":"dd-MM-yyyy","sr-Latn-CS":"d.M.yyyy","sv-FI":"d.M.yyyy","az-Cyrl-AZ":"dd.MM.yyyy","ms-BN":"dd/MM/yyyy","uz-Cyrl-UZ":"dd.MM.yyyy","ar-EG":"dd/MM/yyyy","zh-HK":"d/M/yyyy","de-AT":"dd.MM.yyyy","en-AU":"d/MM/yyyy","es-ES":"dd/MM/yyyy","fr-CA":"yyyy-MM-dd","sr-Cyrl-CS":"d.M.yyyy","ar-LY":"dd/MM/yyyy","zh-SG":"d/M/yyyy","de-LU":"dd.MM.yyyy","en-CA":"dd/MM/yyyy","es-GT":"dd/MM/yyyy","fr-CH":"dd.MM.yyyy","ar-DZ":"dd-MM-yyyy","zh-MO":"d/M/yyyy","de-LI":"dd.MM.yyyy","en-NZ":"d/MM/yyyy","es-CR":"dd/MM/yyyy","fr-LU":"dd/MM/yyyy","ar-MA":"dd-MM-yyyy","en-IE":"dd/MM/yyyy","es-PA":"MM/dd/yyyy","fr-MC":"dd/MM/yyyy","ar-TN":"dd-MM-yyyy","en-ZA":"yyyy/MM/dd","es-DO":"dd/MM/yyyy","ar-OM":"dd/MM/yyyy","en-JM":"dd/MM/yyyy","es-VE":"dd/MM/yyyy","ar-YE":"dd/MM/yyyy","en-029":"MM/dd/yyyy","es-CO":"dd/MM/yyyy","ar-SY":"dd/MM/yyyy","en-BZ":"dd/MM/yyyy","es-PE":"dd/MM/yyyy","ar-JO":"dd/MM/yyyy","en-TT":"dd/MM/yyyy","es-AR":"dd/MM/yyyy","ar-LB":"dd/MM/yyyy","en-ZW":"M/d/yyyy","es-EC":"dd/MM/yyyy","ar-KW":"dd/MM/yyyy","en-PH":"M/d/yyyy","es-CL":"dd-MM-yyyy","ar-AE":"dd/MM/yyyy","es-UY":"dd/MM/yyyy","ar-BH":"dd/MM/yyyy","es-PY":"dd/MM/yyyy","ar-QA":"dd/MM/yyyy","es-BO":"dd/MM/yyyy","es-SV":"dd/MM/yyyy","es-HN":"dd/MM/yyyy","es-NI":"dd/MM/yyyy","es-PR":"dd/MM/yyyy","am-ET":"d/M/yyyy","tzm-Latn-DZ":"dd-MM-yyyy","iu-Latn-CA":"d/MM/yyyy","sma-NO":"dd.MM.yyyy","mn-Mong-CN":"yyyy/M/d","gd-GB":"dd/MM/yyyy","en-MY":"d/M/yyyy","prs-AF":"dd/MM/yy","bn-BD":"dd-MM-yy","wo-SN":"dd/MM/yyyy","rw-RW":"M/d/yyyy","qut-GT":"dd/MM/yyyy","sah-RU":"MM.dd.yyyy","gsw-FR":"dd/MM/yyyy","co-FR":"dd/MM/yyyy","oc-FR":"dd/MM/yyyy","mi-NZ":"dd/MM/yyyy","ga-IE":"dd/MM/yyyy","se-SE":"yyyy-MM-dd","br-FR":"dd/MM/yyyy","smn-FI":"d.M.yyyy","moh-CA":"M/d/yyyy","arn-CL":"dd-MM-yyyy","ii-CN":"yyyy/M/d","dsb-DE":"d. M. yyyy","ig-NG":"d/M/yyyy","kl-GL":"dd-MM-yyyy","lb-LU":"dd/MM/yyyy","ba-RU":"dd.MM.yy","nso-ZA":"yyyy/MM/dd","quz-BO":"dd/MM/yyyy","yo-NG":"d/M/yyyy","ha-Latn-NG":"d/M/yyyy","fil-PH":"M/d/yyyy","ps-AF":"dd/MM/yy","fy-NL":"d-M-yyyy","ne-NP":"M/d/yyyy","se-NO":"dd.MM.yyyy","iu-Cans-CA":"d/M/yyyy","sr-Latn-RS":"d.M.yyyy","si-LK":"yyyy-MM-dd","sr-Cyrl-RS":"d.M.yyyy","lo-LA":"dd/MM/yyyy","km-KH":"yyyy-MM-dd","cy-GB":"dd/MM/yyyy","bo-CN":"yyyy/M/d","sms-FI":"d.M.yyyy","as-IN":"dd-MM-yyyy","ml-IN":"dd-MM-yy","en-IN":"dd-MM-yyyy","or-IN":"dd-MM-yy","bn-IN":"dd-MM-yy","tk-TM":"dd.MM.yy","bs-Latn-BA":"d.M.yyyy","mt-MT":"dd/MM/yyyy","sr-Cyrl-ME":"d.M.yyyy","se-FI":"d.M.yyyy","zu-ZA":"yyyy/MM/dd","xh-ZA":"yyyy/MM/dd","tn-ZA":"yyyy/MM/dd","hsb-DE":"d. M. yyyy","bs-Cyrl-BA":"d.M.yyyy","tg-Cyrl-TJ":"dd.MM.yy","sr-Latn-BA":"d.M.yyyy","smj-NO":"dd.MM.yyyy","rm-CH":"dd/MM/yyyy","smj-SE":"yyyy-MM-dd","quz-EC":"dd/MM/yyyy","quz-PE":"dd/MM/yyyy","hr-BA":"d.M.yyyy.","sr-Latn-ME":"d.M.yyyy","sma-SE":"yyyy-MM-dd","en-SG":"d/M/yyyy","ug-CN":"yyyy-M-d","sr-Cyrl-BA":"d.M.yyyy","es-US":"M/d/yyyy"};
      
        var l = navigator.language ? navigator.language : navigator['userLanguage'],
          y = d.getFullYear(),
          m = d.getMonth() + 1,
          d = d.getDate();
        f = (l in f) ? f[l] : "MM/dd/yyyy";
      
        function z(s) {
          s = '' + s;
          return s.length > 1 ? s : '0' + s;
        }
        f = f.replace(/yyyy/, y);
        f = f.replace(/yy/, String(y).substr(2));
        f = f.replace(/MM/, z(m));
        f = f.replace(/M/, m);
        f = f.replace(/dd/, z(d));
        f = f.replace(/d/, d);
        return f;
      },
      openFacebookOnPopup: function(relativPath){
        window.open('https://www.facebook.com/sharer/sharer.php?u=https://wendogo.com/'+relativPath, 'facebook-share-dialog', 'width=650,height=650')

      },
      triggerToastError: function(error, errorText=ERROR_TEXT){
        let msgToast
        if(error.status === 'FETCH_ERROR'){
            msgToast = () => (
                <div>
                  <p>Veuillez verifier votre connexion internet. Ou contactez-nous  
                     <a href="https://m.me/wendogoHQ" style={{color: "rgb(1, 84, 192)"}}><b> ici.</b></a>
                   </p>
                </div>
              )
        }else{
            msgToast = () => (
                <div>{errorText}</div>
              )                
        }
        this.toastError(msgToast)          
      },
      addOutsideClick: function(handleOutsideClickFunc) {
        // document.addEventListener("mousedown", handleOutsideClickFunc);
        // return () => {
        //   document.removeEventListener("mousedown", handleOutsideClickFunc);
        // }
      },
      updateWendogouserCookie: function(callback, user, simulationStep, simulationStepValue){
        callback()
        let updatedUser = {...user, simulationStep, simulationStepValue:simulationStepValue, date: new Date().toISOString()}
        helper.setLocalStorageWithExpiration('wendogouser', updatedUser)    
      },
      isTargetContainsIgnoreClass: function(target){
        const ignoreDivs = document.querySelectorAll('.ignore-outside-click');
        let isIgnored = false;
        ignoreDivs.forEach((div) => {
          if (div.contains(target)) {
            isIgnored = true;
          }
        });
        return isIgnored;
      },
      updateBAC : function(isInUniversityGlobal, user, downgradedYear) {
        // Un peu contradictoire avec ce qui est dit dans la base de données, mais ici c'est juste pour le design 
        let educationLevel
        if(isInUniversityGlobal){
          educationLevel = user?.universityLevelSelected.name
        }else if(user?.hsLevelSelected === 'deg00002'){ // Première
          educationLevel = 'BAC-1'
        }else if(user?.hsLevelSelected === 'deg00003'){ // Terminale
          educationLevel = 'BAC-0'
        }
        // Extract the last character from the education level string
        let lastTwoCharacters = _.takeRight(educationLevel, 2).join('');
        
        // Convert the last character to an integer and subtract the specified number of years
        let updatedNumber = parseInt(lastTwoCharacters, 10) - downgradedYear;
        console.log('updatedNumberlastCharacter', {educationLevel, lastTwoCharacters, updatedNumber})
        // Handle different cases based on the value of updatedNumber
        if(updatedNumber === 1){
          return 'du diplôme du Baccalauréat et BAC+1';
        }else if (updatedNumber === 0) {
          return 'de Terminale';
        } else if (updatedNumber === -1) {
          return 'de la classe de Première (ou équivalent)';
        } else if (updatedNumber <= -2) {
          return 'de la classe de Seconde (ou équivalent)';
        } else {
          // Return the updated BAC level if it's greater than -2
          return `BAC+${updatedNumber}`;
        }
    },
    getMostRecentBacId : function(user) {
      const hsLevelSelected = user?.hsLevelSelected;
      if (hsLevelSelected === 'deg00003' || hsLevelSelected === 'deg00002') {
          return `bac0000${hsLevelSelected.slice(-1)}`;
      }
      return user?.universityLevelSelected?.id;
    },
    universityTermIsComplete : function(subjectLists) {
      const filledArraysCount = subjectLists.filter(list => list.length > 0).length;
      return filledArraysCount >= 2;
    },
    isApplyingForMaster : function(user, subjectLists, level) {
      let mostRecentBacId = helper.getMostRecentBacId(user); 
      let bac_year = parseInt(mostRecentBacId.slice(-1))
      let currentBacId = 'bac0000'+(bac_year-level)
      console.log('🥳 mostRecentBacId', mostRecentBacId, bac_year, currentBacId)
      if(currentBacId>'bac00005' || (currentBacId === 'bac00006' && helper.universityTermIsComplete(subjectLists))){
          return true
      }else{
          return false
      }
    },
    getRecentReportCard: function(user, period){
      // Helper function to check if array has baccalaureat subjects
      const hasBaccalaureat = (array) => {
        return array.some(subject => subject.isBaccalaureat === true);
      };
    
      // Helper function to adjust references to start at 1
      const adjustReferences = (array) => {
        return array.map((subject, index) => ({
          ...subject,
          reference: index + 1
        }));
      };
    
      // Helper function to get valid arrays from a report card
      const getValidArrays = (reportCard) => {
        // Return empty array if reportCard is null or empty
        if (!reportCard || !Array.isArray(reportCard) || reportCard.length === 0) {
          return [];
        }
    
        // Filter out empty arrays and arrays with baccalaureat subjects
        return reportCard
          .filter(arr => Array.isArray(arr) && arr.length > 0 && !hasBaccalaureat(arr));
      };
    
      // Start with requested period and continue up to period 3
      for (let currentPeriod = period; currentPeriod <= 3; currentPeriod++) {
        //Todo : get method here remove with item, check it later
        const reportCard = get(user, `reportCard${currentPeriod}`, []);
        console.log('🥳 reportCard', reportCard)
        const validArrays = getValidArrays(reportCard);
    
        if (validArrays.length > 0) {
          // Return the most recent (last) valid array with adjusted references
          return adjustReferences(validArrays[validArrays.length - 1]);
        }
      }
    
      return [];
    }    
}

export default helper
