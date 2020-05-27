import React, { useState, useEffect } from 'react';
import './App.css';

//  - [X] 4 knappar - En knapp komponent
//  - [ ] Start-knapp komponent
//  - [ ] App/Spelet komponent

// App/Spelet tillstånd:
// - [X] Vilka knappar man har tryckt på []
// - [X] Vilka knappar man ska trycka på []
// - [X] Har vi tryckt på rätt/fel knapp function
// - [ ] Igång/aktivt spel boolean
// - [ ] Poängen number

function App() {
    const colors = ["green", "red", "blue", "yellow"];
    const [pressed, setPressed] = useState([])
    const [correctList, setCorrectList] = useState(["green"]);
    const [score, setScore] = useState(0)
    useEffect(() => {
        if (pressed.length === correctList.length) {
            let correct = true;
            for (let i = 0; i < correctList.length; i++) {
                if (correctList[i] !== pressed[i]) {
                    correct = false;
                }
            }
            if (correct) {
				setScore(score + 1);
				setPressed([]);
				setCorrectList(addRandomToList(correctList));
			}
			else {
				setScore(0);
				setPressed([]);
				setCorrectList(["green"]);
			}
        }
    }, [pressed]);

    useEffect(() => {
		if (score == 0) {
			alert("Nytt spel startat");
		} else {
			alert("Du har " + score + " poäng")
		}
		alert("Tryck på: " + JSON.stringify(correctList));

    }, [score, correctList])

    return (
        <div>
            {colors.map(color => (
                <SimonButton
                    color={color}
                    text={color + 'Button'} action={() => setPressed([...pressed, color])} />
            ))
            }

        </div>
    );
}

export default App;


const addRandomToList = (previousList) => {
    const listOfColors = ['red', 'green', 'blue', 'yellow']
	const randomColor = listOfColors[Math.floor(Math.random() * listOfColors.length)]
	return [...previousList, randomColor];
}

const SimonButton = props => {
    return (
        <button style={{ backgroundColor: props.color }} onClick={props.action} id={props.id} >
            {props.text}
        </button>
    );
}

