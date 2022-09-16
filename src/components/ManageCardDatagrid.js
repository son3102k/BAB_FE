import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import ViewListIcon from '@mui/icons-material/ViewList';
import ReactDOM from "react-dom/client";
import MainModal from "./MainModal";
import axios from "axios";
import Typography from "@mui/material/Typography";


export default function ManageCardDatagrid({font}) {
    const [firstData, setFirstData] = useState({
        loading: false,
        rows: [],
        totalRows: 0,
        pageSize: 6,
        page: 0,
        apiData: [],
    });
    const [data, setData] = useState({
        loading: true,
        rows: [],
        totalRows: 0,
        pageSize: 6,
        page: 0,
        apiData: [],
    });

    const columns = [
        {
            field: 'id',
            headerName: 'Index',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 165,
        },
        {
            field: 'middlename',
            headerName: 'Middle name',
            width: 170,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            field: 'lastname',
            headerName: 'Last name',
            width: 165,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            field: 'shortName',
            headerName: 'Short Name',
            width: 200,
        },
        {
            field: 'clientnumber',
            headerName: 'Client number',
            width: 170,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
        },
        {
            field: 'reg_number',
            headerName: 'Identity Number',
            width: 190,
        },
        {
            field: 'contracts',
            headerName: 'Contracts',
            width: 110,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const onClick = (e) => {
                    // const api = params.api;
                    e.stopPropagation();
                    ReactDOM.createRoot(document.getElementById('modal')).render(
                        <MainModal data={data.apiData[params.id - data.pageSize * data.page - 1]}
                                   index={params.id - data.pageSize * data.page - 1}
                                   font={font} updateRowAndAPIData={updateRowAndAPIData}/>
                    );
                };

                return (
                    <Button onClick={onClick}>
                        <ViewListIcon color="action"/>
                    </Button>
                );
            },
        }
    ];

    const updateData = (k, v) => setData((prev) => ({...prev, [k]: v}));

    const filterBy = (BY, value) => {
        let URL = "";
        if (BY === "reg_number") {
            URL = "http://localhost:8080/admin/getClientByRegNumber?regNum=";
        } else if (BY === "firstName") {
            URL = "http://localhost:8080/admin/getClientByFirstName?firstName="
        } else if (BY === "shortName") {
            URL = "http://localhost:8080/admin/getClientByShortName?shortName="
        } else {
            setData(firstData);
        }
        updateData("loading", true);
        axios.get(URL + value, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        }).then((res) => {
            setData((prev) => ({
                ...prev,
                pageSize: res.data.length,
                loading: false,
                rows: res['data'].map((e, i) => ({
                    'id': i + 1,
                    shortName: e['shortName'],
                    'firstName': e['firstNam'],
                    'lastname': e['lastNam'],
                    'middlename': e['fatherNam'],
                    'clientnumber': e['clientNumber'],
                    'reg_number': e['regNumber'],
                })),
                totalRows: res['data'].length,
                page: 0,
                apiData: res['data'],
            }));
        });
    }
    const handleFilterChange = (filter) => {
        if (filter.items.length === 0) return;
        const {value} = undefined || filter.items[0];
        if (value !== undefined && value !== "") {
            filterBy(filter.items[0].columnField, filter.items[0].value)
        } else {
            setData(firstData);
        }
    }

    const updateRowAndAPIData = (fetch_api_data, index) => {
        const new_rows = data.rows.map((e, i) => {
            if (i === index) {
                return ({
                    'id': e.id,
                    shortName: fetch_api_data['shortName'],
                    'firstName': fetch_api_data['firstNam'],
                    'lastname': fetch_api_data['lastNam'],
                    'middlename': fetch_api_data['fatherNam'],
                    'clientnumber': fetch_api_data['clientNumber'],
                    'reg_number': fetch_api_data['regNumber']
                })
            } else {
                return e;
            }
        });
        const new_APIData = data.apiData.map((e, i) => {
            if (index === i) {
                return fetch_api_data;
            } else {
                return e;
            }
        });
        updateData("apiData", new_APIData);
        updateData("rows", new_rows);
    }


    useEffect(() => {
        updateData("loading", true);
        axios.get(`http://localhost:8080/admin/clientList?page=${data.page}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then((res) => {
                setData({
                    loading: false,
                    rows: res['data']['content'].map((e, i) => ({
                        'id': i + 1,
                        shortName: e['shortName'],
                        'firstName': e['firstNam'],
                        'lastname': e['lastNam'],
                        'middlename': e['fatherNam'],
                        'clientnumber': e['clientNumber'],
                        'reg_number': e['regNumber']
                    })),
                    totalRows: res['data']['totalElements'],
                    pageSize: res['data']['pageable']['pageSize'],
                    page: 0,
                    apiData: res['data']['content'],
                });
                setFirstData({
                    loading: false,
                    rows: res['data']['content'].map((e, i) => ({
                        'id': i + 1,
                        shortName: e['shortName'],
                        'firstName': e['firstNam'],
                        'lastname': e['lastNam'],
                        'middlename': e['fatherNam'],
                        'clientnumber': e['clientNumber'],
                        'reg_number': e['regNumber']
                    })),
                    totalRows: res['data']['totalElements'],
                    pageSize: res['data']['pageable']['pageSize'],
                    page: 0,
                    apiData: res['data']['content'],
                });
            });
    }, []);

    const handlePageChange = async (e) => {
        if (e > data.page) {
            updateData("loading", true);

            await axios.get(`http://localhost:8080/admin/clientList?page=${data.page + 1}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
                .then((res) => {
                    setData((prev) => ({
                        loading: false,
                        rows: res['data']['content'].map((e, i) => ({
                            'id': ((prev.page + 1) * prev.pageSize + 1 + i),
                            shortName: e['shortName'],
                            'firstName': e['firstNam'],
                            'lastname': e['lastNam'],
                            'middlename': e['fatherNam'],
                            'clientnumber': e['clientNumber'],
                            'reg_number': e['regNumber']
                        })),
                        totalRows: res['data']['totalElements'],
                        pageSize: res['data']['pageable']['pageSize'],
                        page: prev.page + 1,
                        apiData: res['data']['content'],
                    }))
                });
        } else {
            updateData("loading", true);

            await axios.get(`http://localhost:8080/admin/clientList?page=${data.page - 1}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
                .then((res) => {
                    setData((prev) => ({
                        loading: false,
                        rows: res['data']['content'].map((e, i) => ({
                            'id': (prev.page - 1) * prev.pageSize + 1 + i,
                            shortName: e['shortName'],
                            'firstName': e['firstNam'],
                            'lastname': e['lastNam'],
                            'middlename': e['fatherNam'],
                            'clientnumber': e['clientNumber'],
                            'reg_number': e['regNumber']
                        })),
                        totalRows: res['data']['totalElements'],
                        pageSize: res['data']['pageable']['pageSize'],
                        page: prev.page - 1,
                        apiData: res['data']['content'],
                    }))
                });
        }

    }

    return (
        <Box sx={{width: '95%', backgroundColor: "#ffffff", borderRadius: 4}}>
            <Typography component="h1" fontWeight="800" fontFamily={font.typography.fontFamily} fontSize={42}
                        color="#1a8cff" sx={{p: 3}}>
                Client
            </Typography>
            <div id="modal"/>
            <DataGrid sx={{
                border: "none",
                p: 3,
                '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 700,
                    fontFamily: font.typography.fontFamily,
                }
            }}
                      headerHeight={60}
                      rows={data.rows}
                      columns={columns}
                      disableSelectionOnClick
                      autoHeight
                      pagination
                      loading={data.loading}
                      rowCount={data.totalRows}
                      page={data.page}
                      pageSize={data.pageSize}
                      onPageChange={handlePageChange}
                      paginationMode="server"
                      disableColumnSelector
                      filterMode="server"
                      onFilterModelChange={handleFilterChange}
            />
        </Box>
    );
}
