// components/SvgIcon.js
const SvgIcon = ({ sprite, className }) => (
    <svg className={`SvgIcon ${className || ''}`}>
      <use xlinkHref={`../../assets/simulation_icons/svg-sprite.gen.svg#${sprite}`} />
    </svg>
  );
  
  export default SvgIcon;
