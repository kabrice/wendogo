import { useState, CSSProperties, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from 'react-redux'

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "0154c0",
};

const Spinner = () =>  {

    const spinner = useSelector((state) => state.spinner.active)
    //const dispatch = useDispatch()

  //const openModal = useSelector((state) => state.subsModal.open)
  
  useEffect(() => {
    //console.log('===>', spinner)
    if(spinner){
        handlePageScrollAndClickEvent("hidden")
    }else{
        handlePageScrollAndClickEvent("") 
    }
  })

  const handlePageScrollAndClickEvent = (overflowVal) => {
        document.body.style.overflow = overflowVal
        // document.addEventListener("click", e => {
        //     if(activateClick){
        //         e = window.event;
        //         e.cancelBubble = true;
        //     }
        //     e.stopPropagation();
        //     e.preventDefault();
        // }, true);
        return () => {
            document.body.style.overflow = overflowVal
            // document.addEventListener("click", e => {
            //     e.stopPropagation();
            //     e.preventDefault();
            // }, true)
        }
  }
  return (<> { spinner &&
    <div className="sweet-loading">
      <ClipLoader
        color={"#0154c0"}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div> }
    </>
  );
}

export default Spinner;
