import AboutUs from '@/components/AboutUs';

export default function AboutUsPage() {
  return (
    <>
      <div className="about-banner">
        <div className="about-banner-content">
          <h1>About Us</h1>
          <div className="breadcrumb">
            <span>POLESIN</span>
          </div>
        </div>
      </div>
      
      <AboutUs />
    </>
  );
}
