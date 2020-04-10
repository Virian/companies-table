import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';

import './CompaniesScreen.scss';
import columns from './columns';
import filterableKeys from './filterableKeys';
import getSumAndLastDate from './getSumAndLastDate';
import getLastMonthIncome from './getLastMonthIncome';
import TextField from '../../components/TextField';
import Table from '../../components/Table';
import TablePagination from '../../components/Table/TablePagination';
import quickSortBy from '../../utils/quickSortBy';
import filterBy from '../../utils/filterBy';
import useDebounce from '../../hooks/useDebounce';
import getAllCompanies from '../../api/companies/getAll';
import getIncomeById from '../../api/incomes/getById';

const CompaniesScreen = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 400);

  const [orderBy, setOrderBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const getCompaniesData = async () => {
      setIsLoading(true);
      let { data } = await getAllCompanies();
      data = await Promise.all(data.map(async ({ id, ...rest }) => {
        const { data: { incomes } } = await getIncomeById(id);
        const { sum, lastDate } = getSumAndLastDate(incomes);
        const averageIncome = (sum / incomes.length) || 0;
        const lastMonthIncome = getLastMonthIncome(incomes, lastDate);

        return {
          ...rest,
          id,
          totalIncome: sum,
          averageIncome,
          lastMonthIncome,
        };
      }));
      setIsLoading(false);
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
        placeholder="Search..."
        value={search}
        onChange={handleChangeSearch}
      />
      <Table
        data={visibleCompanies}
        columns={columns}
        isLoading={isLoading}
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
