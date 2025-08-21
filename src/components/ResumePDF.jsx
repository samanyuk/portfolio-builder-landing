import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Clean black-and-white PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Times-Roman", color: "#000" },
  header: { textAlign: "center", marginBottom: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 5 },
  subtitle: { fontSize: 14, marginBottom: 5 },
  text: { marginBottom: 3 },
});

export default function ResumePDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.subtitle}>{data.title}</Text>
          <Text>{data.email} | {data.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Skills</Text>
          {data.skills.map((skill, idx) => skill && <Text key={idx} style={styles.text}>{skill}</Text>)}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Experience</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={{ marginBottom: 5 }}>
              <Text style={styles.subtitle}>{exp.title} @ {exp.company}</Text>
              <Text>{exp.start} - {exp.end || "Present"}</Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Projects</Text>
          {data.projects.map((proj, idx) => (
            <View key={idx} style={{ marginBottom: 5 }}>
              <Text style={styles.subtitle}>{proj.name}</Text>
              <Text>{proj.description}</Text>
              {proj.link && <Text>{proj.link}</Text>}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

