import { MemoryRouter, Route, Routes } from "react-router-dom";
import TasksManager from "../src/pages/TaskManager";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../src/pages/Home";
import TaskList from "../src/components/taskList";
import TaskForm from "../src/components/taskForm";

global.fetch = jest.fn();
beforeEach(() => {
    fetch.mockClear(); 
});
afterAll(() => {
    global.fetch.mockRestore();
});

describe('Pruebas <TaskManager />', () =>{
    test('should show the correct title', () => {
        const { getByTestId }  = render( <MemoryRouter><TasksManager /></MemoryRouter>);
        expect(getByTestId('task-title').innerHTML).toBe('Tasks');
    });

    test('should go back to <Home /> when Back button clicked', () => {
        render( 
            <MemoryRouter initialEntries={['/tasks']}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tasks" element={<TasksManager />} />
                </Routes>
            </MemoryRouter>
        );
        act(() => { 
            const goTaskLink = document.querySelector('#back-to-home-link');
            goTaskLink.dispatchEvent( new MouseEvent("click", { bubbles: true }));
        });

        expect(screen.getByTestId('home-title').innerHTML).toBe('ToDo List App');
    });

    test('should show an error message when get no pending tasks', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce([]),
        });

        render(<MemoryRouter><TasksManager /></MemoryRouter>);
        const noTasksMessage = await screen.findByText(/No hay tareas pendientes/i);
        expect(noTasksMessage.innerHTML).toBe('No hay tareas pendientes');
    });

    test('should show all pending tasks', async () => {
        const tasks = [
            {
                "id": "bbd25c3a-1952-4eab-9536-3f9e1ac6ef98",
                "title": "Prueba 1",
                "description": "Desc prueba"
            },
            {
                "id": "564165c-1952-4eab-9536-3f9e1ac6ef98",
                "title": "Prueba 2",
                "description": "Desc prueba"
            }
        ];
        const mockSetTasks = jest.fn(); 
        
        render(<TaskList tasks={tasks} setTasks={mockSetTasks} />);
        const titleTask1 = await screen.findByText(/Prueba 1/i);
        const titleTask2 = await screen.findByText(/Prueba 2/i);
        expect(titleTask1.innerHTML).toBe('Prueba 1');
        expect(titleTask2.innerHTML).toBe('Prueba 2');
    });

    test('should delete the selected task', async () => {
        const tasks = [
            {
                "id": "bbd25c3a-1952-4eab-9536-3f9e1ac6ef98",
                "title": "Prueba 1",
                "description": "Desc prueba"
            },
            {
                "id": "564165c-1952-4eab-9536-3f9e1ac6ef98",
                "title": "Prueba 2",
                "description": "Desc prueba"
            }
        ];
        const mockSetTasks = jest.fn(); 
        
        render(<TaskList tasks={tasks} setTasks={mockSetTasks} />);
        const taskCheckbox1 = screen.getByTestId('task-bbd25c3a-1952-4eab-9536-3f9e1ac6ef98');
        fireEvent.click(taskCheckbox1);
        await waitFor(() => {
            const titleTask1 = screen.findByText(/Prueba 1/i);
            expect(titleTask1.innerHTML).toBe(undefined);
        });
    });

    test('should write input data (title and description) to the TaskForm', () => {
        render(<TaskForm setFormVisible={jest.fn()} />);
      
        const titleInput = screen.getByPlaceholderText('Title');
        const descInput = screen.getByPlaceholderText('Description');
      
        fireEvent.change(titleInput, { target: { value: 'Nuevo título' } });
        fireEvent.change(descInput, { target: { value: 'Nueva descripción' } });
      
        expect(titleInput.value).toBe('Nuevo título');
        expect(descInput.value).toBe('Nueva descripción');
    });

    test('should submit the form but with no backend conn', () => {
        const mockSetFormVisible = jest.fn();
        render(<TaskForm setFormVisible={mockSetFormVisible} />);
      
        const titleInput = screen.getByPlaceholderText('Title');
        const descInput = screen.getByPlaceholderText('Description');
      
        fireEvent.change(titleInput, { target: { value: 'Nuevo título' } });
        fireEvent.change(descInput, { target: { value: 'Nueva descripción' } });
        fireEvent.submit(screen.getByTestId('task-form'));
      
        expect(mockSetFormVisible).not.toHaveBeenCalled();
      });
});