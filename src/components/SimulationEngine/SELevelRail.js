import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ButtonLarge from "../ButtonLarge";
import SvgConstant from '../../utils/SvgConstant';

const SELevelRail = (props) => {

    const {title, arialLabel, defaultValue, step, marks, valuetext, valueLabelFormat, handleContinue, showContinueBtn, handleChange, svgConstantName, id} = props;
    const CustomSliderStyles = {
        '& .MuiSlider-thumb': {
            color: "#0154c0"
        },
        '& .MuiSlider-track': {
            height: 8,
            color: "#0154c0"
        },
        '& .MuiSlider-markLabelActive': {
            color: "#0154c0",
        },
        '& .MuiSlider-markLabel': {
            fontFamily: "Roboto, sans-serif",
        }
    };
  return (
        <div id={id+'1'} className="FieldWrapper StepperField PRI_HIS_NBR_SIN field-valid fade-animation fade-slow-enter-done">
            <div className="FieldView DaisyFieldView undefined field-valid StepperField PRI_HIS_NBR_SIN ">
                <div className="FieldView-flex-container">
                    <label className="Label ">{svgConstantName && SvgConstant.getSvg(svgConstantName)} {title}</label> 
                    {/* <div id="daisy-tooltip-PRI_HIS_NBR_SIN" className="PopinTooltip">
                        <button type="button" className="PopinTooltip-button-open">
                            <div className="Tooltip-picto">?</div>
                        </button>
                    </div> */}
                </div>
                <div className="DrawerAnimation" style={{ height: 0 }}><div />
                </div>
                <div className="app-row app-field">
                    <div className="app-col-xs-12 app-col-sm-8 app-col-md-8 Field ignore-outside-click">
                        <div id="PRI_HIS_NBR_SIN" className="Stepper field-valid" tabIndex={8}>
                        <Box sx={{ width: '100%' }} id={id+'2'} key={id+'2'}>
                            <Slider sx={CustomSliderStyles}  aria-label={arialLabel} valueLabelFormat={valueLabelFormat}  defaultValue={defaultValue} 
                                    getAriaValueText={valuetext} step={step} valueLabelDisplay="auto" marks={marks} key={`slider-${defaultValue}`} 
                                    onChange={handleChange} id={id+'3'} />
                        </Box>
                        </div>
                    </div>
                </div>
                {showContinueBtn && <ButtonLarge name="Continuer" handleContinue={handleContinue} />}
            </div>
        </div>
  );
}

export default SELevelRail;
