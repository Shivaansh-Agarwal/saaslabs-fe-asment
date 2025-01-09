import styles from './styles.module.css';

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
export const Pagination = ({ currentPage, totalPages, setCurrentPage }: Props) => {
  const onClickPrevious = () => {
    setCurrentPage((currPage) => {
      if (currPage > 1) {
        return currPage - 1;
      }
      return currPage;
    });
  };
  const onClickNext = () => {
    setCurrentPage((currPage) => {
      if (currPage < totalPages) {
        return currPage + 1;
      }
      return currPage;
    });
  };
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage === 1 || currentPage === 2) {
        pageNumbers.push(1);
        pageNumbers.push(2);
        pageNumbers.push(null);
        pageNumbers.push(totalPages);
      } else if (currentPage > 2 && currentPage < totalPages - 1) {
        pageNumbers.push(1);
        pageNumbers.push(null);
        pageNumbers.push(currentPage);
        pageNumbers.push(null);
        pageNumbers.push(totalPages);
      } else {
        pageNumbers.push(1);
        pageNumbers.push(null);
        pageNumbers.push(totalPages - 1);
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };
  const pageNumbers = getPageNumbers();
  return (
    <div className={styles.paginationContainer}>
      <button onClick={onClickPrevious} disabled={currentPage === 1} className={`${styles.btnDefault} ${styles.cell}`}>
        Previous
      </button>
      <div className={styles.pageNumbers}>
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === null) {
            return (
              <span key={index} className={`${styles.cell}`}>
                ...
              </span>
            );
          }
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(pageNumber)}
              className={`${styles.btnDefault} ${styles.cell} ${currentPage === pageNumber ? styles.btnActive : ''}`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button onClick={onClickNext} disabled={currentPage === totalPages} className={`${styles.btnDefault} ${styles.cell}`}>
        Next
      </button>
    </div>
  );
};
