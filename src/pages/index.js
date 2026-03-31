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
          Kairos is the Customer Data Platform. Aletheia is the dashboard that
          helps teams inspect, analyze, and operate on top of the platform.
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
      description="Open Kairos is an open source CDP with Aletheia as its dashboard and analytics surface."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
