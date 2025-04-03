import styles from "./TypingIndicator.module.css"

type TypingIndicatorProps = {
    userTyping: string[];
}

function TypingIndicator({userTyping}: TypingIndicatorProps) {
    const typingFormatted = () => {
        if (userTyping.length === 0) return "";

        if (userTyping.length === 1) return `${userTyping[0]} is typing`;
        if (userTyping.length === 2) return `${userTyping[0]} and ${userTyping[1]} are typing`;
        if (userTyping.length > 2) {
            const firstTwo = userTyping.slice(0, 2).join(", ");
            return `${firstTwo} and ${userTyping.length - 2} others are `;
        }
    }

    return (
        <div className={styles.typingContainer}>
            <div className="flex items-end space-x-0.5 mt-1">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce`}
                        style={{
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: "1s",
                        }}
                    />
                ))}
            </div>
            <span>{typingFormatted()}</span>
            {/*<div className={styles.dotsContainer}>*/}
            {/*    <span className={styles.dot}>.</span>*/}
            {/*    <span className={styles.dot}>.</span>*/}
            {/*    <span className={styles.dot}>.</span>*/}
            {/*</div>*/}
        </div>
    );
}

export default TypingIndicator;