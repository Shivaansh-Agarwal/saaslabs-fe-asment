import { useEffect, useState } from 'react';
import { ResponseListItem } from './types';
import Pagination from './components/pagination';
import Table from './components/table';
import styles from './styles.module.css';

function App() {
  const [list, setList] = useState<ResponseListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pageDataList = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchList();
  }, []);

  return (
    <>
      <div className={styles.tableContainer} style={{ height: 35 + 35 * itemsPerPage + 20 + 50 + 'px' }}>
        <Table
          theadList={['S.No.', 'Percentage Funded', 'Amount Pledged']}
          tbodyList={pageDataList.map((item) => [item['s.no'] + '', item['percentage.funded'] + '', item['amt.pledged'] + ''])}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
}

export default App;
