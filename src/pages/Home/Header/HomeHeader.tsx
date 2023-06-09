import IonIcon from "@reacticons/ionicons";
import Header from "../../../components/Header/Header";
import css from "./HomeHeader.module.css";

function HomeHeader() {
  return (
    <Header>
      <h1>Currency converter</h1>
      <p className="textCenter">
        <IonIcon className={css.icon} name="cash-outline"></IonIcon>
      </p>
    </Header>
  );
}

export default HomeHeader;
