import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toast';

const Todolist = () => {
    const [usertask, setusertask] = useState('');
    const [task, settask] = useState([]);
    const [finishedtask, setfinishedtask] = useState(0);
    const [edit, setedit] = useState(null); 

    function addtask() {
        if (usertask.trim() !== '') {
            settask([...task, { inputtask: usertask, ischecked: false }]);
            setusertask('');
            toast.success('Added Task!');
        } else {
            alert('Enter a task!!');
        }
    }

    function handlecheckbox(i) {
        const updatedtask = [...task];
        updatedtask[i].ischecked = !updatedtask[i].ischecked;
        setfinishedtask(
            updatedtask[i].ischecked ? finishedtask + 1 : finishedtask - 1
        );
        settask(updatedtask);
    }

    function deletetask(i) {
        const updatedtask = [...task];
        if (updatedtask[i].ischecked) {
            setfinishedtask(finishedtask - 1);
        }
        updatedtask.splice(i, 1);
        settask(updatedtask);
        toast.info(`Task deleted`);
    }

    function edittask(i) {
        setedit(edit === i ? null : i); 
    }

    useEffect(() => {
        console.log(task);
    }, [task]);

    return (
        <>
            <div className="taskinput w-content flex justify-center h-20 items-center gap-2 relative">
                <input
                    type="text"
                    value={usertask}
                    placeholder="Enter a task"
                    className="bg-white h-10 rounded px-2"
                    onChange={(e) => setusertask(e.target.value)}
                />
                <button
                    className="bg-blue-800 h-10 rounded w-20 text-white cursor-pointer"
                    onClick={addtask}
                >
                    Add
                </button>
            </div>

            <div className="taskinfo-container flex justify-center h-10">
                <div className="task-info flex w-100 justify-between text-white font-medium gap-10">
                    <h1>Total Tasks: {task.length}</h1>
                    <h1>Finished Tasks: {finishedtask}</h1>
                </div>
            </div>

            <div className="task-lists">
                {task.map((t, index) => (
                    <div className="container" key={index}>
                        <div className="task-box  w-screen flex justify-center  text-white">
                            <div className="task flex gap-4  w-100 items-center h-12">
                                <div
                                    className="checkbox w-4 h-4 border border-gray-400 rounded cursor-pointer"
                                    style={{ backgroundColor: t.ischecked ? 'green' : 'white' }}
                                    onClick={() => handlecheckbox(index)}
                                ></div>

                                <div
                                    className="addedtask font-medium flex-1 px-2"
                                    contentEditable={edit === index}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => {
                                        const updatedtask = [...task];
                                        updatedtask[index].inputtask = e.target.innerText.trim();
                                        settask(updatedtask);
                                    }}
                                >
                                    {t.inputtask}
                                </div>

                                <div
                                    className="edit bg-orange-200 w-7 h-7 flex justify-center items-center rounded cursor-pointer"
                                    onClick={() => edittask(index)}
                                >
                                    {edit === index ? '✅' : '✏️'}
                                </div>

                                <button
                                    className="bg-blue-800 h-10 text-sm rounded w-16 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={!t.ischecked}
                                    onClick={() => deletetask(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <ToastContainer delay={1500} />
            </div>
        </>
    );
};

export default Todolist;
