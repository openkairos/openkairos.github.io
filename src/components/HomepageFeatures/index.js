import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const featureList = [
  {
    title: 'Customer Data Platform',
    description:
      'Collect events and records from multiple systems, unify customer data, and build a shared foundation for profiles, audiences, and downstream workflows.',
  },
  {
    title: 'Profiles, Audiences, and Insights',
    description:
      'Work from identity resolution, profile state, segmentation, and analytical views so teams can reason about customer behavior with more context.',
  },
  {
    title: 'Aletheia Dashboard',
    description:
      'Use Aletheia to explore customer data, inspect audiences, and follow dashboard-driven workflows built on top of the Kairos platform.',
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.intro}>
          <p className={styles.kicker}>Product Overview</p>
          <h2>Bring customer data together, understand it, and act on it.</h2>
          <p>
            Kairos combines data collection, profile building, audience logic,
            and activation-oriented platform capabilities, while Aletheia gives
            teams a dashboard for visibility and day-to-day use.
          </p>
        </div>
        <div className="row">
          {featureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
        <div className={styles.note}>
          Some capabilities described across the site reflect the broader
          product direction and may continue to evolve as the platform grows.
        </div>
      </div>
    </section>
  );
}
