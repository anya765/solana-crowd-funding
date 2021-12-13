import React, { useEffect, useState } from 'react';
import Title from './components/Title';
import Header from './components/Header';
import Card from './components/Card';
import Form from './components/Form';
import { getAllCampaigns } from "./solana";
const App = () => {
  const [route, setRoute] = useState(0);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getAllCampaigns().then((val) => {
    setCards(val);
    console.log(val);
  });
  }, []);
  return (
     
    <div className="ui container">
      <div style={{display: 'flex',  justifyContent:'left', alignItems:'left', height: '10vh', paddingTop: '2vh'}}>
        <h1> Crowfunding App - Make creative projects a reality <span role="img" aria-label="sheep">🚀</span>  </h1> </div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '5vh'}}>
        <h3>This is a crowdfuding app built on Solana. It's like Kickstarter but decentralized (and cooler). Fund your favourite campaigns or create your own using the navigation bar below. </h3>
      </div>

      <div style={{display: 'flex',  justifyContent:'left', alignItems:'left', height: '7vh', paddingTop: '2vh'}}>
        <p>Make sure to connect to the Solana Devnet and get some SOL from <a href="https://solfaucet.com/" target = "_blank"> this </a> faucet to start using this app. </p>
      </div>
      <Header setRoute={setRoute} />
      {route === 0 ?
        <div style ={{columns:'1 auto', width: '100%', height: '50%', flexDirection: 'column', alignItems:'flexStart'}}>{
          cards.map((e, idx) => (
            <Card
              key={e.pubId.toString()}
              data={{
                title: e.name,
                description: e.description,
                amount: (e.amount_donated).toString(),
                image: e.image_link,
                id: e.pubId,
              }}
              setCards={setCards} />
          ))
        }
        </div>
        :
        <Form setRoute={(e) => {
          setRoute(e);
          getAllCampaigns().then((val) => {
          setCards(val);
          });
        }} />
      }
    </div>
  );
}

export default App;
