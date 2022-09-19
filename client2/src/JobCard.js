import React from "react";
import { Card } from "react-bootstrap";
import styles from "./JobCard.module.css";
import Button from "react-bootstrap/Button";
function JobCard({ job }) {
  return (
    <div className={styles.hoverEffect}>
      <Card className="my-3 p-3 rounded">
        <Card.Img src={job.image} variant="top" />
        <Card.Body>
          <Card.Title as="div">
            <strong>{job.title}</strong>
          </Card.Title>
          <Card.Text as="h3" className={styles.fontResize}>
            {job.description}
          </Card.Text>
          <Card.Text as="h3" className={styles.fontResize}>
            {job.location}
          </Card.Text>
          <Card.Text as="h3" className={styles.fontResize}>
            Phone: {job.phoneNumber}
          </Card.Text>
          <Card.Text as="h3" className={styles.fontResize}>
            Email: {job.contactEmail}
          </Card.Text>
          <Card.Text as="h3" className={styles.fontResize}>
            Last date to apply:{" "}
            {job.deadline > 21 ? (
              <span className={styles.greenClass}>
                {job.deadline}{" "}
                <span>{job.deadline === 1 ? "day" : "days"}</span> left
              </span>
            ) : (
              <span className={styles.redClass}>
                {job.deadline}{" "}
                <span>{job.deadline === 1 ? "day" : "days"}</span> left
              </span>
            )}
          </Card.Text>
          <Button variant="outline-success">Buy now</Button>
          <Button className={styles.archieve} variant="outline-danger">
            Remove
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default JobCard;