import HomeHeader from "./Header/HomeHeader";
import HomeForm from "./Form/HomeForm";
import Container from "../../components/Container/Container";

function Home() {
  return (
    <Container>
      <HomeHeader></HomeHeader>
      <HomeForm></HomeForm>
    </Container>
  );
}

export default Home;
