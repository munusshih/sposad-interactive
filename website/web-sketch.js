p5.disableFriendlyErrors = true;

let params = {
  text: "造浪者 WAVE MAKER",
  frequency: 5,
  amplitude: 100,
  phase: 0,
  dutyCycle: 0.9,
  symmetry: 0.5,
  phase2: 0,
  phase3: 0,
  textSize: 20,
  amplitudeMod: 0.5,
  frequencyMod: 0,
  yesBackground: true,
  waveType: "Sawtooth",
  offsetX: 10,
  offsetY: 20,
  rotate: 0,
  staggerX: 10,
  staggerY: 10,
  num: 10,
  overallX: 0,
  overallY: 0,
  squareYes: true,
  foregroundColor: "#000000",
  backgroundColor: "#000000",
  howManyColors: 1,
  squareColor: "#AA77DD",
  secondColor: "#ff0000",
  thirdColor: "#ffff00",
  forthColor: "#00ff00",
  fifthColor: "#0000ff",
};

let pg = [];

function setup() {
  let cnv;

  if (vertical) {
    cnv = createCanvas(windowWidth, (windowHeight / 4) * 3);
  } else {
    cnv = createCanvas(windowWidth, windowHeight);
  }

  cnv.parent("#container");
  pixelDensity(2);

  // capture.start({
  // 	format: 'webm', // Video format
  // 	framerate: 30, // Set your desired frame rate
  // 	verbose: true // Outputs useful debugging info
  // });

  for (let i = 0; i < 4; i++) {
    pg[i] = createGraphics(width / 4, height);
  }

  const bigPane = new Tweakpane.Pane({
    container: document.getElementById("pane"),
  });
  const pane = bigPane.addFolder({
    title: "Advanced",
    expanded: false, // optional
  });
  pane.addInput(params, "frequency", {
    min: 0,
    max: 10,
    step: 0.1,
  });
  pane.addInput(params, "amplitude", {
    min: 10,
    max: 200,
    step: 1,
  });
  pane.addInput(params, "amplitudeMod", {
    min: 0,
    max: 200,
    step: 1,
  });
  pane.addInput(params, "frequencyMod", {
    min: -1,
    max: 1,
    step: 0.01,
  });
  pane.addInput(params, "phase", {
    min: 0,
    max: TWO_PI,
    step: 0.01,
  });
  pane.addInput(params, "textSize", {
    min: 5,
    max: 50,
    step: 0.5,
  });
  pane.addInput(params, "yesBackground");
  pane.addInput(params, "dutyCycle", {
    min: 0,
    max: 1,
    step: 0.01,
  });
  pane.addInput(params, "squareYes", {});
  // pane.addInput(params, 'symmetry', { min: 0, max: 1, step: 0.01 });
  // pane.addInput(params, 'phase2', { min: 0, max: TWO_PI, step: 0.01 });
  // pane.addInput(params, 'phase3', { min: 0, max: TWO_PI, step: 0.01 });
  // pane.addInput(params, 'amplitudeMod', { min: 0, max: 1, step: 0.01 });
  // pane.addInput(params, 'frequencyMod', { min: 0, max: 10, step: 0.1 });
  pane.addInput(params, "waveType", {
    options: {
      Sine: "Sine",
      Square: "Square",
      Triangle: "Triangle",
      Sawtooth: "Sawtooth",
      Pulse: "Pulse",
    },
  });
  pane.addSeparator();
  pane.addInput(params, "howManyColors", {
    min: 1,
    max: 6,
    step: 1,
  });
  pane.addInput(params, "offsetX", {
    min: 30,
    max: 200,
    step: 0.01,
  });
  pane.addInput(params, "offsetY", {
    min: 30,
    max: 200,
    step: 0.01,
  });
  pane.addInput(params, "rotate", {
    min: -1,
    max: 1,
    step: 0.01,
  });
  pane.addInput(params, "staggerX", {
    min: 0,
    max: 200,
    step: 0.01,
  });
  pane.addInput(params, "staggerY", {
    min: 0,
    max: 200,
    step: 0.01,
  });
  pane.addInput(params, "num", {
    min: 1,
    max: 100,
    step: 1,
  });
  pane.addSeparator();
  pane.addInput(params, "overallX", {
    min: -200,
    max: 200,
    step: 0.01,
  });
  pane.addInput(params, "overallY", {
    min: -200,
    max: 200,
    step: 0.01,
  });

  pane.addSeparator();
  pane.addInput(params, "foregroundColor", {
    view: "color",
  });
  pane.addInput(params, "backgroundColor", {
    view: "color",
  });
  pane.addInput(params, "squareColor", {
    view: "color",
  });
  pane.addInput(params, "secondColor", {
    view: "color",
  });
  pane.addInput(params, "thirdColor", {
    view: "color",
  });
  pane.addInput(params, "forthColor", {
    view: "color",
  });

  bigPane.hidden = true;
}

