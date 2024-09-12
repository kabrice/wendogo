import ButtonLarge from "../ButtonLarge";
import React from "react";

const SEAlertMessage = (props) => {
    const { title, subtitles, icon, isError, showContinueBtn } = props;

    // Conditionally render content based on screen width
    const renderContent = () => {
        if (window.innerWidth > 768) {
            return (
                <>
                    <div className="MegaTip-icon">
                        {icon}
                    </div>
                    <div className="MegaTip-content" >
                        <div className="Stack stackColumn" style={{ flexDirection: "column", padding: 0, alignItems: "stretch", justifyContent: "center" }}>
                            <div className="Stack-child" style={{ paddingTop: 8 }}>
                                <div className="Heading s isWeak MegaTip-title">
                                    <div className="Stack stackColumn" style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                        <div className="Stack-child" style={{ paddingTop: 8 }}>{title}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="Stack-child" style={{ paddingTop: 8 }}>
                                <div className="MegaTip-text">
                                    {subtitles.map((subtitle, index) => <p key={index}>{subtitle}</p>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="Stack stackColumn" style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                        <div className="Stack-child" style={{ paddingTop: 15 }}>
                            <div className="Stack stackRow" style={{ flexDirection: "row", padding: 0, alignItems: "center" }}>
                                <div className="Stack-child" style={{ paddingLeft: 0 }}>
                                    <div className="MegaTip-icon">
                                        {icon}
                                    </div>
                                </div>
                                <div className="Stack-child" style={{ paddingLeft: 0 }}>
                                    <div className="Heading s isWeak MegaTip-title">
                                        <div className="Stack stackColumn" style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                            <div className="Stack-child" style={{ paddingTop: 8 }}>{title}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Stack-child" style={{ paddingTop: 15 }}>
                            <div className="Stack stackColumn" style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>
                                <div className="Stack-child" style={{ paddingTop: 0 }}>
                                    <div className="MegaTip-content">
                                        {subtitles.map((subtitle, index) => <p key={index}>{subtitle}</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <div className="FieldView DaisyFieldView undefined field-default SelectField VEH_USA_KILOM fade-animation fade-slow-enter-done">
            <div className="app-row app-field">
                <div className="app-col-xs-12 app-col-sm-12 app-col-md-12 Field">
                    <div className={`MegaTip ${isError ? 'MegaTip-error-color' : 'MegaTip-normal-color'}`}>
                        {renderContent()}
                    </div>
                </div>
            </div>
            {showContinueBtn && <ButtonLarge name="Continuer" />}
        </div>
    );
}

export default SEAlertMessage;
