import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card';
import { DoublyLinkedList } from './utils/listClass';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

function App() {
    const [list, setList] = useState<DoublyLinkedList>(new DoublyLinkedList());
    const [arrList, setArrList] = useState(list.getArrayList());
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        console.log(arrList);
    }, [arrList]);

    const handleAddItem = () => {
        setClicked(!clicked);
    }

    const handleNewItem = (value: string, __index: number) => {
        setClicked(!clicked);
        console.log(list.getArrayList());
        
        list.push(value);
        console.log(value, list.getArrayList());
        
        setList(Object.assign(Object.create(Object.getPrototypeOf(list)), list));
        const nes_arr = [... list.getArrayList()]
        console.log(list, list.getArrayList());
        setArrList(nes_arr)
    }

    const handleChangeItem = (value: string, index: number) => {
        list.setNodeAtIndex(index, value)
        setList(Object.assign(Object.create(Object.getPrototypeOf(list)), list));
        setArrList([...list.getArrayList()])
    }

    const handleDelete = (index: number) => {
        list.removeAtIndex(index);
        setList(Object.assign(Object.create(Object.getPrototypeOf(list)), list));
        setArrList([...list.getArrayList()])
    }

    return (
        <div className="App">
            <header className="App-header">
                <div style={{marginBottom: "15px"}}>DOUBLY LINKED LIST - ДВОНАПРАВЛЕННИЙ СПИСОК</div>
                    <div className='cards'>
                        {list && list.length > 0 && arrList.map((e, i) => 
                            <Card 
                                index={i}
                                children={e.value} 
                                handleDelete={handleDelete} 
                                handleEditClick={handleChangeItem}
                                key={i}
                            />)
                        }
                        {(clicked && 
                            <Card 
                                index={-1}
                                children={""}
                                handleDelete={handleDelete} 
                                handleEditClick={handleNewItem}
                            />
                        )}
                        <IconButton className='btn' aria-label="add" color="inherit" onClick={handleAddItem}>
                            <AddIcon />
                        </IconButton>
                    </div> 
            </header>
        </div>
    );
}

export default App;
