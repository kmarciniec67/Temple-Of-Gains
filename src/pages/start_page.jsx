import React from "react";
import '../App.css';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import photo from '../assets/fitness-training-dashboard.jpg';

const Start_Page = () =>{
    return(
      <div className="landingPageContainer">
        <header className="header">
          <div className="headerContent">
            <div className="logo">
              <h2>Temple of Gains</h2>
            </div>
            <nav className="nav">
              <a href="#features">Features</a>
              <a href="#journey">Journey</a>
              <a href="#contact">Contact</a>
            </nav>
            <Link to="/login" className={"loginButton landingButton"}>Zaloguj się!</Link>
          </div>
        </header>

        <main className="mainContent">
          <section className="heroSection">
            <div className="heroContent">
              <h1 className="heroTitle">Welcome to Temple of Gains</h1>
            <p className="heroDescription">Your ultimate fitness companion.</p>

              <Link to="/register" className={"registerButton landingButton"}>Zarejestruj się!</Link>
            </div>

            <div className="heroImage">
              {/* <img src='../assets/fitness-training-dashboard.jpg" alt="Training dashboard' /> */}
              <img src={photo} alt="Training dashboard" />
            </div>
            
            
          </section>

          <section id="features" className="featuresSection">
            <h2 className="sectionTitle">Main Features</h2>
        <div className="featuresGrid">
          <div className="featureCard">
            <div className="featureIcon">📊</div>
            <h3>Workout Tracking</h3>
            <p>
              Log every session with detailed metrics, weights, and performance data for comprehensive training history.
            </p>
          </div>
          <div className="featureCard">
            <div className="featureIcon">💪</div>
            <h3>Progress Analysis</h3>
            <p>Visual representation of your training gains. Track strength improvements and body metrics over time.</p>
          </div>
          <div className="featureCard">
            <div className="featureIcon">🎯</div>
            <h3>Smart Workouts</h3>
            <p>AI-powered exercise recommendations tailored to your goals, fitness level, and available equipment.</p>
          </div>
        </div>
          </section>

          {/* User Journey Section */}
      <section className="journey" id="journey">
        <h2 className="sectionTitle">Your Journey</h2>
        <div className="journeySteps">
          <div className="journeyItem">
            <div className="journeyStep">1</div>
            <h4>Create Account</h4>
            <p>Easy registration process with your email</p>
          </div>
          <div className="journeyItem">
            <div className="journeyStep">2</div>
            <h4>Set Goals</h4>
            <p>Define your fitness objectives</p>
          </div>
          <div className="journeyItem">
            <div className="journeyStep">3</div>
            <h4>Start Training</h4>
            <p>Choose workouts and begin logging</p>
          </div>
          <div className="journeyItem">
            <div className="journeyStep">4</div>
            <h4>Track Progress</h4>
            <p>Monitor improvements with analytics</p>
          </div>
          <div className="journeyItem">
            <div className="journeyStep">5</div>
            <h4>Achieve Goals</h4>
            <p>Reach new fitness milestones</p>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="nextSteps">
        <h2 className="sectionTitle">Next Steps</h2>
        <div className="stepsGrid">
          <div className="stepCard">
            <h4>Create an Account</h4>
            <p>Quick registration process. Ready in seconds.</p>
          </div>
          <div className="stepCard">
            <h4>Log Your First Workout</h4>
            <p>Choose your exercise type and track performance.</p>
          </div>
          <div className="stepCard">
            <h4>View Your Analytics</h4>
            <p>See detailed insights and training patterns.</p>
          </div>
          <div className="stepCard">
            <h4>Share Achievements</h4>
            <p>Connect with the community and celebrate wins.</p>
          </div>
        </div>
          </section>
          
          

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Get in Touch</h2>
        <p>Have questions? We're here to help with your fitness journey.</p>
        <div className="contactInfo">
          <a href="tel:+1234567890">📞 +1 (234) 567-890</a>
          <a href="mailto:support@trainflow.com">📧 support@trainflow.com</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footerContent">
          <div className="footerSection">
            <h5>TrainFlow</h5>
            <p>Your ultimate fitness training companion.</p>
          </div>
          <div className="footerSection">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#journey">Journey</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
         
        </div>
        <div className="footerBottom">
          <p>&copy; 2025 Temple of Gains. All rights reserved.</p>
        </div>
      </footer>

        </main>
      </div>
    );
}

export default Start_Page;