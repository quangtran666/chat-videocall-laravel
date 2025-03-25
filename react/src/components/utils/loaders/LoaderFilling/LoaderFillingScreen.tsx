import styles from "./LoaderFilling.module.css"

function LoaderFillingScreen() {
    return (
        <div className={`flex justify-center items-center h-screen`}>
            <div className={styles.loader} />
        </div>
    );
}

export default LoaderFillingScreen;