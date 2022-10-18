import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../style/card.css'
import TextField from '@mui/material/TextField';


const theme = createTheme({
    palette: {
        primary: {
            main: '#fff'
        },
        secondary: {
            main: '#ff8888'
        }
    },
});

interface CardProps {
    index: number;
    children: string;
    handleDelete: (index: number) => void;
    handleEditClick: (value: string, index: number) => void;
};

const Card = (props: CardProps) => {
    const [value, setValue] = useState<string>(props.children);
    const [showEdit, setShowEdit] = useState<boolean>(true);

    const handleEditCLick = () => {
        setShowEdit(!showEdit);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
        console.log(value);
    }

    return(
    <ThemeProvider theme={theme}>
        <div className='card'>
            <div>{props.index === -1 ? "New" : props.index}</div>
            <TextField 
                inputProps={{style: { textAlign: 'center', color: 'white', maxWidth: '100px' }}} 
                variant="standard" 
                value={value}
                focused={showEdit}
                InputProps={{
                    readOnly: showEdit,
                }}
                onChange={e => handleChange(e)}
            />
            <div className='btn-group'>
                {showEdit ? 
                    <IconButton aria-label="edit" color="primary" onClick={() => handleEditCLick()}>
                        <EditIcon />
                    </IconButton> 
                    : 
                    <IconButton aria-label="edit" color="primary" onClick={() => {
                            console.log(value);
                            
                            props.handleEditClick(value, props.index)
                            handleEditCLick();
                        }}>
                        <CheckIcon/>
                    </IconButton> 
                }
                <IconButton 
                    aria-label="delete" 
                    color="secondary" 
                    onClick={() => props.handleDelete(props.index)}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    </ThemeProvider>)
}

export default Card;