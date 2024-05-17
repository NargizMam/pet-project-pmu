import { HomeCarousel } from '../../components/HomeCarousel/HomeCarousel.tsx';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory.tsx';
import './MainPage.css';

const MainPage = () => {

  return (
    <>
      <HomeCarousel/>
      <div className="shop_category">
        <ShopByCategory/>
      </div>
    </>
  );
};

export default MainPage;
