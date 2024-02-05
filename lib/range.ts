export const range = (start: number, end: number) => {
  let output: number[] = []; // Specify the type of the output array as an array of numbers
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += 1) {
    output.push(i);
  }
  return output;
};
