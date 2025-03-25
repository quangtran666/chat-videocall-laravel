import styles from "./LoaderFilling.module.css"

function LoaderFillingSmall() {
    return (
        <div className={`flex justify-center items-center`}>
            <div className={styles.loader} />
        </div>
    );
}

export default LoaderFillingSmall;