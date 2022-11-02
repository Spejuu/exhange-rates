import "./App.css";
import { useState } from "react";

const URL = "https://api.exchangerate.host/latest";
function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        setRate(json.rates.GBP);
        setGbp(eur * json.rates.GBP);
      } else {
        alert("Error retrieving exchange rate");
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="p-5">
      <h3 class="heading">Calculates Currency Conversions</h3>
      <div id="container">
        <form onSubmit={convert}>
          <div style={{ padding: "4px" }}>
            <label>Eur</label>&nbsp;
            <input
              type="number"
              step="0.01"
              value={eur}
              onChange={(e) => setEur(e.target.value)}
            />
            <output style={{ paddingLeft: "8px" }}>{rate}</output>
          </div>
          <div style={{ padding: "4px" }}>
            <label>Gbp</label>&nbsp;
            <output>{gbp.toFixed(2)} €</output>
          </div>
          <div style={{ paddingLeft: "4px" }}>
            <button>Calculate</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
