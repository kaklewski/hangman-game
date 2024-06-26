import styles from './HangmanDrawing.module.css';

const HEAD = <div className={styles.head} />;
const BODY = <div className={styles.body} />;
const RIGHT_ARM = <div className={styles.rightArm} />;
const LEFT_ARM = <div className={styles.leftArm} />;
const RIGHT_LEG = <div className={styles.rightLeg} />;
const LEFT_LEG = <div className={styles.leftLeg} />;

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
	numberOfGuesses: number;
};

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
	return (
		<div className={styles.gallowsContainer}>
			{BODY_PARTS.slice(0, numberOfGuesses)}

			<div className={styles.gallows4} />
			<div className={styles.gallows3} />
			<div className={styles.gallows2} />
			<div className={styles.gallows1} />
		</div>
	);
}
