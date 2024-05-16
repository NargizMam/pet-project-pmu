import { HomeCarousel } from '../../components/HomeCarousel/HomeCarousel.tsx';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory.tsx';
import './MainPage.css';
import MasterList from '../Masters/MasterList.tsx';
import MasterCalendar from '../Masters/MasterCalendar.tsx';
import { useState } from 'react';

const MainPage = () => {
  const [selectedMasterId, setSelectedMasterId] = useState<string | null>(null);

  return (
    <>
      <HomeCarousel/>
      <div className="shop_category">
        <ShopByCategory/>
      </div>
      <MasterList onSelectMaster={setSelectedMasterId} />
      {selectedMasterId && <MasterCalendar masterId={selectedMasterId} />}
    </>
  );
};

export default MainPage;
