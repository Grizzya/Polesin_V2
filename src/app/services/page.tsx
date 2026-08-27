import Services from '@/components/Services';

export default function ServicesPage() {
  return (
    <>
      <div className="services-banner">
        <div className="services-banner-content">
          <h1>SERVICES</h1>
          <div className="breadcrumb">
            <span>POLESIN</span>
          </div>
        </div>
      </div>
      
      <Services />
    </>
  );
}
