import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <h3>ToDo List App</h3>
            <p className="p-home">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ratione iusto eos quas aspernatur? At atque voluptatibus quas odio optio adipisci officia tempora repellat? Autem veritatis enim dolores explicabo amet?</p>
            <Button className="btn-start"><Link className="link-style" to={'/tasks'}>Start</Link></Button>
        </div>
    );
}
export default Home;