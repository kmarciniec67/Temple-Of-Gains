import React from "react";
import '../App.css';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Start_Page = () =>{
    return(
        <div className="App">
      <div className="blockLogin">
        <div className="loginLeft">
            ZDJ
        </div>
        <div className="loginRight">
          LOGO
          <h2>Temple_ of gains</h2>
          <Link to="/login" className="logRegGoToBtn">
          {/* <button className="logRegGoToBtn">ZALOGUJ SIĘ</button> */}
          ZALOGUJ SIĘ
          </Link>
          <Link to="/register" className="logRegGoToBtn">
          {/* <button className="logRegGoToBtn">UTWORZ KONTO</button> */}
          UTWORZ KONTO
          </Link>
        </div>
      </div>
      <div className="keyFeatures">
        <h2 className="kf">KEY FEATURES</h2>
        <div className="keyFeaturesBlocks">
          <div className="keyFeaturesBlock1">
            ZDJ
            <hr></hr>
            TXT
          </div>
          <div className="keyFeaturesBlock2">
            ZDJ
            <hr></hr>
            TXT
          </div>
          <div className="keyFeaturesBlock3">
            ZDJ
            <hr></hr>
            TXT
          </div>
        </div>
      </div>
      <div className="userPanel">
        <h2>USER PANEL</h2>
      </div>
      <div className="userPanelBlocks">
        <div className="userPanelBlockLeft">
            <ul>
              <li>Input fields for workout</li>
              <li>Comprehensive workout history</li>
              <li>Progress tracking metrics</li>
            </ul>
        </div>
        <div className="userPanelBlockRight">
          ZDJ
        </div>
      </div>
      <div className="userJourney">
        <h2>USER JOURNEY</h2>
        <div className="userJourneyBlocks">
          <div className="userJourneyBlock">
            <h4>LOGIN</h4>
            <p>Enter credentials</p>
          </div>
          <div className="userJourneyBlock">
            <h4>INPUT</h4>
            <p>Log workouts</p>
          </div>
          <div className="userJourneyBlock">
            <h4>REVIEW</h4>
            <p>View history</p>
          </div>
          <div className="userJourneyBlock">
            <h4>ANALYZE</h4>
            <p>Track Progress</p>
          </div>
          <div className="userJourneyBlock">
            <h4>EXPLORE</h4>
            <p>Check insights</p>
          </div>
        </div>
      </div>
      <div className="wrkAnaOV">
        <h2 className="WAOh2">WORKOUT ANALYTICS OVERVIEW</h2>
      </div>
      <div className="WAOBlocks">
        <div className="WAOBlockLeft">
          ZDJ
        </div>
        <div className="WAOBlockRight">
            <ul>
              <li>Visualize your training progress</li>
              <li>Analyze workout trends over time</li>
              <li>Set and track fitness goals</li>
            </ul>
        </div>
      </div>
      <div className="nsBlocks">
        <div className="nsBlockLeft">
          <h4>NEXT STEPS</h4>
          <hr></hr>
        </div>
        <div className="nsBlockRight">
          <div className="nsBlockRightBlock">
            <h4>CREATE AN ACOUNT</h4>
          </div>
          <div className="nsBlockRightBlock">
            <p>Create your account</p>
            <ul>
              <li>Easy registration process</li>
              <li>Verify your email</li>
            </ul>
          </div>
          <div className="nsBlockRightBlock">
            <h4>Log Your Workout</h4>
          </div>
          <div className="nsBlockRightBlock">
            <p>Create your account</p>
            <ul>
              <li>Easy registration process</li>
              <li>Verify your email</li>
            </ul>
          </div>
          <div className="nsBlockRightBlock">
            <h4>Explore Analytics</h4>
          </div>
          <div className="nsBlockRightBlock">
            <p>Create your account</p>
            <ul>
              <li>Easy registration process</li>
              <li>Verify your email</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="contactBlock">
        <h1>CONTACT US</h1>
        <h2>Reach out for support and inquiries.</h2>
      </div>
      <div className="contactDetailsBlocks">
        <div className="contactDetailsBlock">
          ZDJ
          <p>123-456-789</p>
        </div>
        <div className="contactDetailsBlock">
          ZDJ
          <p>hello@reallygreatsite</p>
        </div>
      </div>
    </div>
    );
}

export default Start_Page;