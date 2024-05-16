import { HomeCarousel } from '../../components/HomeCarousel/HomeCarousel.tsx';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory.tsx';
import './MainPage.css';
import AppointmentCalendar from '../Appointment/AppointmentCalendar.tsx';

const MainPage = () => {
  return (
    <>
      <HomeCarousel/>
      <div className="shop_category">
        <ShopByCategory/>
      </div>
      <AppointmentCalendar/>
    </>
  );
};

export default MainPage;
