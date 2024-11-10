import React from 'react';

const QuestionsOnTopic = () => {
    return (
        <div className="styles__FooterComponent-sc-ifmuzk-6 cbSMYG">
            <div className="styles__FooterDivider-sc-ifmuzk-7 kJSAnk">
            <div className="styles__Divider-sc-31h1xy-0 fAxSIQ" />
            </div>
            <div className="Snackbarstyles__Container-sc-1eftkyq-0 bCFlYr styles__StyledSnackbar-sc-reeitb-9 fEroGA" />
            <div className="styles__HeaderCommentContainer-sc-reeitb-1 bzqaJA">
            <div className="styles__HeaderCommentDescriptionContainer-sc-reeitb-2 evOnbn">
                <h3 className="styles__Title-sc-reeitb-4 ckwYtV"> Des questions sur le sujet ? </h3>
                <h3 className="styles__Description-sc-reeitb-5 eYrYZq"> Envoyez les nous et on y répondra avec plaisir. </h3>
            </div>
            <button 
                className="Buttonstyles__Button-sc-vsowxm-1 cnoACk styles__StyledButton-sc-reeitb-3 bVQYWs"
                onClick={() => window.location.href = 'mailto:hello@wendogo.com?body=Nom :%0DPrénom :%0DContact :%0D%0DMA QUESTION 👇🏾'}>
                <span className="Buttonstyles__Label-sc-vsowxm-2 kGIufm">Envoyer ma question</span>
            </button>

            </div>
        </div>
    )
};

export default QuestionsOnTopic;