let pOption = -1;

function optionChoice() {
  switch (option) {
    case 0:
      params.textSize = (width / 100) * 2.2;
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width / 4, height);
        pOption = option;
      }
      params.text = "造浪者 WAVE MAKER";
      params.waveType = "Sawtooth";
      params.frequencyMod = 0;
      params.amplitude = 100 + noise(frameCount / 100) * 100;
      params.squareColor = "#aa77dd";
      params.num = 10;
      params.offsetX = (width / 100) * 3.8 + noise(frameCount / 100) * 20;
      params.offsetY = (width / 100) * 3.8;
      params.overallY = 0;
      break;
    case 1:
      params.textSize = (width / 100) * 2.2;
      params.text = "數位動畫 DIGITAL ANIMATION";
      params.waveType = "Pulse";
      params.amplitude = 100;
      params.frequencyMod = sin(frameCount / 100);
      params.squareColor = "#ddce77";
      params.offsetX = (width / 100) * 3.8;
      params.num = 10;
      params.offsetY = (width / 100) * 3.8;
      params.overallY = -height / 5;
      break;
    case 2:
      params.textSize = (width / 100) * 2.2;
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width, height);
        pOption = option;
      }
      params.text = "視覺傳達 Visual Communication";
      params.waveType = "Sine";
      params.frequencyMod = 0;
      params.amplitude = 100 + noise(frameCount / 100) * 100;
      params.squareColor = "#ff8900";
      params.num = 5;
      params.offsetX =
        (width / 100) * (4 + sin(frameCount / 100) * 5) +
        noise(frameCount / 100) * 20;
      params.offsetY =
        (width / 100) * (4 + sin(frameCount / 100) * 5) +
        noise(frameCount / 100) * 20;
      params.overallY = -height / 4;
      break;
    case 3:
      params.textSize = (width / 100) * 2;
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width / 4, height);
        pOption = option;
      }
      params.text = "產品設計 Product";
      params.waveType = "Triangle";
      params.frequencyMod = 0;
      params.amplitude = 100;
      params.squareColor = "#ff1195";
      params.num = 12;
      params.offsetX = (width / 100) * 3.8 + noise(frameCount / 1000) * 100;
      params.offsetY = (width / 100) * 3.8;
      params.overallX = 0;
      break;
    case 4:
      params.textSize = (width / 100) * 2.2;
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width, height);
        pOption = option;
      }
      params.text = "建築與景觀設計 Architecture & Landscape";
      params.waveType = "Square";
      params.frequencyMod = 0;
      params.amplitude = 50;
      params.squareColor = "#5ea4f5";
      params.num = 5;
      params.offsetX = (width / 100) * 20;
      params.offsetY = (width / 100) * 10;
      params.overallX = 0;
      params.overallY = -height / 4;
      break;
    case 5:
      params.textSize = (width / 100) * 2.2;
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width, height);
        pOption = option;
      }
      params.text = "時尚設計 Fashion";
      params.waveType = "Sawtooth";
      params.frequencyMod = 0;
      params.amplitude = 100 + noise(frameCount / 100) * 100;
      params.squareColor = "#8ed2c6";
      params.offsetX = (width / 100) * 3.8 + noise(frameCount / 100) * 20;
      params.offsetY = (width / 100) * 3.8 + noise(frameCount / 1000) * 20;
      params.num = 5;
      params.overallX = (width / 100) * 3.8 + noise(frameCount / 100) * 20;
      params.overallY = -height / 4;
      break;
  }
}

function windowResized() {
  if (vertical) {
    resizeCanvas(windowWidth, (windowHeight / 4) * 3);
  } else {
    resizeCanvas(windowWidth, windowHeight);
  }
  for (let i = 0; i < 4; i++) {
    pg[i].remove();
    pg[i] = createGraphics(width / 4, height);
  }
}

let waveT = 0;
let spacing = 0.1;

function wavePattern(
  frequency,
  amplitude,
  phase,
  dutyCycle,
  symmetry,
  phase2,
  phase3,
  amplitudeMod,
  frequencyMod,
  waveType
) {
  waveT = 100;
  beginShape();
  push();
  translate(25, 70);
  rect(0, -45, 205, 80);
  noFill();
  for (let x = 5; x < 205; x += spacing) {
    let waveValue = getWaveValue(
      waveT,
      20,
      phase,
      dutyCycle,
      symmetry,
      (phase2 = 0),
      (phase3 = 0),
      (amplitudeMod = 0),
      frequencyMod / 1000,
      waveType
    );
    vertex(x, -waveValue); // Invert the y-value for proper visual representation
    waveT += 0.01; // Increment time for each x position
  }
  endShape();
  fill(255);
  noStroke();
  push();
  translate(0, 3);
  textFont("monospace");
  text("Group: " + groupName, 220, -35);
  text("Wave Type: " + waveType, 220, -15);

  if (frequencyMod === 0) {
    text("Amplitude Modulation: " + amplitude.toFixed(5), 220, 5);
  } else {
    text("Frequency Modulation: " + frequencyMod.toFixed(5), 220, 5);
  }
  text("Frame Count: " + (frameCount / 1000).toFixed(3), 220, 25);
  pop();
  pop();
}

