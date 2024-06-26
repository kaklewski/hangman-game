import { useCallback, useEffect, useState } from 'react';
import words from './wordList.json';
import { HangmanDrawing } from './HangmanDrawing';
import { HangmanWord } from './HangmanWord';
import { Keyboard } from './Keyboard';
import styles from './App.module.css';

function getWord() {
	return words[Math.floor(Math.random() * words.length)];
}

function App() {
	const [wordToGuess, setWordToGuess] = useState(getWord);
	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

	const incorrectLetters = guessedLetters.filter(
		(letter) => !wordToGuess.includes(letter)
	);

	// Check if the number of incorrect letters is equal or greater than the number of the body parts
	const isLoser = incorrectLetters.length >= 6;

	// If every single letter is included in guessedLetters, it means that the player won
	const isWinner = wordToGuess
		.split('')
		.every((letter) => guessedLetters.includes(letter));

	const addGuessedLetter = useCallback(
		(letter: string) => {
			if (guessedLetters.includes(letter) || isLoser || isWinner) return;

			setGuessedLetters((currentLetters) => [...currentLetters, letter]);
		},
		[guessedLetters, isWinner, isLoser]
	);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;

			if (!key.match(/^[a-z]$/)) return;

			e.preventDefault();
			addGuessedLetter(key);
		};

		document.addEventListener('keypress', handler);

		return () => {
			document.removeEventListener('keypress', handler);
		};
	}, [guessedLetters]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;

			if (key !== 'Enter') return;

			e.preventDefault();
			setGuessedLetters([]);
			setWordToGuess(getWord());
		};

		document.addEventListener('keypress', handler);

		return () => {
			document.removeEventListener('keypress', handler);
		};
	}, []);

	return (
		<div className={styles.appContainer}>
			<div className={styles.messageContainer}>
				{isWinner && 'Winner! Refresh to try again.'}
				{isLoser && 'Nice try. Refresh to try again.'}
			</div>
			<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
			<HangmanWord
				reveal={isLoser}
				guessedLetters={guessedLetters}
				wordToGuess={wordToGuess}
			/>
			<div className={styles.keyboardContainer}>
				<Keyboard
					disabled={isWinner || isLoser}
					activeLetters={guessedLetters.filter((letter) =>
						wordToGuess.includes(letter)
					)}
					inactiveLetters={incorrectLetters}
					addGuessedLetter={addGuessedLetter}
				/>
			</div>
		</div>
	);
}

export default App;
