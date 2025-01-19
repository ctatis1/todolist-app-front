import { render, screen, act } from '@testing-library/react';
import Home from '../src/pages/Home';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TasksManager from '../src/pages/TaskManager';

describe('Pruebas <Home />', () =>{
    test('should show the correct title', () => {
        const { getByTestId }  = render( <MemoryRouter><Home /></MemoryRouter>);
        expect(getByTestId('home-title').innerHTML).toBe('ToDo List App');
    });
    test('should navigate to TaskManager Page when Start button is clicked', () => {
        render( 
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tasks" element={<TasksManager />} />
                </Routes>
            </MemoryRouter>
        );
        act(() => { 
            const goTaskLink = document.querySelector('#start-link');
            goTaskLink.dispatchEvent( new MouseEvent("click", { bubbles: true }));
        });

        expect(screen.getByTestId('task-title').innerHTML).toBe('Tasks');
    });
});