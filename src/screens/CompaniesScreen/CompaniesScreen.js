import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './CompaniesScreen.css';
import Table from '../../components/Table';
import TablePagination from '../../components/Table/TablePagination';

const columns = [
  {
    label: 'ID',
    prop: 'id',
    key: 'column-id',
  },
  {
    label: 'Name',
    prop: 'name',
    key: 'column-name',
  },
  {
    label: 'City',
    prop: 'city',
    key: 'column-city',
  },
  {
    label: 'Total income',
    prop: 'totalIncome',
    key: 'column-total-income',
    align: 'right',
  },
  {
    label: 'Average income',
    prop: 'averageIncome',
    key: 'column-average-income',
    align: 'right',
  },
  {
    label: 'Last month income',
    prop: 'lastMonthIncome',
    key: 'column-last-month-income',
    align: 'right',
  },
];

const CompaniesScreen = () => {
  const [companies, setCompanies] = useState([]);
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

  const visibleCompanies = companies.slice(page * pageSize, page * pageSize + pageSize);

  const handleChangePageSize = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <div className="CompaniesScreen">
      <Table
        data={visibleCompanies}
        columns={columns}
      />
      <TablePagination
        total={companies.length}
        page={page}
        pageSize={pageSize}
        onChangePage={setPage}
        onChangePageSize={handleChangePageSize}
      />
    </div>
  );
};

export default CompaniesScreen;
