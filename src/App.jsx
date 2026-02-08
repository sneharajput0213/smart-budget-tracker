import { useState } from "react";
import Navbar from "./components/Navbar";
import Left from "./components/Left";
import Right from "./components/Right";

function App() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );

  return (
    <div className="App">
      <Navbar
        months={months}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      <div className="layout">
        <Left />
        <Right selectedMonth={selectedMonth} />
      </div>
    </div>
  );
}

export default App;
