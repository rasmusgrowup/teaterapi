import styles from "../styles/common.module.scss";

export default function Layout({children}) {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  )
}
