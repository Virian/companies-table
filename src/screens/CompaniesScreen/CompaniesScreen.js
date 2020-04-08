import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';
import axios from 'axios';

import './CompaniesScreen.css';
import columns from './columns';
import filterableKeys from './filterableKeys';
import TextField from '../../components/TextField';
import Table from '../../components/Table';
import TablePagination from '../../components/Table/TablePagination';
import quickSortBy from '../../utils/quickSortBy';
import filterBy from '../../utils/filterBy';
import useDebounce from '../../hooks/useDebounce';

const CompaniesScreen = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [orderBy, setOrderBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const getCompaniesData = async () => {
      let { data } = await axios.get('https://recruitment.hal.skygate.io/companies');
      data = await Promise.all(data.map(async ({ id, ...rest }) => {
        const { data: { incomes } } = await axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`);

        const { sum, lastDate } = incomes.reduce((accumulator, { value, date }) => {
          const incomeDate = new Date(date);
          return {
            sum: accumulator.sum + parseFloat(value),
            lastDate: incomeDate > accumulator.lastDate ? incomeDate : accumulator.lastDate,
          };
        }, { sum: 0, lastDate: null });

        const averageIncome = (sum / incomes.length) || 0;

        const lastMonthIncome = incomes.reduce((accumulator, { value, date }) => {
          const incomeDate = new Date(date);
          const isFromLastMonth = incomeDate.getMonth() === lastDate.getMonth()
            && incomeDate.getFullYear() === lastDate.getFullYear();
          return isFromLastMonth ? accumulator + parseFloat(value) : accumulator;
        }, 0);

        return {
          ...rest,
          id,
          totalIncome: sum,
          averageIncome,
          lastMonthIncome,
        };
      }));
      setCompanies(data);
    };

    getCompaniesData();
  }, []);

  const filteredCompanies = useMemo(() => {
    if (debouncedSearch) {
      return filterBy(companies, debouncedSearch, filterableKeys);
    }
    return companies;
  }, [companies, debouncedSearch]);

  const sortedCompanies = useMemo(() => {
    if (orderBy && orderDirection) {
      return quickSortBy(filteredCompanies, orderBy, orderDirection);
    }
    return filteredCompanies;
  }, [filteredCompanies, orderBy, orderDirection]);

  const visibleCompanies = sortedCompanies.slice(page * pageSize, page * pageSize + pageSize);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePageSize = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeOrder = (prop) => {
    setOrderDirection(orderBy === prop && orderDirection === 'asc' ? 'desc' : 'asc');
    setOrderBy(prop);
  };

  return (
    <div className="CompaniesScreen">
      <TextField
        className="CompaniesScreenSearch"
        placeholder="Szukaj..."
        value={search}
        onChange={handleChangeSearch}
      />
      <Table
        data={visibleCompanies}
        columns={columns}
        orderBy={orderBy}
        orderDirection={orderDirection}
        onChangeOrder={handleChangeOrder}
      />
      <TablePagination
        total={sortedCompanies.length}
        page={page}
        pageSize={pageSize}
        onChangePage={setPage}
        onChangePageSize={handleChangePageSize}
      />
    </div>
  );
};

export default CompaniesScreen;