function draw() {
  push();
  if (!vertical) {
    background(0);
  } else {
    clear();
  }
  optionChoice();

  stroke(255);
  noFill();

  const frequency = params.frequency;
  const amplitude = params.amplitude;
  const phase = -frameCount / 10;
  const waveType = params.waveType;
  const dutyCycle = params.dutyCycle;
  const symmetry = params.symmetry;
  const phase2 = params.phase2;
  const phase3 = params.phase3;
  const amplitudeMod = params.amplitudeMod;
  const frequencyMod = params.frequencyMod;

  drawingSoundWave(
    frequency * 1.8,
    amplitude,
    phase,
    dutyCycle,
    symmetry,
    phase2,
    phase3,
    amplitudeMod,
    frequencyMod,
    waveType
  );
  pop();

  if (frameCount > 100000) {
    // Reset after 100,000 frames
    frameCount = 0;
  }
}

function mousePressed() {
  option++;

  if (option >= 6) option = 0;
}

function getWaveValue(
  t,
  amplitude,
  phase,
  dutyCycle,
  symmetry,
  phase2,
  phase3,
  amplitudeMod,
  frequencyMod,
  waveType
) {
  let modulatedAmplitude =
    amplitude * (1 + amplitudeMod * sin(t * frequencyMod + phase2));
  let modulatedFrequency =
    t * (1 + frequencyMod * sin(t * frequencyMod + phase3));

  switch (waveType) {
    case "Sine":
      return modulatedAmplitude * sin(modulatedFrequency + phase);
    case "Square":
      return (
        modulatedAmplitude * (sin(modulatedFrequency + phase) >= 0 ? 1 : -1)
      );
    case "Triangle":
      return (
        modulatedAmplitude * (asin(sin(modulatedFrequency + phase)) / (PI / 2))
      );
    case "Sawtooth":
      return (
        modulatedAmplitude *
        (2 *
          ((modulatedFrequency + phase) / TWO_PI -
            floor(0.5 + (modulatedFrequency + phase) / TWO_PI)) *
          symmetry)
      );
    case "Pulse":
      return (
        modulatedAmplitude *
        ((modulatedFrequency + phase) % TWO_PI < TWO_PI * dutyCycle ? 1 : -1)
      );
    default:
      return 0;
  }
}

let colors = ["1b998b", "ed217c", "2d3047", "fffd82", "ff9b71"];
let curX = [];
let curY = [];
let sum = 0;
let scaler = [1, 1.1, 1.25, 1.4];

