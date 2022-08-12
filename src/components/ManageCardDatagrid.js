import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import ViewListIcon from '@mui/icons-material/ViewList';
import ReactDOM from "react-dom/client";
import BasicModal from "./BasicModal";
import {useEffect, useState} from "react";
import axios from "axios";


export default function ManageCardDatagrid({font}) {
    const [data, setData] = useState({
        loading: true,
        rows: [],
        totalRows: 0,
        pageSize: 6,
        page: 0,
        apiData: [],
    });

    const columns = [
        { field: 'id', headerName: 'Index', width: 90,},
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
        },
        {
            field: 'middlename',
            headerName: 'Middle name',
            width: 150,
        },
        {
            field: 'lastname',
            headerName: 'Last name',
            width: 140,
        },
        {
            field: 'clientnumber',
            headerName: 'Client number',
            width: 160,
        },
        {
            field: 'reg_number',
            headerName: 'Registration number',
            width: 160,
        },
        {
            field: 'contracts',
            headerName: 'Contracts',
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    const api = params.api;
                    e.stopPropagation();
                    ReactDOM.createRoot(
                        document.getElementById('modal')
                    ).render(
                        <BasicModal data={data.apiData[params.id - data.pageSize*data.page - 1]} font={font}/>
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


    const updateData = (k, v) => setData((prev) => ({ ...prev, [k]: v }));

    useEffect( () => {
        updateData("loading", true);
        axios.get(`http://localhost:8080/clientList?page=${data.page}`)
            .then((res)=> {
                setData({
                    loading: false,
                    rows: res['data']['content'].map((e,i)=> ({'id': i + 1, 'firstName': e['first_NAM'], 'lastname': e['last_NAM'],
                        'middlename': e['father_S_NAM'], 'clientnumber': e['client_NUMBER'], 'reg_number': e['reg_NUMBER'] } )),
                    totalRows: res['data']['totalElements'],
                    pageSize: res['data']['pageable']['pageSize'],
                    page: 0,
                    apiData: res['data']['content'],
                })
            });
    }, []);

    const handlePageChange = async (e) => {
        if (e > data.page) {
            updateData("loading", true);

            await axios.get(`http://localhost:8080/clientList?page=${data.page+1}`)
                .then((res)=> {
                    setData((prev)=>({
                        loading: false,
                        rows: res['data']['content'].map((e,i)=> ({'id': ((prev.page+1)*prev.pageSize + 1 + i), 'firstName': e['first_NAM'], 'lastname': e['last_NAM'],
                            'middlename': e['father_S_NAM'], 'clientnumber': e['client_NUMBER'], 'reg_number': e['reg_NUMBER'] } )),
                        totalRows: res['data']['totalElements'],
                        pageSize: res['data']['pageable']['pageSize'],
                        page: prev.page + 1,
                        apiData: res['data']['content'],
                    }))
                });
        }
        else {
            updateData("loading", true);

            await axios.get(`http://localhost:8080/clientList?page=${data.page-1}`)
                .then((res)=> {
                    setData((prev)=>({
                        loading: false,
                        rows: res['data']['content'].map((e,i)=> ({'id': (prev.page - 1)*prev.pageSize + 1 + i, 'firstName': e['first_NAM'], 'lastname': e['last_NAM'],
                            'middlename': e['father_S_NAM'], 'clientnumber': e['client_NUMBER'], 'reg_number': e['reg_NUMBER'] } )),
                        totalRows: res['data']['totalElements'],
                        pageSize: res['data']['pageable']['pageSize'],
                        page: prev.page - 1,
                        apiData: res['data']['content'],
                    }))
                });
        }

    }

    return (
        <Box sx={{ width: '72%' , backgroundColor: "#ffffff", borderRadius: 4}}>
            <div id="modal" />
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
            />
        </Box>
    );
}
