import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import MarketplacePage from "./pages/MarketplacePage";
import routes from "tempo-routes";
import ConnectWalletButton from "./components/ui/ConnectWalletButton";

// Header component with wallet button
const Header = () => {
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      right: 0,
      padding: '1rem',
      zIndex: 100
    }}>
      <ConnectWalletButton />
    </div>
  );
};

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
