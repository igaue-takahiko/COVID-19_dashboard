import React from 'react'
import { Typography } from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

import { selectData } from '../covidSlice'

const PieChart: React.FC = () => {
    const data = useSelector(selectData)
    const mortality = data.confirmed && (100 * data.deaths.value) / data.confirmed.value

    const pieChart = data && (
        <Doughnut
        data={{
            labels: ["Infected", "Recovered", "Deaths"],
            datasets: [
                {
                    date: [
                        data.confirmed.value,
                        data.recovered.value,
                        data.deaths.value,
                    ],
                    backgroundColor: [
                        "rgba(0, 0, 255, 0.5)",
                        "#0080808",
                        "rgba(225, 0, 0, 0.5)",
                    ],
                    hoverBackgroundColor: ["#36A2EB", "#3cb371", "#FF6384"],
                    borderColor: ["transparent", "transparent", "transparent"],
                }
            ]
        }}
        options={{
            legend: {
                position: "bottom",
                labels: { boxWidth: 15 }
            }
        }}
        />
    )

    return (
        <div>
            {data.confirmed && (
                <Typography align="center" color="textSecondary" gutterBottom>
                    Mortality { data.confirmed && mortality.toFixed(2) } [%]
                </Typography>
            )}
            { pieChart }
        </div>
    )
}

export default PieChart