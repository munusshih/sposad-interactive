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
  city: "台北市",
  country: "台灣",
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
let vertical;
let option = 0;
let groupName = "造浪者 WAVE MAKER";

const container = document.getElementById("screensaver-container");

function renderIframe() {
  // Clear the container before rendering a new iframe
  container.innerHTML = "";

  // Check the window dimensions and render the appropriate iframe
  if (window.innerWidth >= window.innerHeight) {
    vertical = false;
    container.innerHTML =
      '<iframe class="screensaver" src="../../' +
      databaseIndex +
      '/index.html" frameborder="0"></iframe>';
  } else {
    vertical = true;
    container.innerHTML =
      '<iframe class="screensaver" src="../../' +
      databaseIndex +
      '/vertical.html" frameborder="0"></iframe>';
  }
}

// Initial rendering
renderIframe();

// Add an event listener to handle window resize
window.addEventListener("resize", renderIframe);

// p5---------------------------------------------------

function setup() {
  let cnv;
  generateRandomColors();

  cnv = createCanvas(windowWidth, windowHeight);

  cnv.parent("#final-sketch");
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

function pickColor(city) {
  colorMapping = {
    台北市: mapToColor(0, 255, 0), // Green range
    新北市: mapToColor(255, 0, 0), // Red range
    桃園市: mapToColor(0, 0, 255), // Blue range
    台中市: mapToColor(255, 255, 0), // Yellow range
    台南市: mapToColor(255, 0, 255), // Magenta range
    高雄市: mapToColor(0, 255, 255), // Cyan range
    基隆市: mapToColor(255, 127, 0), // Orange range
    新竹市: mapToColor(127, 0, 255), // Purple range
    新竹縣: mapToColor(127, 255, 0), // Light Green range
    苗栗縣: mapToColor(0, 127, 255), // Light Blue range
    彰化縣: mapToColor(255, 255, 127), // Light Yellow range
    南投縣: mapToColor(255, 127, 127), // Light Red range
    雲林縣: mapToColor(127, 0, 0), // Dark Red range
    嘉義市: mapToColor(0, 127, 0), // Dark Green range
    嘉義縣: mapToColor(0, 0, 127), // Dark Blue range
    屏東縣: mapToColor(255, 0, 127), // Pink range
    宜蘭縣: mapToColor(127, 127, 0), // Olive range
    花蓮縣: mapToColor(0, 255, 127), // Mint Green range
    台東縣: mapToColor(127, 255, 255), // Light Cyan range
    澎湖縣: mapToColor(255, 255, 255), // White
    金門縣: mapToColor(200, 200, 200), // Gray
    連江縣: mapToColor(100, 100, 100), // Dark Gray
  };

  function mapToColor(r, g, b) {
    return rgbToHex(
      int(r + random(-10, 10)),
      int(g + random(-10, 10)),
      int(b + random(-10, 10))
    ); // Random slight variation
  }

  function rgbToHex(r, g, b) {
    // Ensure the RGB values are in the range of 0-255
    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);

    return (
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()
    );
  }

  if (colorMapping.hasOwnProperty(city)) {
    return colorMapping[city]; // Return the mapped color
  } else {
    // If city doesn't exist, return a default color (e.g., gray)
    console.warn(
      `No color mapping found for ${city}. Returning default color.`
    );
    return "#ffffff"; // Default to gray
  }
}

let previousAnswers = {};

