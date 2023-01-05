import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/context';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = useGlobalContext();

  const chartData = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    if (!language) {
      return total
    }//If language property is null


    //Creating language names as properties and setting counter to them.
    //if language property is not on the object, construct it and make it 1 else
    //if it on the object increment it by 1.
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count }
    }

    return total;
  }, {});
  //total is an object to which we can add a property e.g total["random"]=30;


  const mostUsedLanguage = Object.values(chartData).sort((a, b) => b.value - a.value).slice(0, 5);
  //Changing Object of objects to array of objects, sorting it and using first 5 
  //elements from it.

  //Most Stars per language
  const mostPopular = Object.values(chartData).sort((a, b) => b.stars - a.stars).map(item => {
    return { label: item.label, value: item.stars }
  }).slice(0, 5);
  //1.Convert object of objects to array of objects
  //2.sort  that array
  //3.In doughnut2d.js the data is looking for the property "value" so assign "stars" to value
  //of all the array elements.
  //4.Use only first 5 languages


  //Forks and stars
  let {stars, forks} = repos.reduce((total, item)=>{
    const {stargazers_count, name, forks} = item;
    total.stars[stargazers_count] = {label:name, value: stargazers_count}
    total.forks[forks] = {label:name, value: forks}
    return total;
  }, {
    stars:{}, forks:{}
  });
  
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return <section className='section'>
    <Wrapper className='section-center'>
      <Pie3D mostUsedLanguage={mostUsedLanguage} />
      <Column3D mostPopular={stars} />
      <Doughnut2D mostPopular={mostPopular} />
      <Bar3D mostPopular={forks} />
    </Wrapper>
  </section>
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