function drawingSoundWave(
  frequency,
  amplitude,
  phase,
  dutyCycle,
  symmetry,
  phase2,
  phase3,
  amplitudeMod,
  frequencyMod,
  waveType
) {
  let texts = params.text.replaceAll(" ", "").split("");
  let selectedColors = [
    params.squareColor,
    params.secondColor,
    params.thirdColor,
    params.forthColor,
    params.fifthColor,
  ];

  push();
  rotate(params.rotate);
  noStroke();

  for (let num = 0; num < params.num; num++) {
    graphics = pg[0];
    if (curX[num] == undefined) {
      curX[num] = [];
    }
    if (curY[num] == undefined) {
      curY[num] = [];
    }

    let index = 0;

    for (
      let x = -graphics.width * 2;
      x < graphics.width;
      x += params.textSize
    ) {
      index++;
      let t = ((x / width) * TWO_PI * frequency) / 2;
      let y =
        height / 2 +
        getWaveValue(
          t,
          amplitude,
          phase,
          dutyCycle,
          symmetry,
          phase2,
          phase3,
          amplitudeMod,
          frequencyMod,
          waveType
        );

      if (curX[num][index] == undefined) {
        curX[num][index] = 0;
      }
      if (curY[num][index] == undefined) {
        curY[num][index] = 0;
      }

      if (index > sum) sum = index;

      curX[num][index] = lerp(curX[num][index], x, 0.1);
      curY[num][index] = lerp(curY[num][index], y, 0.1);
    }
  }

  for (let waveNum = 0; waveNum < 4; waveNum++) {
    graphics = pg[waveNum];

    graphics.clear();
    graphics.push();
    for (let num = 0; num < params.num; num++) {
      graphics.push();
      graphics.translate(params.overallX, params.overallY + height / 4);
      graphics.translate(
        (num * params.staggerX) / 100,
        (num * params.staggerY) / 100
      );
      graphics.noStroke();
      graphics.translate(
        num * params.offsetX,
        num * params.offsetY * scaler[waveNum]
      );
      graphics.translate(0, -height * 1.8 * (scaler[waveNum] - 1));
      graphics.scale(scaler[waveNum]);
      let index = 0;

      for (
        let x = -graphics.width * 2;
        x < graphics.width;
        x += params.textSize
      ) {
        index++;
        if (params.squareYes) {
          graphics.fill(params.backgroundColor);
          graphics.rect(
            curX[num][index] - params.textSize / 2,
            curY[num][index] - params.textSize / 2,
            params.textSize,
            params.textSize
          );

          if (params.howManyColors <= 5) {
            graphics.fill(
              hexToRgb(
                selectedColors[index % params.howManyColors],
                x * 1.2 + width / 4 + (noise(frameCount / 100) * width) / 10
              )
            );
          }
          graphics.rect(
            curX[num][index] - params.textSize / 2,
            curY[num][index] - params.textSize / 2,
            params.textSize,
            params.textSize
          );
        }

        if (num === 0) {
          graphics.vertex(
            curX[num][index] - params.textSize,
            curY[num][index] - params.textSize
          );
        }

        graphics.fill(
          hexToRgb(
            params.foregroundColor,
            x + width / 4 + (noise(frameCount / 100) * width) / 10
          )
        );
        graphics.textSize(params.textSize);
        graphics.textAlign(CENTER, CENTER);
        graphics.text(
          texts[
            (num * sum + index + waveNum * parseInt(texts.length / 4)) %
              texts.length
          ],
          curX[num][index],
          curY[num][index]
        );
      }
      graphics.pop();
    }
    graphics.pop();
    image(graphics, (width / 4) * waveNum, 0);
  }

  pop();
}

function hexToRgb(hex, alpha) {
  // Remove the '#' symbol if present
  hex = hex.replace("#", "");

  // Extract the red (R), green (G), and blue (B) components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return an array with the RGB values
  return color(r, g, b, alpha);
}

function generateRandomColors() {
  params.foregroundColor = getRandomColor();
  // params.backgroundColor = getRandomColor();
  params.squareColor = getRandomColor();
  params.secondColor = getRandomColor();
  params.thirdColor = getRandomColor();
  params.forthColor = getRandomColor();
  params.fifthColor = getRandomColor();
}

function randomizeParams(randomWave = true) {
  params.frequency = random(0, 10);
  params.amplitude = random(10, 500);
  // params.phase = random(0, TWO_PI);
  params.dutyCycle = random(0, 1);
  params.rotate = random(-0.1, 0.1);
  params.offsetX = random(30, 250);
  params.offsetY = random(30, 250);
  params.textSize = random(10, 30);
  params.howManyColors = floor(random(1, 3));
  console.log(params.howManyColors);
  // params.squareYes = random([true, false]);
  if (randomWave) {
    params.waveType = random([
      "Sine",
      "Triangle",
      "Sawtooh",
      "Pulse",
      "Square",
    ]);
  }
  // params.staggerX = random(-1000, 1000);
  // params.staggerY = random(-1000, 1000);
  params.num = random(1, 30);
  params.overallX = random(-500, 500);
  params.overallY = random(-500, 500);
}

function getRandomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

let idleTimeout;

// Show div on mouse move
document.addEventListener("mousemove", function(e) {
  const followDiv = document.getElementById("followDiv");

  // Position the div next to the mouse
  followDiv.style.left = e.pageX + "px"; // Offset to the right
  followDiv.style.top = e.pageY + "px"; // Offset to the bottom

  // Make the div visible with scaling and fading in
  followDiv.style.opacity = "1";
  followDiv.style.transform = "translate(-50%, -50%) scale(1)";

  // Clear any existing timeout
  clearTimeout(idleTimeout);

  // Set a timeout to hide the div after 2 seconds of inactivity
  idleTimeout = setTimeout(() => {
    followDiv.style.opacity = "0"; // Fade out
    followDiv.style.transform = "translate(-50%, -50%) scale(0)"; // Scale down
  }, 2000);
});

document.getElementById("container").addEventListener("click", function() {
  const followDiv = document.getElementById("followDiv");

  // Change background color to the new color
  followDiv.style.backgroundColor = "rgb(0, 0, 0)";
  followDiv.style.color = "white";
  followDiv.style.borderColor = "#e5e5e4";

  // Reset the color back after 3 seconds (3000 ms)
  colorTimeout = setTimeout(() => {
    followDiv.style.backgroundColor = "#e5e5e4"; // Reset to original color
    followDiv.style.color = "#000";
    followDiv.style.borderColor = "#e5e5e4";
  }, 1000);
});
