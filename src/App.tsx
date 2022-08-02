import { useState, useEffect, ChangeEvent, useRef } from "react";
import "./assets/scss/styles.scss";

const App: React.FC = (): JSX.Element => {
    const TOTAL_SECONDS: number = 10;

    const [inputData, setInputData] = useState<string>("");
    const [remainingSeconds, setRemainingSeconds] =
        useState<number>(TOTAL_SECONDS);
    const [start, setStart] = useState<boolean>(false);
    const [totalWords, setTotalWords] = useState<number>(0);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (remainingSeconds > 0 && start) {
            textareaRef.current?.focus();
            setTimeout(() => {
                setRemainingSeconds(
                    (prevremainingSeconds) => prevremainingSeconds - 1
                );
            }, 1000);
        } else {
            endGame();
        }
    }, [remainingSeconds, start]);

    const countWords = (text: string): number =>
        text !== "" ? text.trim().split(" ").length : 0;

    const startGame = (): void => {
        setRemainingSeconds(TOTAL_SECONDS);
        setStart((prevStart) => !prevStart); // or simply pass true
        setTotalWords(0);
        setInputData("");
    };

    const endGame = (): void => {
        setStart(false);
        setTotalWords(countWords(inputData));
    };

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const { value }: { value: string } = event.target;

        setInputData(() => value);
    };

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
                    Remaining time: {remainingSeconds}
                </h2>
                <button
                    disabled={start}
                    onClick={startGame}
                    className="game__start-button"
                >
                    Start
                </button>
                <h2 className="game__total-typeed-words">
                    Total words typed: {totalWords}
                </h2>
            </section>
        </main>
    );
};

export default App;
