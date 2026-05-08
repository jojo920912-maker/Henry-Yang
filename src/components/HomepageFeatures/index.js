import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '關於我',
    Svg: require('@site/static/img/svg/undraw_profile_d7qw.svg').default,
    description: (
      <>
        目前專注於前端開發學習，熱衷於將所學整理成筆記，
        持續累積實作經驗，朝成為前端工程師的目標前進。
      </>
    ),
  },
  {
    title: '技術能力',
    Svg: require('@site/static/img/svg/undraw_programming_j1zw.svg').default,
    description: (
      <>
        具備 Vue3、JavaScript、Git版本控制，
        並使用 Naive UI、Vue Router、Pinia進行專案開發的實戰經驗。
      </>
    ),
  },
  {
    title: '跨領域背景',
    Svg: require('@site/static/img/svg/undraw_resume_jrgi.svg').default,
    description: (
      <>
        過去擔任過禮賓接待員及企劃助理專員，培養出良好的溝通能力、
        負責與細心的工作態度，以及跨部門協作與專案執行的實務經驗。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}