import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const featureList = [
  {
    title: 'Concept-First Navigation',
    description:
      'Navigate by capabilities like identity, audiences, analytics, and operations instead of locking the whole site into product buckets.',
  },
  {
    title: 'Explicit Product Ownership',
    description:
      'Keep Kairos and Aletheia visible on the page itself so readers always know whether a behavior lives in the platform, the dashboard, or both.',
  },
  {
    title: 'Scales With the Suite',
    description:
      'As more workflows and surfaces appear, the information architecture can grow around stable system concepts instead of unstable product packaging.',
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
          <p className={styles.kicker}>Information Architecture</p>
          <h2>Document the system by concepts. Label the product ownership.</h2>
          <p>
            The site keeps the Kairos and Aletheia boundary explicit without
            making that boundary the top-level navigation model.
          </p>
        </div>
        <div className="row">
          {featureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
