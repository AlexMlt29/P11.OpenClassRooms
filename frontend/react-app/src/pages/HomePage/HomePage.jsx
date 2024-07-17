import React from "react";
import icon1 from "../../images/icon-chat.png";
import icon2 from "../../images/icon-money.png";
import icon3 from "../../images/icon-security.png";
import FeatureItem from "../../components/FeatureItem/FeatureItem";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="app-container">
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem 
            icon={icon1} 
            title="You are our #1 priority" 
            description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          />
          <FeatureItem 
            icon={icon2} 
            title="More savings means higher rates" 
            description="The more you save with us, the higher your interest rate will be!"
          />
          <FeatureItem 
            icon={icon3} 
            title="Security you can trust" 
            description="We use top of the line encryption to make sure your data and money is always safe."
          />
        </section>
      </main>
    </div>
  );
}

export default HomePage;
