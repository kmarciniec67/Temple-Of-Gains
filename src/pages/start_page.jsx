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
              <a href="#features">Funkcjonalność</a>
              <a href="#journey">User journey</a>
              <a href="#contact">Kontakt</a>
            </nav>
            <Link to="/login" className={"loginButton landingButton"}>Zaloguj się!</Link>
          </div>
        </header>

        <main className="mainContent">
          <section className="heroSection">
            <div className="heroContent">
              <h1 className="heroTitle">Witamy w Temple of Gains!</h1>
              <p className="heroDescription">Twój najlepszy towarzysz fitness.</p>

              <Link to="/register" className={"registerButton landingButton"}>Zarejestruj się!</Link>
            </div>

            <div className="heroImage">
              {/* <img src='../assets/fitness-training-dashboard.jpg" alt="Training dashboard' /> */}
              <img src={photo} alt="Training dashboard" />
            </div>
            
            
          </section>

          <section id="features" className="featuresSection">
            <h2 className="sectionTitle">Główne funkcje</h2>
        <div className="featuresGrid">
          <div className="featureCard">
            <div className="featureIcon">📊</div>
            <h3>Śledzenie treningów</h3>
            <p>
              Zapisuj każdą sesję ze szczegółami: ilością powtórzeń, podniesionym ciężarem, ilością serii, aby uzyskać kompleksową historię i&nbsp;analizę treningów.
            </p>
          </div>
          <div className="featureCard">
            <div className="featureIcon">💪</div>
            <h3>Analiza postępów</h3>
            <p>Wizualna reprezentacja Twoich postępów treningowych na wykresach. Śledź poprawę siły i&nbsp;pomiarów ciała w czasie.</p>
          </div>
          <div className="featureCard">
            <div className="featureIcon">🎯</div>
            <h3>Spersonalizowane treningi</h3>
            <p>Rekomendacje ćwiczeń dostosowanych do Twoich celów, poziomu sprawności i&nbsp;dostępnego sprzętu. Gotowe plany treningowe.</p>
          </div>
        </div>
          </section>

          {/* User Journey Section */}
      <section className="journey" id="journey">
        <h2 className="sectionTitle">Jak działamy?</h2>
        <div className="journeySteps">
          <div className="journeyItem">
            <div className="journeyStep">1</div>
            <h4>Utwórz konto</h4>
            <p>Łatwy proces rejestracji za pomocą e-mail.</p>
          </div>
          <div className="journeyItem">
            <div className="journeyStep">2</div>
            <h4>Wpisz aktualne pomiary</h4>
            <p>Zdefiniuj swoje cele fitness, ustaw pomiary ciała.</p>
          </div>
          <div className="journeyItem">
            <div className="journeyStep">3</div>
            <h4>Rozpocznij trening</h4>
            <p>Wybierz plan treningowy i&nbsp;rozpocznij ćwiczenia.</p>
          </div>
          <div className="journeyItem">
            <div className="journeyStep">4</div>
            <h4>Śledź postępy</h4>
            <p>Monitoruj postępy za pomocą analiz w&nbsp;postaci wykresów.</p>
          </div>
          <div className="journeyItem">
            <div className="journeyStep">5</div>
            <h4>Osiągnij cele</h4>
            <p>Osiągaj nowe kamienie milowe.</p>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="nextSteps">
        <h2 className="sectionTitle">Następne kroki</h2>
        <div className="stepsGrid">
          <div className="stepCard">
            <h4>Utwórz konto</h4>
            <p>Szybki proces rejestracji. Gotowe w kilka sekund.</p>
          </div>
          <div className="stepCard">
            <h4>Zarejestruj pierwszy trening</h4>
            <p>Wybierz plan treningowy i&nbsp;śledź wyniki.</p>
          </div>
          <div className="stepCard">
            <h4>Przeglądaj analizy</h4>
            <p>Sprawdź szczegółowe informacje na temat treningu i&nbsp;postępów.</p>
          </div>
          <div className="stepCard">
            <h4>Skorzystaj z bazy ćwiczeń</h4>
            <p>Skorzystaj z gotowej bazy ćwiczeń i&nbsp;planów treningowych.</p>
          </div>
        </div>
          </section>
          
          

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Pozostańmy w kontakcie!</h2>
        <p>Masz pytania? Jesteśmy tutaj, aby pomóc Ci w Twojej treningowej drodze ku lepszej sylwetce.</p>
        <div className="contactInfo">
          <a href="tel:+48666666666">📞 +48 666-666-666</a>
          <a href="mailto:support@templeofgains.com">📧 support@templeofgains.com</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footerContent">
          <div className="footerSection">
            <h5>Temple of Gains</h5>
            <p>Twój niezawodny towarzysz treningowy.</p>
          </div>
          <div className="footerSection">
            <h5>Szybkie linki</h5>
            <ul>
              <li>
                <a href="#features">Funkcje</a>
              </li>
              <li>
                <a href="#journey">Jak działamy?</a>
              </li>
              <li>
                <a href="#contact">Kontakt</a>
              </li>
            </ul>
          </div>
         
        </div>
        <div className="footerBottom">
          <p>&copy; 2025 Temple of Gains. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>

        </main>
      </div>
    );
}

export default Start_Page;