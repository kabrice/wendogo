import Calendar from "../components/Calendar";
import Footer from "../components/Footer";
import HeaderMenuLoginBar from '../components/HeaderMenuLoginBar';

const Appointment = () => {
    return (
        <div>
            <HeaderMenuLoginBar/>
            <h1>Veuillez prendre rendez</h1>
            <Calendar />
            <Footer />
        </div>
    );
}

export default Appointment;
