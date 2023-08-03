import React, { useState, useEffect } from 'react';
import StatusTab from '../../components/tab';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ApexChart from '../../components/charts/chart';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Job from '../../components/job';
import './style.scss';
import { fetchData } from '../../api';
import { fetchCountPerDay } from '../../api';

export default function Footer() {
  const [time, setTime] = useState(1);
  const [sort, setSort] = useState('recent');
  const [countReceived, setCountReceived] = useState([]);
  const [countApplied, setCountApplied] = useState([]);
  const handleChange = (event) => {
    setSort(event.target.value);
    handleSorting(event.target.value)
  };
  useEffect(() => {
    const fetchCountData = async () => {
      try {
        const ActiveJobData = await fetchCountPerDay();
        console.log(ActiveJobData);
        if (time === 0) {
          setCountReceived(ActiveJobData.Received.slice(0, 7));
          setCountApplied(ActiveJobData.Applied.slice(0, 7));
        } else {
          setCountReceived(ActiveJobData.Received);
          setCountApplied(ActiveJobData.Applied);
        }
      } catch (error) {
        console.error("Error updating count data: ", error);
      }
    };
    fetchCountData();
  }, [time]);
  const ApexChartWrapper = ({ countReceived, countApplied }) => {
    return <ApexChart countReceived={countReceived} countApplied={countApplied} />;
  };
  useEffect(() => {
    fetchData()
      .then((apiData) => {
        setData(apiData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const [data, setData] = useState([]);

  const [sortCriteria, setSortCriteria] = useState('');
  const sortData = (array, criteria) => {
    const sortedArray = [...array];
    switch (criteria) {
      case 'name':
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
        sortedArray.sort((a, b) => new Date(b.dateFormat) - new Date(a.dateFormat));
        break;
      default:
        break;
    }
    return sortedArray;
  };
  const handleSorting = (criteria) => {
    setSortCriteria(criteria);

    const sortedData = sortData(data, criteria);
    setData(sortedData);
  };
  return (
    <div className="home-page">
      <div className="page-header">
        <div className="container">
          <h1>Hello, Paramedic Medical Supplies</h1>
          <Button variant="contained" onClick={() => alert('Want to post a job?')}>
            Post a Job
          </Button>
          <div className="tabs">
            <StatusTab name="Active Jobs" count={180} />
            <StatusTab name="New Application" count={180} />
            <StatusTab name="Candidate To Be Reviewed" count={22} />
            <StatusTab name="Shortlisted" count={178} />
          </div>
        </div>
      </div>
      <div className="main-page">
        <div className="container">
          <h2>Applications Received</h2>
          <ButtonGroup variant="contained">
            <Button
              style={time === 0 ? { color: '#6390DF', fontWeight: '700', backgroundColor: '#F5F8FE' } : {}}
              onClick={() => {
                setTime(0);
              }}
            >
              Weekly
            </Button>
            <Button
              style={time === 1 ? { color: '#6390DF', fontWeight: '700', backgroundColor: '#F5F8FE' } : {}}
              onClick={() => {
                setTime(1);
              }}
            >
              Monthly
            </Button>
          </ButtonGroup>
        </div>
        <div className="container chart">
          <div className="chart-container">
            <ApexChartWrapper countReceived={countReceived} countApplied={countApplied} />
          </div>
        </div>
        <div className="container">
          <h2>Active Jobs </h2>
          <div className="select">
            <p>Sort By: </p>
            <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }} value={sort} onChange={handleChange}>
              <MenuItem value={'recent'}>Recent</MenuItem>
              <MenuItem value={'name'}>Name</MenuItem>
            </Select>
          </div>
        </div>
        <div className="container">
          <div className="jobs">
            {data.map((item, index) => (
              <Job key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
