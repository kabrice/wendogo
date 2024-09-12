import {React, useRef, useEffect } from "react";
import helper from "../utils/Helper";

const Modal = (props) => {
    const { title, paragraphs, icon, hideShowModal, isLiTag, specialText, firstParagraphs } = props;

    const newRefModal = useRef(null)
    const handleOutsideClick = (e) => {
        if (newRefModal.current && !newRefModal.current.contains(e.target) && !helper.isTargetContainsIgnoreClass(e.target)) {
            hideShowModal(false)
            //console.log('Outside click Modal')
        }
      };

    useEffect(() => {
        helper.addOutsideClick(handleOutsideClick)
      } )
    return (
        <div className="ModalCore fade-animation fade-fast-enter-done" style={{ zIndex: 131 }}>
            <div ref={newRefModal}  className="ModalCore-content withImage" style={{ transition: "transform 300ms ease-in-out 0s", transform: "scale(1, 1)" }}>
                <div className="Modal  " style={{ padding: "74px 0px 0px" }}>
                <div className="Modal-header" style={{ boxShadow: "white 0px 30px 15px -15px" }}>
                    <div className="left" />
                    <div className="center">
                    {icon}
                    </div>
                    <div className="right" onClick={() => hideShowModal(false)}>
                        <svg viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" className="Modal-close ">
                            <path d="M17 0c9.389 0 17 7.611 17 17s-7.611 17-17 17S0 26.389 0 17 7.611 0 17 0zm0 1C8.163 1 1 8.163 1 17s7.163 16 16 16 16-7.163 16-16S25.837 1 17 1zm5.588 10.415c.47.47.545 1.194.19 1.764l-.083.12-.107.12-3.584 3.584 3.584 3.584c.436.436.532 1.091.26 1.64l-.07.124-.083.12-.107.12c-.47.47-1.194.545-1.764.19l-.12-.083-.12-.107L17 19.007l-3.584 3.584a1.414 1.414 0 01-1.64.26l-.124-.07-.12-.083-.12-.107a1.419 1.419 0 01-.19-1.764l.083-.12.107-.12 3.584-3.584-3.584-3.584a1.414 1.414 0 01-.26-1.64l.07-.124.083-.12.107-.12a1.419 1.419 0 011.764-.19l.12.083.12.107L17 15l3.584-3.584a1.417 1.417 0 012.004 0z" fill="#7F94A9" fillRule="nonzero" />
                        </svg>
                    </div>
                </div>
                <div className="Modal-body ">
                    <div className="Heading m"> {title}</div>
                    <div className="styles__Block-sc-1b5sr4l-5 lhYawK">
                      {firstParagraphs && firstParagraphs.map((paragraph, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                            // <p >{paragraph}</p>
                            ))}
                       { isLiTag &&
                        <ul className="TextList-sc-100qkuv-0 enKgYQ">
                          {paragraphs.map((paragraph, index) => (
                            <li key={index}>{paragraph}</li>
                            
                            ))}
                        </ul>}
                        { !isLiTag &&
                          paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                            ))}
                      </div>
                    <div className="Modal-footer">
                        <div><i>{specialText}</i></div>
                        <div className="Stack  stackColumn " style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                            <div className="Stack-child  " style={{ paddingTop: 0 }}>
                            <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "stretch", justifyContent: "center" }}>
                                <div className="Stack-child  " style={{ paddingLeft: 15 }}>
                                <button className="CTA button primary medium" title="" data-trackingprefix="" onClick={() => hideShowModal(false)}> Fermer </button>
                                </div>
                            </div>
                            </div>
                            <div className="Stack-child  " style={{ paddingTop: 0 }}>
                            <div className="Modal-footer-text" />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>  
    );
}

export default Modal;
