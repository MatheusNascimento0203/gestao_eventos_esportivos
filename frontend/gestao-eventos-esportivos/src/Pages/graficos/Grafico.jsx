import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export default () => {
    const [state, setState] = React.useState({
        series: [
            {
                name: "Eventos",
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Agos", "Set", "Out", "Nov", "Dez"],
            },
            yaxis: {
                title: {
                    text: "Qtd Eventos",
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands";
                    },
                },
            },
        },
    });

    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
        </div>
    );
};
