function Left(){
    return(
        <div className="left">
            <ul>
                <li>
                    <button className="active">
                        <img src="/src/assets/dashboard.png" alt="Dashboard" />
                        Dashboard
                    </button>
                </li>
                <li>
                    <button>
                        <img src="/src/assets/money.png" alt="Expenses" /> 
                        Expenses
                    </button>
                </li>
                <li>
                    <button>
                        <img src="/src/assets/categories.png" alt="Categories" />
                        Categories
                    </button>
                </li>
                <li>
                    <button>
                        <img src="/src/assets/reports.png" alt="Reports" />
                        Reports
                    </button>
                </li>
                <li>
                    <button>
                        <img src="/src/assets/settings.png" alt="Settings" />
                        Settings
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Left;