import {Link} from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="App">
            <div className="header">
                <h1>Expense Tracker</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/transactions">Transactions</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="main py-5">
                <div className="container">{children}</div>
            </div>

            <div className="footer">&copy;2022 Learn with Sumit</div>
        </div>
    );
}
