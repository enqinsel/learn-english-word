import { httpServiceMeans, httpServiceWords } from "./baseUrl"

export const getMean = async (word) => {
  const getMean = await httpServiceMeans(`${word}`).then(response => response.data[0].meanings[0].definitions[0].definition)
  return getMean;
}

export const getData = async () => {
    const getdata = await httpServiceWords().then(response => response.data[0])
    return getdata;
  }


export async function runData(learned,word,mean) {
    const result = learned.value.includes(word.value);
  
    if (result) {
      await getData();
    } else {
      word.value = await getData();
    }
  
    try {
      mean.value = await getMean(word.value);
    } catch (e) {
      console.error(e ,"--> API kaynakli bir problem ile karsilastiniz.")
     runData(learned,word,mean);
    }
  
  }