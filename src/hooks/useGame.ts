import { useState, useEffect, ChangeEvent, useRef } from "react";

/**
 * Contains the business logic of the word count game.
 * @param {number} totalSeconds - total number of seconds that a player can have when the game is started (by default: 15s)
 * @return {any[]} an array with various methods and states that needs to be used in the rendered component (App.tsx)
 */
const useGame = (totalSeconds: number = 15): any[] => {
    const [inputData, setInputData] = useState<string>("");
    const [remainingSeconds, setRemainingSeconds] =
        useState<number>(totalSeconds);
    const [start, setStart] = useState<boolean>(false);
    const [totalWords, setTotalWords] = useState<number>(0);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (remainingSeconds > 0 && start) {
            // set focus on textarea when the game is started
            textareaRef.current?.focus();

            // count down
            setTimeout(() => {
                setRemainingSeconds(
                    (prevremainingSeconds) => prevremainingSeconds - 1
                );
            }, 1000);
        } else {
            endGame();
        }
    }, [remainingSeconds, start]);

    /**
     * Count words typed by the player. Called from the 'endGame' function.
     * @param {string} text - the string input from the textarea
     * @return {number} number of words
     */
    const countWords = (text: string): number =>
        text !== "" ? text.trim().split(" ").length : 0;

    /**
     * Invoked on click of the 'Start' button, resetting some states.
     */
    const startGame = (): void => {
        setRemainingSeconds(totalSeconds);
        setStart((prevStart) => !prevStart); // or simply pass true
        setTotalWords(0);
        setInputData("");
    };

    /**
     * Called when time remaining equals to 0 and the time is up (end of the game), resets some states.
     */
    const endGame = (): void => {
        setStart(false);
        setTotalWords(countWords(inputData));
    };

    /**
     * Retrieves changes from the textarea, receives and updates the state of the inputData with the text filled in by the player.
     * @param {ChangeEvent<HTMLTextAreaElement>} event - event on change in the textarea
     */
    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const { value }: { value: string } = event.target;

        setInputData(() => value);
    };

    return [
        textareaRef,
        start,
        inputData,
        handleOnChange,
        remainingSeconds,
        startGame,
        totalWords,
    ];
};

export default useGame;
