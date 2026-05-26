import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const capabilityPath = [
  {
    step: '01',
    title: 'Collect',
    description:
      'Bring behavioral events, customer records, and operational data into one customer data foundation.',
  },
  {
    step: '02',
    title: 'Unify',
    description:
      'Resolve customer context into profiles that help teams understand known and anonymous activity together.',
  },
  {
    step: '03',
    title: 'Segment',
    description:
      'Shape audiences from profile state, customer behavior, and business rules instead of isolated datasets.',
  },
  {
    step: '04',
    title: 'Analyze',
    description:
      'Use Kairos and Aletheia to inspect patterns, follow customer context, and make data easier to act on.',
  },
  {
    step: '05',
    title: 'Activate',
    description:
      'Prepare customer data for downstream workflows where timing, context, and audience fit matter.',
  },
];

const featureGrid = [
  {
    title: 'Unified customer profile',
    description:
      'A shared profile layer for customer attributes, behavior, preferences, segments, and consent context.',
  },
  {
    title: 'Identity resolution',
    description:
      'A platform direction built around stitching customer activity across devices, channels, and identifiers.',
  },
  {
    title: 'Segmentation and audiences',
    description:
      'Audience logic designed to help teams move from raw behavior to meaningful customer groups.',
  },
  {
    title: 'Analytics and insights',
    description:
      'Analytical surfaces for understanding behavior, customer value, journeys, and trends over time.',
  },
  {
    title: 'Activation workflows',
    description:
      'A CDP foundation intended to support personalization, orchestration, and downstream engagement.',
  },
  {
    title: 'Developer platform',
    description:
      'API-first documentation, local Docker evaluation, and open-source code that teams can inspect.',
  },
];

const openSourceSignals = [
  'Self-hostable evaluation path',
  'Docker-based Kairos and Aletheia stack',
  'Versioned docs and API reference',
  'Open-source platform code',
];

const directionItems = [
  'Predictive analytics and propensity modeling',
  'Cross-channel orchestration and campaign workflows',
  'Personalization powered by customer context',
  'Governance, privacy, and operational controls',
];

