import styles from './styles.module.css';

type Props = {
  theadList: string[];
  tbodyList: string[][];
};
export const Table = ({ theadList, tbodyList }: Props) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.theadRow}>
          {theadList.map((item) => {
            return <th className={styles.rowItem}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyList.map((rowList) => {
          return (
            <tr className={styles.tbodyRow}>
              {rowList.map((rowItem) => {
                return <td className={styles.rowItem}>{rowItem}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
