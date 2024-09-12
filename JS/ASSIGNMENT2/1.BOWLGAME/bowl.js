let playButton = document.getElementById ('playButton');
let scores = {
  score1: 0,
  score2: 0,
  score3: 0,
  score4: 0,
  score5: 0,
  score6: 0,
  score7: 0,
  score8: 0,
  score9: 0,
  score10: 0,
};

const throwBowl = () => {
  return Math.floor (Math.random () * 11); // Returns a number between 0 and 10
};

const playGame = () => {
  // We have ten frames
  // For each frame, there are 2 throws
  // If a strike - All pins are knocked in one throw, frame ends.
  // If strike is in frame10 1st throw 2 more chances are given
  // If strike is in frame10 2nd throw 1 more chance is given
  for (let i = 1; i <= 10; i++) {
    let frameScore = 0;
    let firstThrow = throwBowl ();

    //   A strike - All 10 pins are knocked in a single strike
    if (firstThrow === 10) {
      frameScore = 10;

      // Give two extra chances if strike is hit in frame10
      if (i === 10) {
        const bonus1 = throwBowl ();
        const bonus2 = throwBowl ();
        frameScore += bonus1 + bonus2;
      }
    } else {
      let secondThrow = throwBowl ();
      frameScore = firstThrow + secondThrow;

      // If 10 pins are knocked in two throws - in Frame 10
      if (frameScore === 10 && i === 10) {
        let extraThrow = throwBowl ();
        frameScore += extraThrow;
      }
    }

    scores[`score${i}`] = frameScore;
  }

  let totalScore = 0;
  totalScore +=
    scores.score1 +
    scores.score2 +
    scores.score3 +
    scores.score4 +
    scores.score5 +
    scores.score6 +
    scores.score7 +
    scores.score8 +
    scores.score9 +
    scores.score10;

  console.log ('FrameScores: \n');
  for (let i = 1; i <= 10; i++) {
    console.log (`Score for Frame ${i}: ${scores[`score${i}`]}`);
  }

  console.log ('Total scores: ' + totalScore);
};

playButton.addEventListener ('click', playGame);
