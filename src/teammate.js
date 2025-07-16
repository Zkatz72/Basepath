
function anyOverlappingDates(list1, list2) {
  let i = 0;
  let j = 0;

  while (i < list1.length && j < list2.length) {
    let range1 = list1[i];
    let range2 = list2[j];
    let [start1, end1] = range1;
    let [start2, end2] = range2;

    if (dateOverlap(range1, range2)) {
      return true;
    }

    if (end1 < end2) {
      i += 1;
    } else {
      j += 1;
    }
  }

  return false;
}

function teammate(playerAData, playerBData) {
    const ayears = Object.keys(playerAData)
    .filter(key => !isNaN(key) && key.trim() !== '') // keep only numeric keys
    .map(Number);
    const byears = Object.keys(playerAData)
    .filter(key => !isNaN(key) && key.trim() !== '') // keep only numeric keys
    .map(Number);
    const starta = Math.min(...ayears);
    const enda = Math.max(...ayears);
    const startb = Math.min(...byears);
    const endb = Math.max(...byears);
    let careerA = [starta, enda];
  
    let careerB = [startb, endb];
    let [start, end] = careerOverlap(careerA, careerB);
    console.log(start,end)
    if (start == -1) {
      return [false,null];
    }
    for (let i = start; i <= end; i++) {
      let yearA = playerAData[i.toString()];
      let yearB = playerBData[i.toString()];
      if (yearA === undefined || yearB === undefined)
      {
        continue
      }
      const yearATeams = Object.keys(yearA);
      const yearBTeams = Object.keys(yearB);
      
      if (yearATeams.length < yearBTeams.length) {
        for (let team in yearA) {
          if (team in yearB) {
            //check if any dates overlap
            if (anyOverlappingDates(yearB[team], yearA[team]))
            {
              return [true, team]
            }
            
          }
        }
      } else {
        for (let team in yearB) {
          if (team in yearA) {
            //check if any dates overlap
            if (anyOverlappingDates(yearB[team], yearA[team]))
            {
              return [true,team]
            }
          }
        }
      }
    }
    return [false,null]
  }

function dateOverlap(range1, range2) {
  const [start1, end1] = [new Date(range1[0]), new Date(range1[1])];
  const [start2, end2] = [new Date(range2[0]), new Date(range2[1])];

  // Check for overlap
  return start1 <= end2 && start2 <= end1;
}

function careerOverlap(careerA, careerB) {
  let [startA, endA] = careerA;
  let [startB, endB] = careerB;
  if (startA <= endB && endA >= startB) {
    return [Math.max(startA, startB), Math.min(endA, endB)];
  }
  return [-1, -1];
}

//let a = await parse3(
  //`/Users/zachary/Documents/Projects/BaseballPlayerGame/json-index/players-${"t"}.json`);

//console.log(a["trout-001mik"]['2018']);
export { teammate };

