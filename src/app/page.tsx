import Educators from "./_components/Educators";
import Faqs from "./_components/Faqs";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Rooms from "./_components/Rooms";
import Safety from "./_components/Safety";
import Steps from "./_components/Steps";
import Visit from "./_components/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Safety />
        <Rooms />
        <Steps />
        <Faqs />
        <Educators />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
