import React, { useState, useEffect } from "react";

//Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

//Data
// import { allProjects } from "../data";

function HomePage() {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
        setProjectList(data)
        });        ;
    }, []);

    return (
        <div id="project-list">
            {projectList.map((projectData, key) => {
                return <ProjectCard key={key} projectData={projectData}/>;
                // key={`project-${projectData.id}`}
                // projectData={projectData} - better way to write the above
            })}
        </div>
    );
}

export default HomePage;