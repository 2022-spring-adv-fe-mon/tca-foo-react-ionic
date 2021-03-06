import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonCheckbox, IonInput } from '@ionic/react';
import { useHistory } from 'react-router';
import { currentGame } from '../App';
import { useEffect, useState } from 'react';

interface SetGameProps {
  previousPlayers: string[];
  setCurrentGame: (game: currentGame) => void;
}

const SetupGame: React.FC<SetGameProps> = ({
  previousPlayers
  , setCurrentGame
}) => {

  const nav = useHistory();

  useEffect(
    () => {
      setAvailablerPlayers(previousPlayers.map(x => ({
        name: x 
        , checked: false
      })));
    }
    , [previousPlayers]
  );

  const playersWithCheckBoolean = previousPlayers.map(x => ({
    name: x
    , checked: false
  }))

  const [availablePlayers, setAvailablerPlayers] = useState(playersWithCheckBoolean);
  const [newPlayerName, setNewPlayerName] = useState("");

  const togglePlayerChecked = (p: any) => {
    setAvailablerPlayers(
      availablePlayers.map(x => ({
        ...x
        , checked: x === p ? !x.checked : x.checked
      }))
    );
  };

  const addNewPlayer = () => {

    // Add the new player to available players, default to
    // checked as we are likely playing with a new player.
    setAvailablerPlayers([
      ...availablePlayers
      , {
        name: newPlayerName
        , checked: true
      }
    ]);

    // Clear out the input control.
    setNewPlayerName("");
  };

  const startGame = () => {

    // Setup the payers and the start timestamp.
    setCurrentGame({
      start: new Date().toISOString()
      , players: availablePlayers.filter(x => x.checked).map(x => x.name)
    });

    setAvailablerPlayers(
      availablePlayers.map(x => ({
        ...x
        , checked: false
      }))
    );

    // Nav to the play screen.
    nav.push("/play");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Setup Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Setup Game</IonTitle>
          </IonToolbar>
        </IonHeader>

        <h3>
          Choose Players
        </h3>
        <div>
          {console.log("jsx", availablePlayers)}
          <IonItem>
            <IonLabel 
              position="floating"
            >
              Enter player name
            </IonLabel>
            <IonInput 
              value={newPlayerName}
              onIonChange={(e) => setNewPlayerName((e.target as any).value)}
            ></IonInput>
          </IonItem>
          <IonButton
            onClick={addNewPlayer}
          >
            Add
          </IonButton>
        </div>
        {
          availablePlayers.map(x => (
            <IonItem>
              <IonLabel>
                {x.name}
              </IonLabel>
              <IonCheckbox 
                checked={x.checked} 
                onIonChange={e => togglePlayerChecked(x)} 
              />
            </IonItem>
            )
          )
        }


        <IonButton
          onClick={startGame}
        >
          Start Playing
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SetupGame;
