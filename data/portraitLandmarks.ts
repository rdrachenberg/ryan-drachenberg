// Matching facial landmarks for the About page portrait morph, as [x, y]
// percentages of each (square) image. Index i in `from` corresponds to index i
// in `to`. If either photo changes, these need to be re-placed by hand.
type Point = [number, number];

const frame: Point[] = [
  [0, 0], [50, 0], [100, 0],
  [0, 50], [100, 50],
  [0, 100], [50, 100], [100, 100],
];

// ryan-avatar.jpg
const fromFace: Point[] = [
  [48.8, 5.6],   // top of head
  [49, 22.5],    // forehead
  [27, 11],      // crown left
  [71, 11],      // crown right
  [18.8, 25],    // head outline left
  [78, 25],      // head outline right
  [13.1, 37.5],  // ear top left
  [16, 60],      // ear bottom left
  [79.4, 41],    // ear top right
  [76, 60],      // ear bottom right
  [36, 37.5],    // brow left
  [64, 38],      // brow right
  [30.6, 41.9],  // eye outer left
  [41.3, 43.1],  // eye inner left
  [56.9, 43.1],  // eye inner right
  [69.4, 43.1],  // eye outer right
  [50.6, 60],    // nose tip
  [43, 58],      // nostril left
  [58, 58],      // nostril right
  [35.6, 66.9],  // mouth corner left
  [63, 67.5],    // mouth corner right
  [50, 68],      // upper lip
  [50, 73.8],    // lower lip
  [23, 80],      // jaw left
  [74, 81],      // jaw right
  [50, 91],      // chin
  [18, 86],      // collar left
  [75, 86],      // collar right
  [5, 95],       // shoulder left
  [95, 95],      // shoulder right
];

// ryan-portrait.jpg
const toFace: Point[] = [
  [52.5, 13.1],
  [52.5, 22.5],
  [41, 16.5],
  [64, 16.5],
  [36, 25],
  [70.6, 25],
  [32.8, 36.3],
  [32.8, 50],
  [73, 41],
  [72, 50],
  [45, 35],
  [62, 36.9],
  [40.6, 37.5],
  [48.8, 38.5],
  [56.9, 40],
  [65, 40.6],
  [52.5, 49.4],
  [48, 49.4],
  [57.5, 50],
  [42.5, 55],
  [65, 55.6],
  [52.5, 55.6],
  [52.5, 60],
  [33, 70],
  [70, 70],
  [50.6, 85],    // bottom of beard
  [35, 77.5],
  [70, 76],
  [5, 95],
  [95, 95],
];

export const portraitLandmarks = {
  from: [...frame, ...fromFace],
  to: [...frame, ...toFace],
};
