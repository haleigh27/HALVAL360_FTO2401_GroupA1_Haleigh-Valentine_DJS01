// Given Parameters
const vel = 10000; // velocity (km/h)
const acc = 3; // acceleration (m/s^2)
const time = 3600; // seconds (1 hour)
const d = 0; // distance (km)
const fuel = 5000; // remaining fuel (kg)
const fbr = 0.5; // fuel burn rate (kg/s)

const d2 = d + vel * (time / 3600); //calcultes new distance // Change: 3600 to get hours
const rf = fuel - fbr * time; //calculates remaining fuel // Change: fuel -
const vel2 = calcNewVel(acc, vel, time); //calculates new velocity based on acceleration

// Pick up an error with how the function below is called and make it robust to such errors
// Change: Make to function declaration and change order of parameters to match vel2 fn call order
function calcNewVel(acc, vel, time) {
    return vel + acc * time * 3.6; //Change: *3.6 to change m/s to km/h
}

console.log(`Corrected New Velocity: ${vel2} km/h`);
console.log(`Corrected New Distance: ${d2} km`);
console.log(`Corrected Remaining Fuel: ${rf} kg`);
