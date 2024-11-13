// app/simulation/home/getServerSideProps.js
import { REST_API_PARAMS } from "../Constants";

export async function getServerSideProps() {
  let isErrorHomePage = false;
  try {
    const response = await fetch(`${REST_API_PARAMS.baseUrl}/leadstatus`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const leadStatus = await response.json();

    return {
      props: { 
        leadStatus,
        isErrorHomePage 
      },
    };
  } catch (error) {
    console.error('Error fetching leadstatus levels:', error);
    return { 
      props: { 
        leadStatus: [],
        isErrorHomePage: true 
      } 
    };
  }
}
