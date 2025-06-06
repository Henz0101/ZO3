let playerName = '';
let waitingForName = false;

const scenes = [
  {
    text: "(You stand at the gates of your new school, your heart thudding. You clutch your transfer papers tightly, determined to start fresh.)",
    choices: [{ text: "Next", next: 1 }]
  },
  {
    text: "(A group of boys are laughing by the vending machine. One of them looks over at you. His dark hair falls across his forehead, his eyes sharp and curious.)",
    choices: [{ text: "Next", next: 2 }]
  },
  {
    text: 'Shin (smirking): “Hey, new girl. Looking a bit lost?”',
    choices: [{ text: "Next", next: 3 }]
  },
  {
    text: "You: “Um, yeah… I’m just trying to find the admin office.”",
    choices: [{ text: "Next", next: 4 }]
  },
  {
    text: 'Shin: “Figures. Transfers always look so serious on the first day.” (He steps closer, eyes sparkling with amusement.)',
    choices: [{ text: "Next", next: 5 }]
  },
  {
    text: "Shin: “Name?”",
    choices: [] // No choices here, name popup triggers
  },
  {
    text: () => `You: “It’s… ${playerName}.” )`,
    choices: [{ text: "Next", next: 7 }]
  },
  {
    text: 'Shin: “Cute name. I’m Shin. Nice to meet you.” (He plucks your transfer paper from your hands.)',
    choices: [{ text: "Next", next: 8 }]
  },
  {
    text: 'Shin: “Ah, Room 3-A. Looks like you’re with the tough crowd. I can take you there, if you want.”',
    choices: [
      { text: "That would be great. Thank you!", next: 9 },
      { text: "I can manage, but thanks.", next: 10 },
      { text: "Aren’t you busy with your friends?", next: 11 }
    ]
  },
  {
    text: 'Shin: “No problem. Stick with me, I’ll keep you out of trouble.” )',
    choices: [{ text: "Next", next: 12 }]
  },
  {
    text: 'Shin: “Independent type, huh? I like that. But seriously, this place is a maze. I’ll tag along anyway.” )',
    choices: [{ text: "Next", next: 12 }]
  },
  {
    text: 'Shin: “Those guys? They’ll survive. You’re more interesting.” (He gives you a small, playful grin.)',
    choices: [{ text: "Next", next: 12 }]
  },
  {
    text: "(You walk together. Shin points out classrooms and trophy cases, his tone casual but warm.)",
    choices: [{ text: "Next", next: 13 }]
  },
  {
    text: 'Shin: “So, where’d you transfer from?”',
    choices: [{ text: "Next", next: 14 }]
  },
  {
    text: 'You: “Just a regular school in the city… nothing special.” )',
    choices: [{ text: "Next", next: 15 }]
  },
  {
    text: 'Shin: “You’re already special—no one transfers in the middle of the year unless there’s a good reason.” (He’s watching you carefully, almost like he can see through you.)',
    choices: [{ text: "Next", next: 16 }]
  },
  {
    text: "(You feel your face flush as Shin grins at you, his steps light and confident.)",
    choices: [{ text: "Next", next: 17 }]
  },
  {
    text: 'Shin: “Club sign-ups. If you’re smart, stay away from the drama club—unless you want to get roped into a musical.” )',
    choices: [{ text: "Next", next: 18 }]
  },
  {
    text: "(A teacher walks by, giving Shin a knowing look.)",
    choices: [{ text: "Next", next: 19 }]
  },
  {
    text: 'Teacher: “Shin, don’t harass the new student on her first day.” (Shin laughs lightly.)',
    choices: [{ text: "Next", next: 20 }]
  },
  {
    text: 'Shin: “Just showing her around, sensei!” (The teacher smiles at you.)',
    choices: [{ text: "Next", next: 21 }]
  },
  {
    text: 'Teacher: “Welcome. If you need anything, my office is on the second floor.”',
    choices: [{ text: "Next", next: 22 }]
  },
  {
    text: 'Shin: “See? Even the teachers love me.” )',
    choices: [
      { text: "You must be pretty popular.", next: 23 },
      { text: "Is that a good thing?", next: 24 },
      { text: "You’re full of yourself.", next: 25 }
    ]
  },
  {
    text: 'Shin: “Eh, popularity’s overrated. It’s more about knowing how to talk to people.”',
    choices: [{ text: "Next", next: 26 }]
  },
  {
    text: 'Shin: “Depends. Some people hate attention. Me? I think it keeps things interesting.” )',
    choices: [{ text: "Next", next: 26 }]
  },
  {
    text: 'Shin: “Confidence, new girl. Gotta have it if you want to survive here.” )',
    choices: [{ text: "Next", next: 26 }]
  },
  {
    text: "(The bell rings. Shin’s grin fades a bit.)",
    choices: [{ text: "Next", next: 27 }]
  },
  {
    text: 'Shin: “Better hurry. First period’s about to start.” (He leads you to your classroom.)',
    choices: [{ text: "Next", next: 28 }]
  },
  {
    text: 'Shin (serious): “Listen—if anyone gives you a hard time, come find me. I’ve got your back.” )',
    choices: [{ text: "Next", next: 29 }]
  },
  {
    text: "You: “Thank you… Shin.” (He gives you a small, reassuring smile before slipping into his own class.)",
    choices: [{ text: "Next", next: 30 }]
  },
  {
    text: "(Your first day is just beginning. But somehow, meeting Shin makes you feel like… maybe you’re not alone.)",
    choices: []
  }
];

const sceneText = document.getElementById('scene-text');
const choicesDiv = document.getElementById('choices');
const namePopup = document.getElementById('name-popup');
const playerNameInput = document.getElementById('player-name-input');
const submitNameBtn = document.getElementById('submit-name-btn');

let currentSceneIndex = 0;

function replacePlayerName(text) {
  if (typeof text === 'function') {
    return text();
  }
  return text.replace(/\*\[player’s name\]\*/g, playerName);
}

function showScene(index) {
  currentSceneIndex = index;
  const scene = scenes[index];
  
  // If scene is where Shin asks name, show input popup and wait
  if (index === 5) {
    namePopup.style.display = 'flex';
    choicesDiv.innerHTML = ''; // remove choices while waiting
    sceneText.innerHTML = scene.text;
    return;
  }
  
  sceneText.innerHTML = replacePlayerName(scene.text);
  choicesDiv.innerHTML = '';

  if (scene.choices.length === 0) {
    choicesDiv.innerHTML = '<p>--- End of Act 1 ---</p>';
    return;
  }

  scene.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice.text;
    button.classList.add('choice');
    button.addEventListener('click', () => showScene(choice.next));
    choicesDiv.appendChild(button);
  });
}

submitNameBtn.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  if (name.length === 0) {
    alert("Please enter a nickname!");
    return;
  }
  playerName = name;
  namePopup.style.display = 'none';
  showScene(currentSceneIndex + 1);
});

// Start game
showScene(0);
