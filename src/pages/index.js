import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const {docsGettingStartedPath} = siteConfig.customFields;

  return (
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className='container'>
          <h1 className='hero__title'>{siteConfig.title}</h1>
          <p className='hero__subtitle'>
            Kairos is an open source CDP for collecting, unifying, analyzing,
            and activating customer data in real time.
          </p>
          <div className={styles.buttons}>
            <Link className='button button--secondary button--lg' to={docsGettingStartedPath}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
      <Layout title={siteConfig.title}
              description='Kairos is an open source CDP for collecting, unifying, analyzing, and activating customer data in real time.'
      >
        <HomepageHeader/>
        <main>
          <HomepageFeatures/>
        </main>
      </Layout>
  );
}
