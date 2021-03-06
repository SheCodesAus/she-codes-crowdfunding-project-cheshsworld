import React from "react";
import { Link } from "react-router-dom";

//styles
import "./ProjectCard.css";

function ProjectCard({projectData}) {
    return (
        <div className="project-card">
            <Link to={`/projects/${projectData.id}`}>
                <img src={projectData.image} alt="the project"/>
                <h3>{projectData.title}</h3>
            </Link>
            
        </div>
        
    );
}

export default ProjectCard;