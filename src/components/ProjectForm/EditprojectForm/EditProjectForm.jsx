import React, { useState } from "react";

// Imports
import { useNavigate } from "react-router-dom";

function EditProjectForm(projectData) {
  // State
  const [editProject, setEditProject] = useState(
    projectData.map
  );

  // // Hooks
  const navigate = useNavigate();

  // Actions and Helpers
  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditProject((prevProjectData) => ({
      ...prevProjectData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = window.localStorage.getItem("token")
    console.log("handleSubmit", editProject, token)
    
    // only will post the pledge if the user is logged in( have a token)
    if (token && editProject.title && editProject.description  && editProject.image && editProject.is_open) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}projects/`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
              title: editProject.title, 
              description: editProject.description,              
              image: editProject.image,
              is_open: editProject.is_open === "on",
              category: editProject.category,             
            }),
          }
        );
        const data = await response.json();
        console.log(data)
        // THIS IS HOW YOU NAVIGATE AUTOMATICALLY
        navigate(`/projects/${data.id}`);        
      } catch (err) {
        console.log(err);
      }
    }
  };

  const formFields = [
    {
       id: "title",
       label: "Title",
       placeholder: "Enter title",
       type: "text",
    },
    {
        id: "description",
        label: "Description",
        placeholder: "Enter description",
        type: "text",
    },
   
    {
        id: "image",
        label: "Image",
        placeholder: "Enter image",
        type: "url",
    },
        {
       id: "is_open",
       label: "Is open",
       placeholder: "Enter if project open",
       type: "checkbox",
    },
       {
        id: "category",
        label: "Category",
        placeholder: "Enter category",
        type: "text",
    },
   ]

    return ( 
        <form>
            {formFields.map((field, key) => {
                return (
                <div key={`${key}-${field.id}`}>
                    <label htmlFor={field.id}>
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        id={field.id}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                    />
                </div>
                )
            })}
            <button type="submit" onClick={handleSubmit}>
                Update Project
            </button>
        </form>
    )
}

export default EditProjectForm;