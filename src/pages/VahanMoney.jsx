import React from "react";
import Vahanmoney from "../assets/vahanmoney.png"; 
import PageBanner from "../components/PageBanner";

const VahanMoney = () => {
  return (
    <div>
      <PageBanner
        title="Coming Soon"
        image={Vahanmoney} 
        useGradientTitle={true}
      />
      <div className="mt-6 md:mt-12 lg:mt-12 xl:mt-0" />
    </div>
  );
};

export default VahanMoney;