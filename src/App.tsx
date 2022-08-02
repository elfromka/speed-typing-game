import "./assets/scss/styles.scss";

const App: React.FC = (): JSX.Element => {
    return (
        <main className="container">
            <section className="game">
                <h1 className="game__title">Speed Typing Game</h1>
                <textarea className="game__textarea" value="" />
                <h2 className="game__timer">Remaining time: 0</h2>
                <button className="game__start-button">Start</button>
                <h2 className="game__total-typeed-words">
                    Total words typed: 5
                </h2>
            </section>
        </main>
    );
};

export default App;
