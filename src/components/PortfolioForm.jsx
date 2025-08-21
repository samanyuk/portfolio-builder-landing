import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactMarkdown from "react-markdown";

export default function PortfolioForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    skills: [""],
    experience: [],
    education: [],
    projects: [],
  });

  const handleChange = (section, index, field, value) => {
    if (section === "skills") {
      const updated = [...formData.skills];
      updated[index] = value;
      setFormData({ ...formData, skills: updated });
    } else {
      const updated = [...formData[section]];
      updated[index][field] = value;
      setFormData({ ...formData, [section]: updated });
    }
  };

  const addEntry = (section, empty = {}) => {
    if (section === "skills") setFormData({ ...formData, skills: [...formData.skills, ""] });
    else setFormData({ ...formData, [section]: [...formData[section], empty] });
  };

  const removeEntry = (section, idx) => {
    if (section === "skills") {
      const updated = [...formData.skills];
      updated.splice(idx, 1);
      setFormData({ ...formData, skills: updated });
    } else {
      const updated = [...formData[section]];
      updated.splice(idx, 1);
      setFormData({ ...formData, [section]: updated });
    }
  };

  const onDragEnd = (result, section) => {
    if (!result.destination) return;
    const items = Array.from(formData[section]);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setFormData({ ...formData, [section]: items });
  };

  return (
    <form className="form card" id="form" onSubmit={e => { e.preventDefault(); onSubmit(formData); }}>
      <h3>Personal Info</h3>
      <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})} />
      <input type="text" placeholder="Job Title" value={formData.title} onChange={e => setFormData({...formData, title:e.target.value})} />
      <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})} />
      <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone:e.target.value})} />

      <h3>Skills</h3>
      <DragDropContext onDragEnd={res => onDragEnd(res, "skills")}>
        <Droppable droppableId="skills">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formData.skills.map((skill, idx) => (
                <Draggable key={idx} draggableId={`skill-${idx}`} index={idx}>
                  {provided => (
                    <div className="entry-group" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <input type="text" placeholder="Skill" value={skill} onChange={e => handleChange("skills", idx, null, e.target.value)} />
                      <button type="button" className="btn remove-btn" onClick={() => removeEntry("skills", idx)}>Remove</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button type="button" className="btn add-btn" onClick={() => addEntry("skills")}>Add Skill</button>

      {/* Experience */}
      <h3>Experience</h3>
      <DragDropContext onDragEnd={res => onDragEnd(res, "experience")}>
        <Droppable droppableId="experience">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formData.experience.map((exp, idx) => (
                <Draggable key={idx} draggableId={`exp-${idx}`} index={idx}>
                  {provided => (
                    <div className="entry-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <input placeholder="Job Title" value={exp.title} onChange={e=>handleChange("experience", idx, "title", e.target.value)} />
                      <input placeholder="Company" value={exp.company} onChange={e=>handleChange("experience", idx, "company", e.target.value)} />
                      <input type="date" value={exp.start} onChange={e=>handleChange("experience", idx, "start", e.target.value)} />
                      <input type="date" value={exp.end} onChange={e=>handleChange("experience", idx, "end", e.target.value)} />
                      <textarea placeholder="Description" value={exp.description} onChange={e=>handleChange("experience", idx, "description", e.target.value)} />
                      <button type="button" className="btn remove-btn" onClick={()=>removeEntry("experience", idx)}>Remove</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button type="button" className="btn add-btn" onClick={() => addEntry("experience", {title:"", company:"", start:"", end:"", description:""})}>Add Experience</button>

      {/* Projects with Markdown Preview */}
      <h3>Projects</h3>
      {formData.projects.map((proj, idx) => (
        <div key={idx} className="entry-card">
          <input placeholder="Project Name" value={proj.name} onChange={e=>handleChange("projects", idx, "name", e.target.value)} />
          <textarea placeholder="Description (Markdown supported)" value={proj.description} onChange={e=>handleChange("projects", idx, "description", e.target.value)} />
          <ReactMarkdown className="markdown-preview">{proj.description}</ReactMarkdown>
          <input placeholder="Link" value={proj.link} onChange={e=>handleChange("projects", idx, "link", e.target.value)} />
          <button type="button" className="btn remove-btn" onClick={()=>removeEntry("projects", idx)}>Remove</button>
        </div>
      ))}
      <button type="button" className="btn add-btn" onClick={()=>addEntry("projects", {name:"", description:"", link:""})}>Add Project</button>

      <button type="submit" className="btn generate-btn">Generate Resume</button>
    </form>
  );
}
