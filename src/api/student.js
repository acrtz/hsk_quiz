import gql from 'graphql-tag';
import db from './db';

//needs to recieve an object 
const getHskQuiz = async () => {
  try {
    const { data: { getHskQuiz: quiz } } = await db.query({
      query: gql` {
        getHskQuiz {
          level
          simplified
          pinyin
          definition
        }
      }
    `, fetchPolicy: 'no-cache'
    });
    return { quiz }; 
  } catch (error) {
    console.log({error})
    return { error };
  }
}

export default  {
  getHskQuiz
}