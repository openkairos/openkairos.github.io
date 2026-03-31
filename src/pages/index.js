import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const {docsIntroPath, docsQuickStartPath} = siteConfig.customFields;

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className={styles.eyebrow}>Open Kairos</p>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">
          Kairos is an open source Customer Data Platform for collecting,
          unifying, analyzing, and activating customer data. Aletheia is the
          dashboard for exploring that data and working with it across teams.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to={docsIntroPath}>
            Read the Docs
          </Link>
          <Link className="button button--outline button--lg" to={docsQuickStartPath}>
            Quick Start
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Open Kairos is an open source Customer Data Platform with Aletheia as the dashboard for exploring customer data, audiences, and insights."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
