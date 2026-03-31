import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const featureList = [
  {
    title: 'Kairos Platform',
    description:
      'Collect events, resolve identities, build profiles, define segments, and expose the APIs that downstream systems depend on.',
  },
  {
    title: 'Aletheia Dashboard',
    description:
      'Give operators, analysts, and growth teams a dashboard for exploring the customer data managed by Kairos.',
  },
  {
    title: 'Shared Product Boundary',
    description:
      'Document the product like Elasticsearch and Kibana: platform concerns stay in Kairos, dashboard concerns stay in Aletheia.',
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
          <p className={styles.kicker}>Product Model</p>
          <h2>Kairos stores and decides. Aletheia shows and guides.</h2>
          <p>
            The site now follows the product boundary instead of treating
            everything as one generic documentation surface.
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