function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function optionChoice() {
  if (window.answers && !isEqual(window.answers, previousAnswers)) {
    randomizeParams((randomWave = true));
    generateRandomColors();
    option = int(window.answers.group);
    pOption = -1;
    params.text = window.answers.message;
    params.city = window.answers.city;
    params.squareColor = pickColor(params.city);
    params.country = window.answers.country;
    params.num = map(int(window.answers.age), 1, 100, 1, 20);
    previousAnswers = { ...window.answers };
  }

  switch (params.country) {
    case "日本":
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width / 4, height);
        pOption = option;
      }
      params.amplitude = 100 + noise(frameCount / 100) * 100;
      params.offsetX = (width / 100) * 20 + noise(frameCount / 100) * 20;
      params.offsetY = (width / 100) * 3.8;
      params.overallY = 0;
      break;
    case "美國":
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width, height);
        pOption = option;
      }
      params.frequencyMod = 0;
      params.amplitude = 100 + noise(frameCount / 100) * 10;
      params.offsetX = (width / 100) * 3.8 + noise(frameCount / 100) * 20;
      params.offsetY = (width / 100) * 20 + noise(frameCount / 1000) * 20;
      params.overallX = (width / 100) * 3.8 + noise(frameCount / 100) * 20;
      params.overallY = -height / 4;
      break;
    case "英國":
      params.frequencyMod = 0;
      params.amplitude = 100;
      params.offsetX = (width / 100) * -1 + noise(frameCount / 100) * 20;
      params.offsetY = (width / 100) * 3.8 + noise(frameCount / 1000) * 20;
      params.overallX = (width / 100) * 1 + noise(frameCount / 100) * 20;
      params.overallY = 0;
      break;
    case "加拿大":
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width, height);
        pOption = option;
      }
      params.frequencyMod = sin(frameCount / 10000) * 10;
      params.amplitude = 20 + noise(frameCount / 100) * 100;
      params.offsetX = (width / 100) * 3.8 + noise(frameCount / 100) * 20;
      params.offsetY = (width / 100) * 3.8 + noise(frameCount / 1000) * 20;
      params.overallX = (width / 100) * 3.8 + noise(frameCount / 100) * 20;
      params.overallY = -height / 4;
      break;
    case "澳洲":
      params.frequencyMod = 0;
      params.amplitude = 100 + noise(frameCount / 100) * 100;
      params.offsetX = (width / 100) * 3.8 + noise(frameCount / 100) * 20;
      params.offsetY = (width / 100) * 3.8 + noise(frameCount / 1000) * 20;
      params.overallX = (width / 100) * 3.8 + noise(frameCount / 100) * 20;
      params.overallY = -height / 4;
      break;
    case "法國":
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width, height);
        pOption = option;
      }
      params.frequencyMod = 0;
      params.amplitude = 50;
      params.offsetX = (width / 100) * 20;
      params.offsetY = (width / 100) * 10;
      params.overallX = 0;
      params.overallY = -height / 4;
      break;
    case "韓國":
      params.frequencyMod = 0;
      params.amplitude = 100;
      params.offsetX = (width / 100) * 3.8 + noise(frameCount / 1000) * 100;
      params.offsetY = (width / 100) * 3.8;
      params.overallX = 0;
      break;
    case "德國":
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width / 3, height);
        pg[1].remove();
        pg[1] = createGraphics(width / 3, height);
        pg[2].remove();
        pg[2] = createGraphics(width / 3, height);
        pg[3].remove();
        pOption = option;
      }
      params.frequencyMod = 0;
      params.amplitude = 100 + noise(frameCount / 100) * 100;
      params.offsetX =
        (width / 100) * (4 + sin(frameCount / 100) * 5) +
        noise(frameCount / 100) * 20;
      params.offsetY =
        (width / 100) * (4 + sin(frameCount / 100) * 5) +
        noise(frameCount / 100) * 20;
      params.overallY = -height / 4;
      break;
    case "丹麥":
      if (option != pOption) {
        pg[0].remove();
        pg[0] = createGraphics(width, height);
        pOption = option;
      }
      params.amplitude = 100;
      params.frequencyMod = sin(frameCount / 100);
      params.offsetX = (width / 100) * 3.8;
      params.offsetY = (width / 100) * 3.8;
      params.overallY = -height / 5;
      break;
  }

  switch (option) {
    case 0:
      params.waveType = "Sawtooth";
      params.frequencyMod = 0;
      break;
    case 1:
      params.amplitude = 100;
      params.frequencyMod = sin(frameCount / 100);
      params.waveType = "Pulse";
      break;
    case 2:
      params.waveType = "Sine";
      break;
    case 3:
      params.waveType = "Triangle";
      break;
    case 4:
      params.waveType = "Square";
      break;
    case 5:
      params.waveType = "Sawtooth";
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

  pOption = -1;
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

  //   params.text = window.answers.message;
  //     params.squareColor = pickColor(window.answers.city);
  //     params.country = window.answers.country;
  //     params.num = map(int(window.answers.age), 1, 100, 1, 20);

  if (params.text) {
    text("Message: " + params.text, 220, -35);
  } else {
    text("Message: N/A", 220, -35);
  }

  text("Wave Type: " + waveType, 220, -15);

  if (params.city) {
    text("City: " + params.city, 220, 5);
  }

  text("Frame Count: " + (frameCount / 1000).toFixed(3), 220, 25);
  pop();
  pop();
}

function draw() {
  push();
  background(0);
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
  );
  wavePattern(
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
  );
  pop();

  if (frameCount > 100000) {
    // Reset after 100,000 frames
    frameCount = 0;
  }
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
                x * 1.2 + width / 2 + (noise(frameCount / 100) * width) / 10
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
            x + width / 2 + (noise(frameCount / 100) * width) / 10
          )
        );
        graphics.textSize(params.textSize);
        graphics.textAlign(CENTER, CENTER);
        if (texts.length > 0) {
          graphics.text(
            texts[
              (num * sum + index + waveNum * parseInt(texts.length / 4)) %
                texts.length
            ],
            curX[num][index],
            curY[num][index]
          );
        }
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
  params.textSize = (width / 100) * random(2, 4);
  params.howManyColors = floor(random(1, 5));
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