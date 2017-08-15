import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class extends React.Component {
  render() {
    return <ResponsiveContainer>
      <AreaChart data={data} style={{position: 'absolute', left: -40}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Area type='monotone' dataKey='waiter.com' stackId="1" stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' dataKey='OPD' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
        <Area type='monotone' dataKey='W&P' stackId="1" stroke='#ffc658' fill='#ffc658' />
        <Area type='monotone' dataKey='SJSU' stackId="1" stroke='#03AACA' fill='#03AACA' />
        <Area type='monotone' dataKey='OPD Academy' stackId="1" stroke='#0855AF' fill='#0855AF' />
        <Area type='monotone' dataKey='Codify' stackId="1" stroke='#FF6600' fill='#FF6600' />
        <Area type='monotone' dataKey='BU' stackId="1" stroke='#C40401' fill='#C40401' />
        <Area type='monotone' dataKey='Courses' stackId="1" stroke='#787878' fill='#787878' />
      </AreaChart>
    </ResponsiveContainer>;
  }
}

const data = [
      {name: '2008', 'waiter.com': 1, 'OPD': 0, 'W&P': 0, 'SJSU': 1, 'OPD Academy': 0, 'Codify': 0, 'BU': 0, 'Courses': 0},
      {name: '2009', 'waiter.com': 1, 'OPD': 0, 'W&P': 0, 'SJSU': 1, 'OPD Academy': 0, 'Codify': 0, 'BU': 0, 'Courses': 0},
      {name: '2010', 'waiter.com': 1, 'OPD': 0, 'W&P': 0, 'SJSU': 1, 'OPD Academy': 0, 'Codify': 0, 'BU': 0, 'Courses': 0},
      {name: '2012', 'waiter.com': 1, 'OPD': 1, 'W&P': 0, 'SJSU': 1, 'OPD Academy': 1, 'Codify': 0, 'BU': 0, 'Courses': 0},
      {name: '2013', 'waiter.com': 0, 'OPD': 1, 'W&P': 0, 'SJSU': 0, 'OPD Academy': 0, 'Codify': 0, 'BU': 0, 'Courses': 0},
      {name: '2014', 'waiter.com': 0, 'OPD': 1, 'W&P': 0, 'SJSU': 0, 'OPD Academy': 0, 'Codify': 0, 'BU': 0, 'Courses': 0},
      {name: '2015', 'waiter.com': 0, 'OPD': 1, 'W&P': 0, 'SJSU': 0, 'OPD Academy': 0, 'Codify': 0, 'BU': 0, 'Courses': 5},
      {name: '2016', 'waiter.com': 0, 'OPD': 1, 'W&P': 0, 'SJSU': 0, 'OPD Academy': 0, 'Codify': 1, 'BU': 0, 'Courses': 9},
      {name: '2017', 'waiter.com': 0, 'OPD': 1, 'W&P': 1, 'SJSU': 0, 'OPD Academy': 0, 'Codify': 0, 'BU': 0, 'Courses': 7},
      {name: '2018', 'waiter.com': 0, 'OPD': 1, 'W&P': 1, 'SJSU': 0, 'OPD Academy': 0, 'Codify': 0, 'BU': 1, 'Courses': 0}
];