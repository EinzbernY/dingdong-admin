/*
 * @Author: 崔国强
 * @Date: 2019-12-04 11:05:36
 * @LastEditTime: 2019-12-04 11:27:30
 * @LastEditors: Please set LastEditors
 * @Description: 热门搜索 图标
 * @FilePath: \umi-admin\src\pages\Datas\DataIndex\Hots\Hots.js
 */
import React, { Component } from 'react'
import styles from './Hots.css'
import {
    Chart,
    Geom,
    Axis,
    Tooltip
  } from "bizcharts";

export default class Hots extends Component {
    render() {
        const data = [
            {
              year: "1月",
              value: 3
            },
            {
              year: "2月",
              value: 4
            },
            {
              year: "3月",
              value: 3.5
            },
            {
              year: "4月",
              value: 5
            },
            {
              year: "5月",
              value: 4.9
            },
            {
              year: "6月",
              value: 6
            },
            {
              year: "7月",
              value: 7
            },
            {
              year: "8月",
              value: 9
            },
            {
              year: "9月",
              value: 13
            }
          ];
          const cols = {
            value: {
              min: 0
            },
            year: {
              range: [0, 1]
            }
          };
        return (
            <div className={styles.Hots}>
                <div className={styles.HotsName}>搜索用户数:&nbsp;&nbsp;&nbsp;&nbsp;(万) </div>
                <div>
                <Chart height={400} data={data} scale={cols} forceFit>
                    <Axis name="year" />
                    <Axis name="value" />
                    <Tooltip
                        crosshairs={{
                        type: "y"
                        }}
                    />
                    <Geom type="line" position="year*value" size={2} />
                    <Geom
                        type="point"
                        position="year*value"
                        size={4}
                        shape={"circle"}
                        style={{
                        stroke: "#fff",
                        lineWidth: 1
                        }}
                    />
                </Chart>
                </div>
            </div>
        )
    }
}
