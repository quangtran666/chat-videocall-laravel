import styles from "./LoaderShape.module.css"

type LoaderShapeProps = {
    className?: string;
}

function LoaderShape({ className }: LoaderShapeProps) {
    return (
        <div className={`flex justify-center p-4 ${className}`}>
            <div className={styles.loader} />
        </div>
    );
}

export default LoaderShape;