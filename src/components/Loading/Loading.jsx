import { Loader2 } from "lucide-react";
import React from "react";
import styles from "./loading.module.css";

function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <Loader2 className={styles.spinningLoader} />
    </div>
  );
}

export default Loading;
