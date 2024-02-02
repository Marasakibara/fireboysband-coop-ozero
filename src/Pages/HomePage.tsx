import ContentPanel from '../components/ContentPanel';
import HeaderPanelComponent from '../components/HeaderPanelComponent';

const HomePage = () => {
  return (
    <>
      <HeaderPanelComponent />
      <div className="HomePage">
        <ContentPanel />
      </div>
    </>
  );
};

export default HomePage;
