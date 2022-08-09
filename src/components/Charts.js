import Chart from 'react-apexcharts'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme , width}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: width,
}));
export default function Charts() {
    const colorPalette = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0'];
    const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
    const randomizeArray = function (arg) {
        const array = arg.slice();
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        };

        return array;
    }

    const spark1 = {
        chart: {
            id: 'sparkline1',
            group: 'sparklines',
            type: 'area',
            height: 160,
            sparkline: {
                enabled: true
            },
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 1,
        },
        series: [{
            name: 'Sales',
            data: randomizeArray(sparklineData)
        }],
        labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
        yaxis: {
            min: 0
        },
        xaxis: {
            type: 'datetime',
        },
        colors: ['#DCE6EC'],
        title: {
            text: '$424,652',
            offsetX: 30,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Sales',
            offsetX: 30,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-title'
            }
        }
    };

    const spark2 = {
        chart: {
            id: 'sparkline2',
            group: 'sparklines',
            type: 'area',
            height: 160,
            sparkline: {
                enabled: true
            },
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 1,
        },
        series: [{
            name: 'Expenses',
            data: randomizeArray(sparklineData)
        }],
        labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
        yaxis: {
            min: 0
        },
        xaxis: {
            type: 'datetime',
        },
        colors: ['#DCE6EC'],
        title: {
            text: '$235,312',
            offsetX: 30,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Expenses',
            offsetX: 30,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-title'
            }
        }
    };

    const spark3 = {
        chart: {
            id: 'sparkline3',
            group: 'sparklines',
            type: 'area',
            height: 160,
            sparkline: {
                enabled: true
            },
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 1,
        },
        series: [{
            name: 'Profits',
            data: randomizeArray(sparklineData)
        }],
        labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            min: 0
        },
        colors: ['#008FFB'],
        //colors: ['#5564BE'],
        title: {
            text: '$135,965',
            offsetX: 30,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-title'
            }
        },
        subtitle: {
            text: 'Profits',
            offsetX: 30,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-title'
            }
        }
    };

    const optionsBar = {
        chart: {
            type: 'bar',
            height: 380,
            width: '100%',
            stacked: true,
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
            }
        },
        colors: colorPalette,
        series: [{
            name: "Clothing",
            data: [42, 52, 16, 55, 59, 51, 45, 32, 26, 33, 44, 51, 42, 56],
        }, {
            name: "Food Products",
            data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4],
        }],
        labels: [10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: '#78909c'
                }
            }
        },
        title: {
            text: 'Monthly Sales',
            align: 'left',
            style: {
                fontSize: '18px'
            }
        }

    };

    const optionsArea = {
        chart: {
            height: 340,
            type: 'area',
            zoom: {
                enabled: false
            },
        },
        stroke: {
            curve: 'straight'
        },
        colors: colorPalette,
        series: [
            {
                name: "Blog",
                data: [{
                    x: 0,
                    y: 0
                }, {
                    x: 4,
                    y: 5
                }, {
                    x: 5,
                    y: 3
                }, {
                    x: 9,
                    y: 8
                }, {
                    x: 14,
                    y: 4
                }, {
                    x: 18,
                    y: 5
                }, {
                    x: 25,
                    y: 0
                }]
            },
            {
                name: "Social Media",
                data: [{
                    x: 0,
                    y: 0
                }, {
                    x: 4,
                    y: 6
                }, {
                    x: 5,
                    y: 4
                }, {
                    x: 14,
                    y: 8
                }, {
                    x: 18,
                    y: 5.5
                }, {
                    x: 21,
                    y: 6
                }, {
                    x: 25,
                    y: 0
                }]
            },
            {
                name: "External",
                data: [{
                    x: 0,
                    y: 0
                }, {
                    x: 2,
                    y: 5
                }, {
                    x: 5,
                    y: 4
                }, {
                    x: 10,
                    y: 11
                }, {
                    x: 14,
                    y: 4
                }, {
                    x: 18,
                    y: 8
                }, {
                    x: 25,
                    y: 0
                }]
            }
        ],
        fill: {
            opacity: 1,
        },
        title: {
            text: 'Daily Visits Insights',
            align: 'left',
            style: {
                fontSize: '18px'
            }
        },
        markers: {
            size: 0,
            style: 'hollow',
            hover: {
                opacity: 5,
            }
        },
        tooltip: {
            intersect: true,
            shared: false,
        },
        xaxis: {
            tooltip: {
                enabled: false
            },
            labels: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            tickAmount: 4,
            max: 12,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: '#78909c'
                }
            }
        },
        legend: {
            show: false
        }
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={5}>
                    <Grid item xs={6} md={4}>
                        <Item width={400}>
                            <Chart options={spark1} type="area" series={spark1.series} height={spark1.chart.height}/>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Item width={400}>
                            <Chart options={spark2} type="area" series={spark2.series} height={spark2.chart.height}/>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Item width={400}>
                            <Chart options={spark3} type="area" series={spark3.series} height={spark3.chart.height}/>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Item>
                            <Chart options={optionsBar} type={optionsBar.chart.type} series={optionsBar.series} height={optionsBar.chart.height}/>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Item width={645}>
                            <Chart options={optionsArea} type={optionsArea.chart.type} series={optionsArea.series} height={optionsArea.chart.height}/>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
