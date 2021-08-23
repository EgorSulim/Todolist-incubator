import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {
    let initTask1 = [
        {id: 1, title: 'HTML&CSS1', isDone: true},
        {id: 2, title: 'JS1', isDone: true},
        {id: 3, title: 'React1', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]

    let arr = useState(initTask1)
    let task1 = arr[0]
    let setTask1 = arr[1]

    function removeTask(id: number) {
        let filteredTask1 = task1.filter(t => t.id !== id)
        setTask1(filteredTask1)
    }


    return (
        <div className="App">
            <Todolist
                removeTask={removeTask}
                title={'Todolist1'}
                task={task1}/>

        </div>
    );
}

export default App;
