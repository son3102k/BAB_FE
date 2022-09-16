import Modal from "@mui/material/Modal";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import QRCode from "react-qr-code";

export default function QRCodeModal({value}) {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.primary,
        borderRadius: 16,
        width: 500,
    }));

    useEffect(() => {

    })

    return (
        <div>
            <Modal open={open}>
                <Grid item xs={6} md={12} sx={{
                    display: "flex", justifyContent: "center", position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <Item>
                        <Box sx={{
                            height: 20,
                            textAlign: "right",
                            
                        }}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{
                            padding: 10,
                        }}>
                            <QRCode value={value.toString()} />
                        </Box>     
                    </Item>
                </Grid>
            </Modal>
        </div>
    );
}