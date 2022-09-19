import React from "react";
import jobs from "./jobs";
import JobCard from "./JobCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Dashboard.module.css";
import "./bootstrap.min.css";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboard__header}>
        Land in your DREAM Job HASSLE FREE!!
      </h1>
      <Row>
        {jobs.map((job) => (
          <Col key={job._id} sm={12} md={6} lg={4} xl={3}>
            <JobCard job={job} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Dashboard;

