import React from "react";
import ReactMarkdown from "react-markdown";

export default function ResumePreview({ data }) {
  return (
    <section className="preview card" id="preview">
      <h2 className="section-title">Live Resume Preview</h2>
      <div className="preview-header">
        <h1>{data.name}</h1>
        <h3>{data.title}</h3>
        <p>{data.email} | {data.phone}</p>
      </div>

      <div className="preview-section">
        <h4>Skills</h4>
        <div className="skills-preview">
          {data.skills.map((skill, idx) => skill && <span key={idx} className="skill-chip">{skill}</span>)}
        </div>
      </div>

      <div className="preview-section">
        <h4>Experience</h4>
        {data.experience.map((exp, idx) => (
          <div key={idx} className="preview-card">
            <h5>{exp.title} @ {exp.company}</h5>
            <p>{exp.start} - {exp.end || "Present"}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="preview-section">
        <h4>Projects</h4>
        {data.projects.map((proj, idx) => (
          <div key={idx} className="preview-card">
            <h5>{proj.name}</h5>
            <ReactMarkdown className="markdown-preview">{proj.description}</ReactMarkdown>
            {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>}
          </div>
        ))}
      </div>
    </section>
  );
}
