import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import logo from "/logo.png";
import "./Footer.css";


const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Lundi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 2,
      day: "Mardi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 3,
      day: "Mercredi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 4,
      day: "Jeudi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 5,
      day: "Vendredi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 6,
      day: "Samedi",
      time: "9:00 AM - 11:00 PM",
    },
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src={logo} alt="logo" className="logo-img"/>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <Link to={"/"}>Acceuil</Link>
              <Link to={"/appointment"}>Rendez-vous</Link>
              <Link to={"/about"}>A propos</Link>
            </ul>
          </div>
          <div>
            <h4>Heur de travail</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>+216 71 85 85 85</span>
            </div>
            <div>
              <MdEmail />
              <span>hello@rbk.tn</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>B24, Technopark Elghazela ariana, 2088, Tunisie</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;