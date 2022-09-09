import Chart from 'react-apexcharts'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";

const Item = styled(Paper)(({ theme, width, height }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    width: width,
    borderRadius: '10px',
    height: height,
    flexWrap: 'wrap',

}));

const ItemChart = styled(Paper)(({ theme, width }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',


    alignItems: 'center',
    color: theme.palette.text.secondary,
    width: width,
    borderRadius: '10px',


}));

export default function Charts() {
    const colorPalette = ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0'];
    // const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
    const [listAmount, setListAmount] = useState([]);
    const [clients, setClients] = useState();
    const [branches, setBranches] = useState();
    const [highestBalance, setHighestBalance] = useState();
    const currencyName = [];
    const currencyQuantity = [];

    const [pieChart, setPieChart] = useState({
        chart: {
            height: 391,
            type: 'pie',
            zoom: {
                enabled: false
            },
        },
        stroke: {
            curve: 'straight'
        },
        series: [],
        labels: [],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        fill: {
            opacity: 1,
        },
        title: {
            text: 'Currency',
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
    });

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'RUB',
    });

    useEffect(() => {
        //get listAmount
        axios.get('http://localhost:8080/admin/getAmountChart', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then((res) => {
            setListAmount(res.data);
        });

        //getNumberOfClients
        axios.get('http://localhost:8080/admin/getNumberOfClients', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then((res) => {
            setClients(res.data);
        });

        //getNumberOfBranches
        axios.get('http://localhost:8080/admin/getNumberOfBranches', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then((res) => {
            setBranches(res.data);
        });

        //getHighestAmount
        axios.get('http://localhost:8080/admin/getHighestAmount', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then((res) => {
            setHighestBalance(res.data);
        });

        //getCurrencyList
        axios.get('http://localhost:8080/admin/getCurrencyList', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then((res) => {

            for (let i = 0; i<res.data.length; i++){
                currencyName[i] = res.data[i][0];
                currencyQuantity[i] = res.data[i][1];
            }
            setPieChart((prev)=>({
                ...prev,
                series: currencyQuantity,
                labels: currencyName,
            }));
        });
    }, []);
    //     chart: {
    //         id: 'sparkline2',
    //         group: 'sparklines',
    //         type: 'area',
    //         height: 100,
    //         sparkline: {
    //             enabled: true
    //         },
    //     },
    //     stroke: {
    //         curve: 'straight'
    //     },
    //     fill: {
    //         opacity: 1,
    //     },
    //     series: [{
    //         name: 'Expenses',
    //         data: randomizeArray(sparklineData)
    //     }],
    //     labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
    //     yaxis: {
    //         min: 0
    //     },
    //     xaxis: {
    //         type: 'datetime',
    //     },
    //     colors: ['#DCE6EC'],
    //     title: {
    //         text: '',
    //         offsetX: 20,
    //         style: {
    //             fontSize: '12px',
    //             cssClass: 'apexcharts-yaxis-title'
    //         }
    //     },
    //     subtitle: {
    //         text: 'Expenses',
    //         offsetX: 30,
    //         style: {
    //             fontSize: '14px',
    //             cssClass: 'apexcharts-yaxis-title'
    //         }
    //     }
    // };

    // const spark3 = {
    //     chart: {
    //         id: 'sparkline3',
    //         group: 'sparklines',
    //         type: 'area',
    //         height: 160,
    //         sparkline: {
    //             enabled: true
    //         },
    //     },
    //     stroke: {
    //         curve: 'straight'
    //     },
    //     fill: {
    //         opacity: 1,
    //     },
    //     series: [{
    //         name: 'Profits',
    //         data: randomizeArray(sparklineData)
    //     }],
    //     labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
    //     xaxis: {
    //         type: 'datetime',
    //     },
    //     yaxis: {
    //         min: 0
    //     },
    //     colors: ['#008FFB'],
    //     //colors: ['#5564BE'],
    //     title: {
    //         text: '$135,965',
    //         offsetX: 30,
    //         style: {
    //             fontSize: '24px',
    //             cssClass: 'apexcharts-yaxis-title'
    //         }
    //     },
    //     subtitle: {
    //         text: 'Profits',
    //         offsetX: 30,
    //         style: {
    //             fontSize: '14px',
    //             cssClass: 'apexcharts-yaxis-title'
    //         }
    //     }
    // };

    const optionsBar = {
        chart: {
            type: 'bar',
            height: 380,
            width: '100%',
            stacked: true,
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
            }
        },
        colors: colorPalette,
        series: [{
            name: "Amount",
            data: listAmount,
        }],
        labels: ['Under 10k',
            'Under 100k',
            'Under 1 Million',
            'Under 10 Million',
            'Under 100 Million',
            'Over 100 Million'],
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
            text: 'Amount Range',
            align: 'left',
            style: {
                fontSize: '18px'
            }
        }

    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={5}>
                    <Grid item xs={6} md={4}>
                        <Item width={400} height={150}>
                            <Typography fontSize="40px" color="#000" width='100%'>{clients}</Typography>
                            <Typography fontSize="20px" color="#78909c">Clients</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Item width={400} height={150}>
                            <Typography fontSize="30px" color="#000" width='100%'>{branches}</Typography>
                            <Typography fontSize="20px" color="#78909c">Branches</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Item width={400} height={150}>
                            <Typography fontSize="30px" color="#000" width='100%'>{formatter.format(highestBalance)}</Typography>
                            <Typography fontSize="20px" color="#78909c">Highest Balance</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <ItemChart>
                            <Chart options={optionsBar} type={optionsBar.chart.type} series={optionsBar.series}
                                height={optionsBar.chart.height} />
                        </ItemChart>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <ItemChart width={630}>
                            <Chart options={pieChart} type={pieChart.chart.type} series={pieChart.series}
                                height={pieChart.chart.height} />
                        </ItemChart>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}