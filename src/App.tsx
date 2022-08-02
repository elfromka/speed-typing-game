import useGame from "./hooks/useGame";
import "./assets/scss/styles.scss";

/**
 * Renders the game section with the textarea, buttons, and other texts based on the logic and states of the 'useGame' hook.
 * @return {JSX.Element} with various texts, textarea and button
 */
const App: React.FC = (): JSX.Element => {
    const [
        textareaRef,
        start,
        inputData,
        handleOnChange,
        remainingSeconds,
        startGame,
        totalWords,
    ] = useGame();

    return (
        <main className="container">
            <section className="game">
                <h1 className="game__title">Speed Typing Game</h1>
                <textarea
                    ref={textareaRef}
                    disabled={!start}
                    value={inputData}
                    name="inputData"
                    onChange={handleOnChange}
                    className="game__textarea"
                />
                <h2 className="game__timer">
                    Remaining time: {remainingSeconds}s
                </h2>
                <button
                    disabled={start}
                    onClick={startGame}
                    className="game__start-button"
                >
                    Start
                </button>
                <h2 className="game__total-typeed-words">
                    Total words typed in 60s: {totalWords}
                </h2>
            </section>
        </main>
    );
};

export default App;