function ExecutiveConsole() {
  return (
    <div className={styles.console} aria-label="Kairos product console preview">
      <div className={styles.consoleTopbar}>
        <span />
        <span />
        <span />
        <strong>Customer intelligence live</strong>
      </div>
      <div className={styles.consoleGrid}>
        <section className={styles.profilePanel}>
          <div className={styles.panelHeader}>
            <p>Unified profile</p>
            <span>98% match</span>
          </div>
          <div className={styles.profileIdentity}>
            <div className={styles.avatar}>AK</div>
            <div>
              <strong>Anonymous to known</strong>
              <p>Web, CRM, purchase, and consent context</p>
            </div>
          </div>
          <div className={styles.profileRows}>
            <span>Segment</span>
            <strong>High intent evaluators</strong>
            <span>Last signal</span>
            <strong>Docs and evaluation workflow</strong>
            <span>Activation fit</span>
            <strong>Ready for owned channels</strong>
          </div>
        </section>

        <section className={styles.streamPanel}>
          <div className={styles.panelHeader}>
            <p>Event stream</p>
            <span>Live</span>
          </div>
          {['product.viewed', 'docs.opened', 'audience.entered'].map((event) => (
            <div className={styles.eventRow} key={event}>
              <span className={styles.eventDot} />
              <code>{event}</code>
            </div>
          ))}
        </section>

        <section className={styles.audiencePanel}>
          <div className={styles.panelHeader}>
            <p>Audience</p>
            <span>Segment</span>
          </div>
          <strong>Enterprise CDP evaluators</strong>
          <div className={styles.audienceMeter}>
            <span />
          </div>
          <p>Profile completeness, recency, and intent signals aligned.</p>
        </section>

        <section className={styles.activationPanel}>
          <div className={styles.panelHeader}>
            <p>Activation</p>
            <span>Prepared</span>
          </div>
          <div className={styles.channelList}>
            {['Email', 'CRM', 'Ads', 'Web'].map((channel) => (
              <span key={channel}>{channel}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Hero({docsIntroPath, docsQuickStartPath}) {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Open Kairos</p>
            <h1>Premium open-source Customer Data Platform</h1>
            <p className={styles.heroLead}>
              Kairos helps teams collect customer signals, unify them into
              useful profiles, understand audience behavior, and prepare data
              for activation across the customer lifecycle.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} to={docsQuickStartPath}>
                Run locally
              </Link>
              <Link className={styles.secondaryAction} to={docsIntroPath}>
                Explore the platform
              </Link>
            </div>
            <div className={styles.heroProof}>
              <span>Open source</span>
              <span>Self-hostable</span>
              <span>Aletheia dashboard</span>
            </div>
          </div>
          <ExecutiveConsole />
        </div>
      </div>
    </header>
  );
}

function CapabilityPath() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Profile to activation</p>
          <h2>One path from customer signal to customer action.</h2>
          <p>
            Kairos is framed as a complete CDP journey: capture data, organize
            it around the customer, learn from it, and make it available for the
            workflows that need context.
          </p>
        </div>
        <div className={styles.pathGrid}>
          {capabilityPath.map((item) => (
            <article className={styles.pathCard} key={item.title}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterpriseOpenSource({docsQuickStartPath, docsIntroPath}) {
  return (
    <section className={styles.enterpriseSection}>
      <div className="container">
        <div className={styles.enterpriseLayout}>
          <div>
            <p className={styles.kicker}>Enterprise open source</p>
            <h2>Serious product posture, inspectable platform code.</h2>
            <p>
              Kairos is built for teams that want CDP ownership without losing
              the ability to evaluate the stack directly. Run Kairos, Aletheia,
              and MongoDB locally, inspect the API surface, and decide from the
              working system.
            </p>
            <div className={styles.inlineActions}>
              <Link className={styles.primaryAction} to={docsQuickStartPath}>
                Start with Docker
              </Link>
              <Link className={styles.textAction} to={docsIntroPath}>
                Read the docs
              </Link>
            </div>
          </div>
          <div className={styles.signalGrid}>
            {openSourceSignals.map((signal) => (
              <div className={styles.signalCard} key={signal}>
                <span />
                <strong>{signal}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>CDP capabilities</p>
          <h2>The product surface customers expect from a modern CDP.</h2>
          <p>
            The homepage presents the complete Kairos direction while keeping
            the language tied to documented platform concepts and evaluation
            paths.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {featureGrid.map((feature) => (
            <article className={styles.featureCard} key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDirection() {
  return (
    <section className={styles.directionSection}>
      <div className="container">
        <div className={styles.directionLayout}>
          <div>
            <p className={styles.kicker}>Product direction</p>
            <h2>Built toward the full enterprise CDP lifecycle.</h2>
            <p>
              Some advanced capabilities reflect the broader product direction
              as Kairos grows. They are presented as intended platform coverage,
              not as a guarantee that every workflow is complete in the current
              public API surface.
            </p>
          </div>
          <div className={styles.directionList}>
            {directionItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisualStory() {
  return (
    <section className={styles.visualSection}>
      <div className="container">
        <div className={styles.visualGrid}>
          <article>
            <img
              src="/img/illustrations/unified-profile.svg"
              alt=""
              loading="lazy"
            />
            <h3>Profiles</h3>
            <p>Unify customer context into a shared profile foundation.</p>
          </article>
          <article>
            <img
              src="/img/illustrations/segmentation.svg"
              alt=""
              loading="lazy"
            />
            <h3>Audiences</h3>
            <p>Translate customer behavior into useful audience groups.</p>
          </article>
          <article>
            <img
              src="/img/illustrations/orchestration.svg"
              alt=""
              loading="lazy"
            />
            <h3>Activation</h3>
            <p>Prepare customer data for the workflows that need timing.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function FinalCta({docsQuickStartPath, docsIntroPath}) {
  return (
    <section className={styles.finalCta}>
      <div className="container">
        <div className={styles.finalCtaPanel}>
          <p className={styles.kicker}>Evaluate Kairos</p>
          <h2>Run Kairos and Aletheia locally.</h2>
          <p>
            Start with the Docker quick start, open the dashboard, and inspect
            the API from a working local stack.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} to={docsQuickStartPath}>
              Run locally
            </Link>
            <Link className={styles.secondaryActionDark} to={docsIntroPath}>
              Open documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const {docsIntroPath, docsQuickStartPath} = siteConfig.customFields;

  return (
    <Layout
      title="Premium open-source Customer Data Platform"
      description="Open Kairos is a premium open-source Customer Data Platform for collecting, unifying, understanding, and activating customer data with Aletheia as the operator dashboard."
    >
      <Hero
        docsIntroPath={docsIntroPath}
        docsQuickStartPath={docsQuickStartPath}
      />
      <main>
        <CapabilityPath />
        <EnterpriseOpenSource
          docsIntroPath={docsIntroPath}
          docsQuickStartPath={docsQuickStartPath}
        />
        <FeatureGrid />
        <ProductDirection />
        <VisualStory />
        <FinalCta
          docsIntroPath={docsIntroPath}
          docsQuickStartPath={docsQuickStartPath}
        />
      </main>
    </Layout>
  );
}
