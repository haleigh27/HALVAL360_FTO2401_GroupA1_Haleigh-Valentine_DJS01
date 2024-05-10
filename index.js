const spacePar = {
    initVelocity_kmH: 10000,
    acceleration_ms2: 3,
    time_sec: 3600,
    initDistance_km: 0,
    initFuel_kg: 5000,
    fuelBurnRate_kgSec: 0.5,

    initVelocity_ms() {
        return this.initVelocity_kmH / 3.6;
    },

    acceleration_kmH2() {
        return (this.acceleration_ms2 * (3600 * 3600)) / 1000;
    },

    time_hours() {
        return this.time_sec / 3600;
    },

    initDistance_m() {
        return this.initDistance_km * 1000;
    },
};

//Checks validity of parameter type
const checkValuesAreNumbers = (obj) => {
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'function') {
            const methodResult = value.call(obj);
            if (isNaN(methodResult)) {
                console.error(`Invalid value: Method call "${key}" resulted in NaN`);
                return false;
            }
            if (typeof methodResult !== 'number') {
                console.error(`Invalid type: Method call "${key}" does not return a number`);
                return false;
            }
        } else if (typeof value !== 'number') {
            console.error(`Invalid type: Parameter "${key}" must be a number`);
            return false;
        }
    }
    return true;
};

//Calculates new distance in km or m
const newDistance = (unit = 'km') => {
    try {
        if (unit === 'km') {
            return spacePar.initDistance_km + spacePar.initVelocity_kmH * spacePar.time_hours();
        } else if (unit === 'm') {
            return spacePar.initDistance_m() + spacePar.initVelocity_ms() * spacePar.time_sec;
        } else {
            throw new Error('Invalid unit specified.');
        }
    } catch (err) {
        console.log('Cannot calculate new distance:', err.message);
    }
};

//Calculates remaining fuel in kg
const remainingFuel = (unit = 'kg') => {
    try {
        if (unit === 'kg') {
            return spacePar.initFuel_kg - spacePar.fuelBurnRate_kgSec * spacePar.time_sec;
        } else {
            throw new Error('Invalid unit specified.');
        }
    } catch (err) {
        console.log('Cannot calculate new distance:', err.message);
    }
};

//Calculates new velocity in km/h or m/s
const newVelocity = (unit = 'kmH') => {
    try {
        if (unit === 'kmH' || unit === 'km/h') {
            return calcNewVel(spacePar.initVelocity_kmH, spacePar.acceleration_kmH2(), spacePar.time_hours());
        } else if (unit === 'ms' || unit === 'm/s') {
            return calcNewVel(spacePar.initVelocity_ms(), spacePar.acceleration_ms2, spacePar.time_sec);
        } else {
            throw new Error('Invalid unit specified.');
        }
    } catch (err) {
        console.log('Cannot calculate new distance:', err.message);
    }
};

function calcNewVel(velocityInit, acceleration, time) {
    return velocityInit + acceleration * time;
}

//
if (checkValuesAreNumbers(spacePar)) {
    console.log(`Corrected New Velocity: ${newVelocity('kmH')} km/h`);
    console.log(`Corrected New Distance: ${newDistance('km')} km`);
    console.log(`Corrected Remaining Fuel: ${remainingFuel('kg')} kg`);
} else {
    console.error('One or more parameters are not valid numbers');
}
